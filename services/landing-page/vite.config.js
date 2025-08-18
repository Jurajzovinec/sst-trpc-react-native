import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
	const waitListApiUrlFromProcessEnv = process.env?.VITE_WAIT_LIST_API_URL
	const waitListApiUrlFromEnv = loadEnv(mode, process.cwd(), '')?.VITE_WAIT_LIST_API_URL

	let VITE_WAIT_LIST_API_URL
	if (waitListApiUrlFromProcessEnv) {
		console.info('Using VITE_WAIT_LIST_API_URL from process.env')
		VITE_WAIT_LIST_API_URL = waitListApiUrlFromProcessEnv
	} else if (waitListApiUrlFromEnv) {
		console.info('Using VITE_WAIT_LIST_API_URL from environment variables')
		VITE_WAIT_LIST_API_URL = waitListApiUrlFromEnv
	} else {
		console.warn('VITE_WAIT_LIST_API_URL is not set in process.env or .env file. Defaulting to empty string.')
		VITE_WAIT_LIST_API_URL = ''
	}

	return {
		root: '.',
    publicDir: './public',
		build: {
			outDir: './dist',
			rollupOptions: {
				input: {
					main: './index.html'
				}
			}
		},
		define: {
			'import.meta.env.VITE_WAIT_LIST_API_URL': JSON.stringify(VITE_WAIT_LIST_API_URL)
		}
	}
})
