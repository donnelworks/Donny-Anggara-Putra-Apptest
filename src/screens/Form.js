import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Button,
  Container,
  Gap,
  Header,
  Input,
  LoadingScreen,
} from '../components';
import {Row, Col} from 'react-native-responsive-grid-system';
import {Color, Url} from '../utils';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {getContacts} from '../redux/contactsSlice';

const Form = ({route, navigation}) => {
  // Global State
  const dispatch = useDispatch();
  // Local State
  const {id, mode} = route.params;
  const [loading, setLoading] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [errorFirstName, setErrorFirstName] = useState('');
  const [errorLastName, setErrorLastName] = useState('');
  const [errorAge, setErrorAge] = useState('');

  const [form, setForm] = useState({
    id: id,
    firstName: '',
    lastName: '',
    age: '',
    photo: '',
  });

  useEffect(() => {
    if (mode === 'Add') {
      clearForm();
    } else {
      getContact();
    }
  }, []);

  // Get Contact
  const getContact = () => {
    setLoadingScreen(true);
    axios
      .get(`${Url.api}contact/${id}`)
      .then(res => {
        setForm({
          id: id,
          firstName: res.data.data.firstName,
          lastName: res.data.data.lastName,
          age: String(res.data.data.age),
          photo: res.data.data.photo == 'N/A' ? '' : res.data.data.photo,
        });
        setLoadingScreen(false);
      })
      .catch(err => {});
  };

  // Values
  let values = {
    firstName: form.firstName,
    lastName: form.lastName,
    age: Number(form.age),
    photo: form.photo == '' ? 'N/A' : form.photo,
  };

  // Clear Form
  const clearForm = () => {
    setForm({
      id: '',
      firstName: '',
      lastName: '',
      age: '',
      photo: '',
    });
    setErrorFirstName('');
    setErrorLastName('');
    setErrorAge('');
  };

  // Change Text
  const changeText = (val, input) => {
    setForm({
      ...form,
      [input]: val,
    });
  };

  // Validate Contact
  const submit = () => {
    setErrorFirstName('');
    setErrorLastName('');
    setErrorAge('');
    if (
      form.firstName == '' ||
      form.lastName == '' ||
      form.age == '' ||
      form.firstName.length < 3 ||
      form.lastName.length < 3 ||
      form.age == 0 ||
      form.firstName.length > 30 ||
      form.lastName.length > 30 ||
      form.age > 200
    ) {
      if (form.firstName === '') {
        setErrorFirstName('First Name is required');
      } else if (form.firstName.length < 3 || form.firstName.length > 30) {
        if (form.firstName.length < 3) {
          setErrorFirstName(
            'First Name length must be at least 3 characters long',
          );
        }
        if (form.firstName.length > 30) {
          setErrorFirstName(
            'First Name length must be less than or equal to 30 characters long',
          );
        }
      } else {
        setErrorFirstName('');
      }

      if (form.lastName === '') {
        setErrorLastName('Last Name is required');
      } else if (form.lastName.length < 3 || form.lastName.length > 30) {
        if (form.lastName.length < 3) {
          setErrorLastName(
            'Last Name length must be at least 3 characters long',
          );
        }
        if (form.lastName.length > 30) {
          setErrorLastName(
            'Last Name length must be less than or equal to 30 characters long',
          );
        }
      } else {
        setErrorLastName('');
      }

      if (form.age === '') {
        setErrorAge('Age is required');
      } else if (form.age == 0 || form.age > 200) {
        if (form.age == 0) {
          setErrorAge('Age must be less than or equal to 200');
        }
        if (form.age > 200) {
          setErrorAge('Age must be less than or equal to 200');
        }
      } else {
        setErrorAge('');
      }
    } else {
      if (mode === 'Add') {
        setLoading(true);
        addContact();
      } else {
        updateContact();
      }
    }
  };

  // Add Contact
  const addContact = async () => {
    axios
      .post(`${Url.api}contact`, values)
      .then(res => res.data.data)
      .then(data => {
        dispatch(getContacts());
        setLoading(false);
        navigation.goBack();
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  // Update Contact
  const updateContact = () => {
    axios
      .put(`${Url.api}contact/${id}`, values)
      .then(res => {
        dispatch(getContacts());
        setLoading(false);
        navigation.goBack();
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  return (
    <Container>
      <Header title={`${mode} a contact`} onPress={() => navigation.goBack()} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Row rowStyles={styles.formContainer}>
          <Col xs={12}>
            <Input
              label="First Name"
              value={form.firstName}
              onChangeText={val => changeText(val, 'firstName')}
            />
            <Text style={styles.textError}>{errorFirstName}</Text>
            <Input
              label="Last Name"
              value={form.lastName}
              onChangeText={val => changeText(val, 'lastName')}
            />
            <Text style={styles.textError}>{errorLastName}</Text>
            <Input
              label="Age"
              keyboardType="numeric"
              value={form.age}
              onChangeText={val => changeText(val, 'age')}
            />
            <Text style={styles.textError}>{errorAge}</Text>
            <Input
              label="Photo (URL)"
              value={form.photo}
              onChangeText={val => changeText(val, 'photo')}
            />
          </Col>
          <Col xs={12}>
            <Gap height={10} />
            <Button
              disabled={loading}
              loading={loading ? true : false}
              bgColor={Color.primary}
              color={Color.white}
              onPress={() => submit()}>
              {`${mode} contact`}
            </Button>
          </Col>
        </Row>
      </ScrollView>

      {loadingScreen && <LoadingScreen />}
    </Container>
  );
};

export default Form;

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 20,
  },
  textError: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: Color.error,
  },
});
