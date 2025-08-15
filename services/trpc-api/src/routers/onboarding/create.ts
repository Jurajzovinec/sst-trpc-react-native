import { z } from 'zod'

import { publicProcedure } from '../../trpc'

export const createOnboarding = publicProcedure
	.input(
		z.object({
			name: z.string(),
			email: z.string().email(),
			preferences: z.string(),
			whateverElse: z.string()
		})
	)
	.mutation(async ({ input }) => {
		// Demo implementation - just return the input with an ID

		return {
			id: Math.random().toString(36).substr(2, 9),
			...input,
			createdAt: new Date().toISOString()
		}
	})
