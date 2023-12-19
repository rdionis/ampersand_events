import esbuild from 'esbuild';
import { copy } from 'esbuild-plugin-copy';
import { resolveDirectoryNames } from './resolve_directory_names.js';

const productionConfiguration = {

    // Since this is a playground we expect each
    // experiment to be in a dedicated directory.
    entryPoints: resolveDirectoryNames('./src')
        .map(
            directoryName => `./src/${directoryName}/index.js`
        ),

    // We are replicating the directory structure
    // of the entryPoints to the dist directory.
    outbase: 'src',
    outdir: 'dist',

    // We are supporting the ES import of HTML files
    // as text to handle templates in plain HTML.
    loader: {
        '.html': 'text',
    },

    // We are increasing the log level for more details.
    logLevel: 'verbose',

    sourcemap: true,
    minify: true,
    bundle: true,

    plugins: [

        // We are copying specific static files from the
        // 'src' directory to keep the development completely
        // separated from the results in the 'dist' directory.
        copy({
            resolveFrom: 'cwd',
            assets: {
                from: [
                    './src/**/index.html',
                    './src/**/favicon.ico',
                ],
                to: [
                    './dist',
                ],
            },
        }),
    ],
};

esbuild.build(productionConfiguration)
    .catch(() => process.exit(1))
