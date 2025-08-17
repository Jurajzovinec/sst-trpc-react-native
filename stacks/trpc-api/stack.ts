export function TrpcApiStack() {
	const allowOrigins = ['*']

	// const database = new sst.aws.Dynamo('Database', {})

	const api = new sst.aws.ApiGatewayV2('TrpcApi', {
		cors: {
			allowOrigins: ['*'],
			allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
			// For now
			// allowCredentials: true
		}
	})

	/* In case you want to use Cognito */
	// const auth = new sst.aws.CognitoUserPool('Auth')
	// api.route('ANY /trpc/{proxy+}', {
	// 	auth: {
	// 		userPool: auth
	// 	},
	// 	handler: './services/trpc-api/src/handler.handler',
	// 	environment: {
	// 		APP_URL: 'http://localhost:8081',
	// 		ALLOW_ORIGINS: allowOrigins.join(';')
	// 	}
	// })

	api.route('ANY /trpc/{proxy+}', {
		handler: './services/trpc-api/src/handler.handler',
		environment: {
			APP_URL: 'http://localhost:8081', // 👈 URL of expo app
			ALLOW_ORIGINS: allowOrigins.join(';')
		}
	})

	return {
		trpcApiUrl: api.url
	}
}
