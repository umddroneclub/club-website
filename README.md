# Basic Structure

This is an Astro project built on a block structure. 

Feel free to clone and use this website for your own purposes, but if you only make minor changes, please link back to this original.

## Blog posts

To make a new blog post or edit an existing one, just add/edit its relevant `.md` or `.mdx` file in `/src/content/blog`. Markdown syntax can be found [here](https://www.markdownguide.org/basic-syntax/).

## How to edit existing files

Page information and data are stored as YAML files in the `/src/content/pages` directory, and are automatically turned into HTML files when the project is built.

In order to edit existing pages, find its corresponding YAML file, for example `home.yaml`, and edit the text or rearrange the blocks.

Global variables such as the site title and navigation menu are stored in `global.yaml`.

Any static assets, like images, are placed in the `public/` directory and refernced by filename. If you wish to replace a file, make sure its name is identical.

## How to add new features

To create new pages, start by adding a new YAML file in the `/src/content/pages` directory. Please arrange the files logically, for example placing subteam page files in the `/src/content/pages/subteams` directory.

All existing blocks are stored in `/src/components/blocks`. To edit their styling or structure, edit those files. To add a new block, place a new Astro file in that directory.

The fields required by each block can be found in their related schemas in `/src/content.config.ts`. When you add a new block, add its schema to that file and add the schema to the `blockSchema discriminatedUnion` function. try to be specific with what each field tolerates to avoid a compile error.

Always build the project locally and test before pushing to Github.

## Testing

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [Astro documentation](https://docs.astro.build).
