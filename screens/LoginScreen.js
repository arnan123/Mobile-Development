import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import Logo from '../components/Logo';
import Login from '../components/Signup/Login';
import Signup from '../components/Signup/Signup';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [status, setStatus] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.replace('Home');
      }
    });

    return unsubscribe;
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Logo />
      {status ? (
        <Login setStatus={setStatus} />
      ) : (
        <Signup setStatus={setStatus} />
      )}

      <View style={styles.buttonOtherContainer}>
        <TouchableOpacity
          style={[styles.buttonOther, { borderColor: 'black' }]}
        >
          <Text style={styles.buttonText}>Sign in with google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonOther]}>
          <Text style={styles.buttonOutlineText}>
            Sign in with facebook
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    borderWidth: 2,
  },
  buttonContainer: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#7dff83',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: '#bababa',
    marginTop: 5,
  },
  buttonText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOtherContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonOther: {
    marginHorizontal: 20,
    marginTop: 5,
  },
  buttonGoogle: {
    borderColor: 'black',
    borderWidth: 1,
  },
  buttonFacebook: {
    backgroundColor: 'blue',
  },
});
