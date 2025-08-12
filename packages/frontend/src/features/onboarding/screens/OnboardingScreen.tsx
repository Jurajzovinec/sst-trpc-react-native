import React from 'react';

import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  Switch,
  FlatList,
  SafeAreaView,
} from 'react-native';

import { submitOnboardingAnswers } from '@/features/onboarding/api/onboarding';
import { SelectInput } from '@/features/onboarding/components/SelectInput';
import { onboardingQuestions } from '@/features/onboarding/constants/onboardingQuestions';
import { useOnboarding } from '@/features/onboarding/hooks/useOnboarding';

const Question = ({ question, value, onAnswerChange }) => {
  const { type, text, options } = question;

  const renderInput = () => {
    switch (type) {
      case 'text':
        return (
          <TextInput
            style={styles.input}
            onChangeText={(text) => onAnswerChange(question.id, text)}
            value={value}
          />
        );
      case 'numeric':
        return (
          <TextInput
            style={styles.input}
            onChangeText={(text) => onAnswerChange(question.id, text)}
            value={value}
            keyboardType="numeric"
          />
        );
      case 'boolean':
        return (
          <Switch
            onValueChange={(val) => onAnswerChange(question.id, val)}
            value={value}
          />
        );
      case 'select':
        return (
          <SelectInput
            options={options}
            value={value}
            onValueChange={(itemValue) =>
              onAnswerChange(question.id, itemValue)
            }
          />
        );
      case 'date':
        return <Text>Date picker not implemented yet.</Text>;
      case 'time':
        return <Text>Time input not implemented yet.</Text>;
      default:
        return null;
    }
  };

  return (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>{text}</Text>
      {renderInput()}
    </View>
  );
};

const OnboardingScreen = () => {
  const { answers, handleAnswerChange } = useOnboarding();

  const handleSubmit = () => {
    submitOnboardingAnswers(answers);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={onboardingQuestions}
        renderItem={({ item }) => (
          <Question
            question={item}
            value={answers[item.id]}
            onAnswerChange={handleAnswerChange}
          />
        )}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<Text style={styles.title}>Onboarding</Text>}
        ListFooterComponent={<Button title="Submit" onPress={handleSubmit} />}
        contentContainerStyle={styles.listContentContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  listContentContainer: {
    paddingBottom: 40, // Ensure submit button doesn't get cut off
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  questionContainer: {
    marginBottom: 15,
    width: '100%',
  },
  questionText: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '100%',
  },
});

export default OnboardingScreen;
