import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Alert,
  TextInput,
  FlatList,
} from 'react-native';
import { RootStackParams } from '../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../components/UI/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { setName, setAge, increaseAge, getCities } from '../redux/actions';

type Props = NativeStackScreenProps<RootStackParams, 'Home'>;

export const Home = ({ navigation }: Props) => {
  // @ts-ignore
  const { name, age, cities } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  // const [name, setName] = useState('');
  // const [age, setAge] = useState('');

  useEffect(() => {
    getData();
    dispatch(getCities());
  }, []);

  const getData = () => {
    try {
      // AsyncStorage.getItem('UserData').then((value) => {
      //   if (value !== null) {
      //     let user = JSON.parse(value);
      //     setName(user.Name);
      //     setAge(user.Age);
      // }
      // });
      dispatch(setName(name));
      dispatch(setAge(age));
    } catch (error) {
      console.log(error);
    }
  };
  const updateData = async () => {
    if (name.length === 0) {
      Alert.alert('Warning', 'Please write your name.');
    } else {
      try {
        dispatch(setName(name));
        dispatch(setAge(age));
        // const user = {
        //   Name: name,
        // };
        // await AsyncStorage.mergeItem('UserData', JSON.stringify(user));
        // Alert.alert('Success!', 'You have updated your name!');
      } catch (error) {
        console.log(error);
      }
    }
  };
  const removeData = async () => {
    try {
      // await AsyncStorage.clear();
      dispatch(setName(''));
      dispatch(setAge(''));
      navigation.navigate('Login', {});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.containerText}>Welcome {name} !</Text>
      <FlatList
        data={cities}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.country}</Text>
            <Text style={styles.subtitle}>{item.city}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff011',
    alignItems: 'center',
  },
  containerText: {
    fontSize: 40,
    margin: 10,
    fontFamily: 'CookieRegular',
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    textAlign: 'center',
    fontSize: 25,
    marginBottom: 10,
  },
  item: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 5,
    margin: 7,
    width: 350,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    margin: 10,
  },
  subtitle: {
    fontSize: 20,
    margin: 10,
    color: '#999',
  },
});
