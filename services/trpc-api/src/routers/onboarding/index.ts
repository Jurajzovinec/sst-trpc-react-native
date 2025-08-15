import { router } from '../../trpc'
import { createOnboarding } from './create'
import { getOnboarding } from './get'

export const onboardingRouter = router({
	create: createOnboarding,
	get: getOnboarding
})
