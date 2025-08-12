type OnboardingAnswers = Record<string, string>;

export const submitOnboardingAnswers = async (answers: OnboardingAnswers) => {
  console.log('Mock API: Submitting onboarding answers', answers);
  // Simulate a network request
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
};
