import React, { useState } from 'react';

import { Picker } from '@react-native-picker/picker';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Platform,
} from 'react-native';

export const SelectInput = ({ options, value, onValueChange }) => {
  const [modalVisible, setModalVisible] = useState(false);

  if (Platform.OS === 'ios') {
    return (
      <>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.input}
        >
          <Text>{value || 'Select an option'}</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Picker
                selectedValue={value}
                onValueChange={(itemValue) => {
                  onValueChange(itemValue);
                }}
              >
                {options.map((option) => (
                  <Picker.Item key={option} label={option} value={option} />
                ))}
              </Picker>
              <Button title="Done" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
      </>
    );
  }

  return (
    <Picker
      selectedValue={value}
      onValueChange={(itemValue) => onValueChange(itemValue)}
    >
      {options.map((option) => (
        <Picker.Item key={option} label={option} value={option} />
      ))}
    </Picker>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    justifyContent: 'center',
    height: 40,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
