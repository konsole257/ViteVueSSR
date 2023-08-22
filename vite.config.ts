import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(({
	command,
	mode
}) => {
	const env = loadEnv(mode, process.cwd(), '')

	return {
		// define: {
		// 	__APP_ENV__: JSON.stringify(env.APP_ENV)
		// },

		// base: env.VITE_ENV_ROOT || '/',
		base: '/',

		envDir: './',

		resolve: {
			alias: [{
				find: '@',
				replacement: resolve(__dirname, 'src')
			}, ],
			// extensions: ['.js', '.ts']
		},

		build: {
			// outDir: './dist',
			// assetsDir: './assets',

			// rollupOptions: {
			// 	output: {
			// 		chunkFileNames: 'assets/js/[name]-[hash].js',
			// 		entryFileNames: 'assets/js/[name]-[hash].js',

			// 		assetFileNames: assetInfo => {
			// 			let extType = assetInfo.name.split('.')[1];
			// 			if (/png|jpe?g|svg|webp|gif|tiff|bmp|ico/i.test(extType)) {
			// 				extType = 'images';
			// 			}
			// 			return `assets/${extType}/[name]-[hash][extname]`;
			// 		},
			// 	},
			// }
		},

		css: {
			devSourcemap: true,
		},

		plugins: [
			vue(),
			vueJsx(),
		],

		server: {
			host: '0.0.0.0',
			port: 3000,
		},

		preview: {
			host: '0.0.0.0',
			port: 3200,
		}
	};
});