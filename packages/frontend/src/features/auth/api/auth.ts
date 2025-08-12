export const loginWithGoogle = async () => {
  console.log('Mock API: Logging in with Google');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, user: { name: 'Test User' } });
    }, 1000);
  });
};

export const loginWithFacebook = async () => {
  console.log('Mock API: Logging in with Facebook');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, user: { name: 'Test User' } });
    }, 1000);
  });
};

export const loginWithApple = async () => {
  console.log('Mock API: Logging in with Apple');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, user: { name: 'Test User' } });
    }, 1000);
  });
};
