/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
	app(input) {
		return {
			name: 'evolv-stack',
			removal: input?.stage === 'production' ? 'retain' : 'remove',
			home: 'aws',
			providers: {
				aws: {
					region: 'eu-central-1'
				}
			}
		}
	},
	async run() {
		if ($app.stage === 'master' && $dev) {
			throw new Error('Cannot deploy master stage in dev mode')
		}

		const { LandingPageStack } = await import('./stacks/landing-page/stack')
		const { TrpcApiStack } = await import('./stacks/trpc-api/stack')
		const { WebAppStack } = await import('./stacks/web')

		await Promise.all([
			LandingPageStack(),
			TrpcApiStack(),
			WebAppStack()
		])
	}
})
