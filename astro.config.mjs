// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: 'https://umd-drone-club.com',
	base: '',
    vite: {
    	resolve: {
      		alias: {
        		'@layouts': '/src/layouts',
        		'@components': '/src/components',
				'@styles': '/src/styles',
      			"@content": '/src/content'
      		}
    	}	
  	},
});
