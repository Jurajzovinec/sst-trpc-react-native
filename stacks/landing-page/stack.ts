// Do not deal with CORS now
const allowOrigins = ['*']

export function LandingPageStack() {
	const table = new sst.aws.Dynamo('Waitlist', {
		fields: {
			email: 'string'
		},
		primaryIndex: {
			hashKey: 'email'
		}
	})

	const api = new sst.aws.ApiGatewayV2('WaitListApi', {
		cors: {
			allowOrigins,
			allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
			// For now
			// allowCredentials: true
		}
	})

	api.route('GET /waitlist', {
		handler: './services/waiting-list/src/get.handler',
		link: [table],
		environment: {
			ALLOW_ORIGINS: allowOrigins.join(';')
		}
	})

	api.route('POST /waitlist', {
		handler: './services/waiting-list/src/create.handler',
		link: [table],
		environment: {
			ALLOW_ORIGINS: allowOrigins.join(';')
		}
	})

	const landingPage = new sst.aws.StaticSite('LandingPage', {
		path: 'services/landing-page',
		build: {
			command: 'npm run build',
			output: 'dist'
		},
		environment: {
			VITE_WAIT_LIST_API_URL: api.url
		}
	})

	return {
		landingPageCloudFrontUrl: landingPage.url,
		waitlistApiUrl: api.url
	}
}
