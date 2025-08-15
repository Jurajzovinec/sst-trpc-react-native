import { z } from 'zod'

import { publicProcedure } from '../../trpc'

export const getOnboarding = publicProcedure
	.input(
		z.object({
			id: z.string()
		})
	)
	.query(async ({ input }) => {
		// Demo implementation - return mock data
		return {
			id: input.id,
			name: 'John Doe',
			email: 'john.doe@example.com',
			preferences: 'notifications_enabled',
			createdAt: new Date().toISOString()
		}
	})
