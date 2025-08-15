import { StaticSite } from 'sst/constructs'
import type { StackContext } from 'sst/constructs/FunctionalStack'

export function WebAppStack({ stack }: StackContext): void {
	const web = new StaticSite(stack, 'WebApp', {
		path: 'services/app',
		buildCommand: 'pnpm install && pnpm run build',
		buildOutput: 'dist',
		environment: {
			NODE_ENV: 'production'
		}
	})

	stack.addOutputs({
		cloudfrontUrl: web.url
	})
}
