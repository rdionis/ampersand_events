import esbuild from 'esbuild'
import open from 'open'
import { copy } from 'esbuild-plugin-copy';
import { resolveDirectoryNames } from './resolve_directory_names.js';

const context = await esbuild.context(
    {
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

        // We are increasing the log level to get
        // feedback when a file has been bundled.
        logLevel: 'info',

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
                verbose: true,
                watch: true,

                // Warning: This plugins watch mode is a bit excessive.
                // It will copy all files across all directories on
                // each refresh to the site. If you are running into
                // performance issues enable the _once_ option to only
                // synchronize static files on the start of esbuild!
                //
                // https://github.com/LinbuduLab/esbuild-plugins/issues/98
                once: false,
            }),
        ],
    }
);

await context.watch()

const { host, port } = await context.serve(
    {
        // We are serving the index of all
        // directories as the entry point.
        servedir: 'dist',
    }
);

await open(`http://localhost:${port}`);
