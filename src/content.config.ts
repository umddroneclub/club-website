import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders"

const textBlock = z.object({
    type: z.literal('text'),
    content: z.string().min(1),
})

const heroBlock = z.object({
    type: z.literal('hero'),
    title: z.string(),
    subtitle: z.string().optional(),
    image: z.string(),
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
        // Force the ID to be the filename regardless of content
        generateId: ({ entry }) => entry.replace(/\.[^/.]+$/, ''),
    }),
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        blocks: z.array(blockSchema).min(1),
    })
});

export const collections = {
  pages: pagesCollection,
};