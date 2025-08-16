import { Cors } from 'aws-cdk-lib/aws-apigateway'
import { ApiGatewayV1Api, StaticSite, Table } from 'sst/constructs'
import type { StackContext } from 'sst/constructs/FunctionalStack'

// Do not deal with CORS now
const allowOrigins = ['*']

export function LandingPageStack({ stack }: StackContext): void {
	const landingPage = new StaticSite(stack, 'LandingPage', {
		path: 'services/landing-page'
	})

	const table = new Table(stack, 'Waitlist', {
		primaryIndex: { partitionKey: 'email' },
		fields: { email: 'string' },
	})

	const api = new ApiGatewayV1Api(stack, 'WaitListApi', {
		cdk: {
			restApi: {
				defaultCorsPreflightOptions: {
					allowOrigins,
					allowMethods: Cors.ALL_METHODS,
					allowCredentials: true
				}
			}
		},
		routes: {
			'GET /waitlist': {
				function: {
					handler: './services/waiting-list/src/get.handler',
					bind: [table],
					environment: {
						ALLOW_ORIGINS: allowOrigins.join(';'),
						TABLE_NAME: table.tableName
					}
				}
			},
			'POST /waitlist': {
				function: {
					handler: './services/waiting-list/src/create.handler',
					bind: [table],
					environment: {
						ALLOW_ORIGINS: allowOrigins.join(';'),
						TABLE_NAME: table.tableName
					}
				}
			}
		}
	})

	stack.addOutputs({
	  landingPageCloudFrontUrl: landingPage.url
	})

	stack.addOutputs({
		waitlistApiUrl: api.url
	})
}
