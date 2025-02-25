import { defineConfig } from 'vite';
import dtsPlugin from 'vite-plugin-dts';

export default defineConfig({
    build: {
        lib: {
            entry: 'lib/main.ts',
            name: 'MPFetch',
            fileName: 'mpfetch',
        },
    },
    plugins: [
        dtsPlugin({
            tsconfigPath: './tsconfig.json',
            include: ['lib/**/*.ts'],
            outDir: 'dist',
            rollupTypes: true,
            beforeWriteFile: (filePath, content) => ({
                filePath: filePath.replace('main.d.ts', 'mpfetch.d.ts'),
                content,
            }),
        }),
    ],
});
