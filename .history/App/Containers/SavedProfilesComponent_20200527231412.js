import React from 'react';
import {
  StyleSheet,
  Alert,
  View,
  Text,
  Button,
  ScrollView,
  TextInput,
} from 'react-native';
import CheckBox from 'react-native-check-box';

const SavedProfilesComponent = () => {
  return (
    <View>
      <CheckBox
        checkBoxColor="skyblue"
      />
      <Text>
        A random To-Do item
      </Text>
    </View>
  );
};