import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  SafeAreaView,
  StatusBar,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  username: Yup.string()
    .min(8, 'Username must be at least 8 characters')
    .matches(/^[a-zA-Z0-9]+$/, 'Cannot contain special characters')
    .required('Required'),
  password: Yup.string()
    .min(10, 'Password must be at least 10 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]+$/,
      'Must contain at least one uppercase letter, one lowercase letter, one number and one special character',
    )
    .notOneOf([Yup.ref('username')], 'Password cannot be same as username')
    .notOneOf([Yup.ref('email')], 'Password cannot be same as email')
    .required('Required'),
});

const Login = () => {
  // const [emailError, setEmailError] = React.useState(false);
  // const [usernameError, setUsernameError] = React.useState(false);
  // const [passwordError, setPasswordError] = React.useState(false);
  return (
    <SafeAreaView>
      <StatusBar barStyle="default" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scroll}>
        <View style={styles.appBar}>
          <Text style={styles.header}>Login With Validation</Text>
        </View>

        <Formik
          initialValues={{email: '', username: '', password: ''}}
          onSubmit={values => console.log(values)}
          validationSchema={validationSchema}>
          {({handleChange, handleBlur, handleSubmit, values, errors}) => (
            <View style={styles.container}>
              <Text style={styles.labelInput}>Email</Text>
              <TextInput
                onChangeText={handleChange('email')}
                onBlur={() => {
                  handleBlur('email');
                  // setEmailError(errors.email !== '');
                }}
                value={values.email}
                style={styles.inputField}
                placeholder="Email"
                placeholderTextColor={'grey'}
              />
              {errors.email && <Text style={styles.error}>{errors.email}</Text>}

              <Text style={styles.labelInput}>Username</Text>
              <TextInput
                onChangeText={handleChange('username')}
                onBlur={() => {
                  handleBlur('username');
                  console.log(errors.username);
                  // setUsernameError(errors.username !== '');
                }}
                value={values.username}
                style={styles.inputField}
                placeholder="Username"
                placeholderTextColor={'grey'}
              />
              {errors.username && (
                <Text style={styles.error}>{errors.username}</Text>
              )}

              <Text style={styles.labelInput}>Password</Text>
              <TextInput
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                style={styles.inputField}
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor={'grey'}
              />
              {errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}

              <Button
                onPress={(event: any) => {
                  handleSubmit(event);
                  Alert.alert('Form Submitted');
                }}
                title="Submit"
                color="#4330E9"
              />
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    paddingLeft: 20,
    paddingTop: 20,
    backgroundColor: 'black',
  },
  scroll: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
  appBar: {
    width: '100%',
    height: 50,
    backgroundColor: '#4330E9',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
  },
  header: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  labelInput: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    direction: 'ltr',
  },
  inputField: {
    width: '90%',
    height: 40,
    backgroundColor: '#D2D2D2',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
    color: 'black',
    // borderColor: isError ? 'red' : '#D2D2D2',
    // borderWidth: isError ? 2 : 0,
  },
  error: {
    color: 'red',
    fontSize: 15,
    fontWeight: 'bold',
    direction: 'ltr',
    marginBottom: 10,
  },
});

export default Login;
