// @ts-check
import { defineConfig } from 'astro/config'

import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [tailwindcss()],
        resolve: {
            alias: {
                '@': new URL('./src', import.meta.url).pathname,
                '@pages': new URL('./src/pages', import.meta.url).pathname,
                '@styles': new URL('./src/styles', import.meta.url).pathname,
                '@layouts': new URL('./src/layouts', import.meta.url).pathname,
                '@components': new URL('./src/components', import.meta.url)
                    .pathname,
                '@interfaces': new URL('./src/interfaces', import.meta.url)
                    .pathname,
                '@svg': new URL('./src/svg', import.meta.url).pathname,
                '@assets': new URL('./src/assets', import.meta.url).pathname,
                '@utils': new URL('./src/utils', import.meta.url).pathname,
            },
        },
    },
})
