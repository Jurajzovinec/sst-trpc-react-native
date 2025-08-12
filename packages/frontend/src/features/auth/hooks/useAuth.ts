import { useState } from 'react';

import {
  loginWithGoogle,
  loginWithFacebook,
  loginWithApple,
} from '@/features/auth/api/auth';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await loginWithGoogle();
    } catch {
      setError('Failed to login with Google');
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await loginWithFacebook();
    } catch {
      setError('Failed to login with Facebook');
    } finally {
      setLoading(false);
    }
  };

  const handleAppleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await loginWithApple();
    } catch {
      setError('Failed to login with Apple');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    handleGoogleLogin,
    handleFacebookLogin,
    handleAppleLogin,
  };
};
