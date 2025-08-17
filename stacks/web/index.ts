export function WebAppStack() {
	const web = new sst.aws.StaticSite('WebApp', {
		path: 'services/app',
		build: {
			command: 'pnpm install && pnpm run build',
			output: 'dist'
		},
		environment: {
			NODE_ENV: 'production'
		}
	})

	return {
		cloudfrontUrl: web.url
	}
}
