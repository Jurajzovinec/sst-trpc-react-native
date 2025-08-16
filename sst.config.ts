import type { SSTConfig } from 'sst'
import { TrpcApiStack } from './stacks/trpc-api/stack'
import { WebAppStack } from './stacks/web'
import { LandingPageStack } from './stacks/landing-page/stack'

const config: SSTConfig = {
	config(globals) {
		// TODO: Figure this out from Purple stack
		const stage = "dev"

		return {
			name: 'evolv-stack',
			stage,
			region: 'eu-central-1'
		}
	},
	stacks(app) {
		if (app.stage === 'master' && app.mode === 'dev') {
			throw new Error('Cannot deploy master stage in dev mode')
		}

		app.setDefaultFunctionProps({
			runtime: 'nodejs20.x',
			architecture: 'arm_64',
			logRetention: 'three_months',
			logRetentionRetryOptions: { maxRetries: 100 },
			tracing: 'disabled',
			environment: {
				// https://docs.powertools.aws.dev/lambda/typescript/latest/#environment-variables
				POWERTOOLS_DEV: app.local ? 'true' : 'false',
				POWERTOOLS_LOG_LEVEL: app.local
					? 'DEBUG'
					: 'INFO'
			}
		})

		app
			.stack(LandingPageStack)
			.stack(TrpcApiStack)
			.stack(WebAppStack)
	}
} satisfies SSTConfig

export default config
