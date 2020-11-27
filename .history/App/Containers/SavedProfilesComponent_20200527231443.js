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

const styles = StyleSheet.create({
    profilesItem: {
      flexDirection: 'row',
      marginVertical: 10,
      alignItems: 'center',
  
    },
    profilesText: {
      borderColor: '#afafaf',
      paddingHorizontal: 5,
      paddingVertical: 7,
      borderWidth: 1,
      borderRadius: 5,
      marginRight: 10,
      minWidth: "50%",
      textAlign: "center"
    },
  });