import path, {resolve} from "path";
import {defineConfig} from "vite";
const root = resolve(__dirname);
const outDir = resolve(__dirname, 'dist');
import VitePluginCdn from 'vite-plugin-cdn';

export default defineConfig({
    root,
    resolve: {
        alias: {
            '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
        }
    },
    build:{
        outDir,
        emptyOutDir:true,
        rollupOptions: {
            input:{
                main:resolve( 'index.html')
            },
            external:[

            ]


        }
    }
})