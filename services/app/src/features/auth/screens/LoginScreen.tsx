import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { AuthButton } from '@/features/auth/components/AuthButton';
import { useAuth } from '@/features/auth/hooks/useAuth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 40,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
});

const LoginScreen = () => {
  const {
    loading,
    error,
    handleGoogleLogin,
    handleFacebookLogin,
    handleAppleLogin,
  } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Sign in to continue</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <AuthButton
        title="Sign in with Google"
        onPress={handleGoogleLogin}
        icon="https://img.icons8.com/color/48/000000/google-logo.png"
      />
      <AuthButton
        title="Sign in with Facebook"
        onPress={handleFacebookLogin}
        icon="https://img.icons8.com/color/48/000000/facebook-new.png"
      />
      <AuthButton
        title="Sign in with Apple"
        onPress={handleAppleLogin}
        icon="https://img.icons8.com/ios-filled/50/000000/mac-os.png"
      />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
};

export default LoginScreen;
