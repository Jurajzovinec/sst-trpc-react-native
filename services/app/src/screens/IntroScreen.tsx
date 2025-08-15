import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colors, spacing } from '@/config/theme';

// import { trpc } from '../utils/api';

type RootStackParamList = {
  Intro: undefined;
  Login: undefined;
  Onboarding: undefined;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.md,
  },
  subtitle: {
    fontSize: 18,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginButton: {
    marginTop: spacing.md,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  loginButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const IntroScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // Backend API calls using tRPC
  // const greetQuery = useQuery(trpc.greet.queryOptions());
  // const farewellQuery = useQuery(trpc.farewell.queryOptions());
  // const createOnboardingMutation = useMutation(
  //   trpc.onboarding.create.mutationOptions(),
  // );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Momentum</Text>
      <Text style={styles.subtitle}>Your new favorite app</Text>

      {/* <Text style={styles.subtitle}>{JSON.stringify(greetQuery.data)}</Text> */}
      {/* <Text style={styles.subtitle}>{JSON.stringify(farewellQuery.data)}</Text> */}

      {/* <TouchableOpacity
        style={styles.button}
        onPress={() => {
          createOnboardingMutation.mutate({
            name: 'New Onboarding',
            email: 'new.onboarding@example.com',
            preferences: 'I like dark mode',
            whateverElse: 'This is some extra info',
          });
        }}
      >
        <Text style={styles.buttonText}>Create onboarding</Text>
      </TouchableOpacity>
      <View style={{ height: spacing.lg }} /> */}

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Onboarding')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.loginButton]}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default IntroScreen;
