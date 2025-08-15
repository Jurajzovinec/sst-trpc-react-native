import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

import { t } from '../trpc'
import { onboardingRouter } from './onboarding'

export const appRouter = t.router({
	greet: t.procedure.query(() => {
		return 'Hello from tRPC! This is a greeting from the server.'
	}),

	farewell: t.procedure.query(() => {
		// We can access the database here if needed 👇
		// const user = someDatabaseCall(params.ctx.userCognitoId);
		return 'Goodbye from tRPC!'
	}),

	// Specify complete onboarding router 👇
	onboarding: onboardingRouter
})

// Export only the type of a router!
// This prevents us from importing server code on the client.
export type AppRouter = typeof appRouter

/**
 * Inference helpers for input types
 * @example
 * type PostByIdInput = RouterInputs['post']['byId']
 *      ^? { id: number }
 **/
export type RouterInputs = inferRouterInputs<AppRouter>

/**
 * Inference helpers for output types
 * @example
 * type AllPostsOutput = RouterOutputs['post']['all']
 *      ^? Post[]
 **/
export type RouterOutputs = inferRouterOutputs<AppRouter>
