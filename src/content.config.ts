import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders"

const textBlock = z.object({
    type: z.literal('text'),
    content: z.string().min(1),
})

const heroBlock = z.object({
    type: z.literal('hero'),
    title: z.string(),
    subtitle: z.string().optional(),
    image: z.string(),
    align: z.enum(['left', 'center', 'right']).optional(),

})

const carouselBlock = z.object({
    type: z.literal('carousel'),
    items: z.array(
        z.object({
            image: z.string(),
            caption: z.string().optional(),
            link: z.string().optional(),
        })
    ).min(1),
})

const quoteBlock = z.object({
    type: z.literal('quote'),
    content: z.string().min(1),
})

const codeBlock = z.object({
    type: z.literal('code'),
    lang: z.string(),
    content: z.string().min(1),
})

const cardsBlock = z.object({
    type: z.literal('cards'),
    items: z.array(
        z.object({
            image: z.string(),
            title: z.string(),
            subtitle: z.string().optional(),
            link: z.string().optional(),
        })
    ).min(1),
})

const blockSchema = z.discriminatedUnion('type', [
    textBlock,
    heroBlock,
    carouselBlock,
    quoteBlock,
    codeBlock,
    cardsBlock,
])

const pagesCollection = defineCollection({
    loader: glob({ 
        base: './src/content/pages', 
        pattern: '**/*.yaml',
        // Use only the filename (no directories) as the ID so nested pages
        // like `subteams/fpv.yaml` become `fpv` and match `getEntry("pages", "fpv")`.
        generateId: ({ entry }) => {
            const parts = entry.split(/[/\\]/);
            const filename = parts[parts.length - 1] ?? entry;
            return filename.replace(/\.[^/.]+$/, '');
        },
    }),
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        blocks: z.array(blockSchema).min(1),
    })
});

const navItem = z.object({
    label: z.string(),
    href: z.string(),
    children: z.array(z.object({
        label: z.string(),
        href: z.string(),
    })).optional(),
});

const uiCollection = defineCollection({
    loader: glob({
        base: './src/content',
        pattern: 'global.yaml',
        generateId: ({ entry }) => entry.replace(/\.[^/.]+$/, ''),
    }),
    schema: z.object({
        nav: z.array(navItem),
        global: z.record(z.string()),
        contact: z.record(z.string()),
    })
});

const blogCollection = defineCollection({
    loader: glob({ 
        base: './src/content/blog', 
        pattern: '*.{md,mdx}' }),
    schema: z.object({
        title: z.string(),
        // Transform string to Date object
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        heroImage: z.string().optional(),
        tag: z.string(),
        draft: z.boolean(),
    }),
});

export const collections = {
  pages: pagesCollection,
  ui: uiCollection,
  blog: blogCollection,
};