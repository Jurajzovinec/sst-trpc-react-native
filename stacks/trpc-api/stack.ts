import { Cors } from 'aws-cdk-lib/aws-apigateway'
import type { StackContext } from 'sst/constructs'
import { ApiGatewayV1Api } from 'sst/constructs'

interface TrpcApiStackOutput {
	restApi: ApiGatewayV1Api<{
		/* In case you want to use Cognito */
		// AppCognitoAuth: {
		// 	type: 'user_pools'
		// 	userPoolIds: string[]
		// 	identitySource: string
		// }
	}>
}

export function TrpcApiStack({ stack }: StackContext): TrpcApiStackOutput {
	const allowOrigins = ['*']

	// const database = new sst.aws.DynamoDB(stack, 'Database', {})

	const api = new ApiGatewayV1Api(stack, 'TrpcApi', {
		cdk: {
			restApi: {
				defaultCorsPreflightOptions: {
					allowOrigins,
					allowMethods: Cors.ALL_METHODS,
					allowCredentials: true
				}
			}
		},
		/* In case you want to use Cognito */
		// authorizers: {
		// 	AppCognitoAuth: {
		// 		type: 'user_pools',
		// 		userPoolIds: [resources.userPool.userPoolId],
		// 		identitySource: 'method.request.header.Authorization'
		// 	}
		// },
		routes: {
			'ANY /trpc/{proxy+}': {
				/* In case you want to use Cognito */
				// authorizer: 'AppCognitoAuth',
				function: {
					handler: './services/trpc-api/src/handler.handler',
					environment: {
						APP_URL: 'http://localhost:8081', // 👈 URL of expo app
						ALLOW_ORIGINS: allowOrigins.join(';')
					}
				}
			}
		}
	})

	stack.addOutputs({
		trpcApiUrl: api.url
	})

	return {
		restApi: api
	}
}
