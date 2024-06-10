import { defineConfig } from 'vite';
import Inspect from 'vite-plugin-inspect'
import {virtualModules} from "./plugins/virtual_plugin.js";
import reactRefresh from '@vitejs/plugin-react-refresh';

export default defineConfig({
    plugins: [
        Inspect(),
        virtualModules(),
        reactRefresh()
       ],

    root: './',
    base: '/',

    esbuild:{
        jsxFactory: 'createElement',
        jsxFragment: 'Fragment',
    },
    optimizeDeps: {
        include: ['@babel/plugin-transform-react-jsx'],
    },

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
