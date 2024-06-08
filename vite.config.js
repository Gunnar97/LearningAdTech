import { defineConfig } from 'vite';
import Inspect from 'vite-plugin-inspect'
import {virtualModules} from "./plugins/virtual_plugin.js";


export default defineConfig({
    plugins: [
        Inspect(),
        virtualModules()
       ],

    root: './',
    base: '/',
    build: {
        outDir: 'dist',
        rollupOptions: {
            output: {
                entryFileNames: 'assets/wrapper.js',
                chunkFileNames: 'assets/wrapper-[hash].js',
            }
        },
    },
    server: {
        port: 3000,
    },
});
