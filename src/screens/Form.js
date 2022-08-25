import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Container, Gap, Header, Input} from '../components';
import {Row, Col} from 'react-native-responsive-grid-system';
import {Color, Url} from '../utils';
import axios from 'axios';

const Form = ({route, navigation}) => {
  const {id, mode} = route.params;
  const [loading, setLoading] = useState(false);
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
    axios
      .get(`${Url.api}contact/${id}`)
      .then(res => {
        setForm({
          id: id,
          firstName: res.data.data.firstName,
          lastName: res.data.data.lastName,
          age: String(res.data.data.age),
          photo: res.data.data.photo,
        });
      })
      .catch(err => {});
  };

  // Values
  let values = {
    // id: form.id,
    firstName: form.firstName,
    lastName: form.lastName,
    age: form.age,
    photo: form.photo,
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
  };

  // Change Text
  const changeText = (val, input) => {
    setForm({
      ...form,
      [input]: val,
    });
  };

  // Submit Contact
  const submit = () => {
    setLoading(true);
    if (mode === 'Add') {
      addContact();
    } else {
      updateContact();
    }
  };

  // Add Contact
  const addContact = () => {
    // console.log(values);
    // setLoading(false);

    axios
      .post(`${Url.api}contact`, values)
      .then(res => {
        console.log('oke');
        setLoading(false);
        navigation.goBack();
      })
      .catch(err => {
        console.log(err);
      });
  };

  // Update Contact
  const updateContact = () => {
    axios
      .put(`${Url.api}contact/${id}`, values)
      .then(res => {
        setLoading(false);
        navigation.goBack();
      })
      .catch(err => {});
  };

  return (
    <Container>
      <Header title={`${mode} a contact`} />
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
            <Input
              label="Last Name"
              value={form.lastName}
              onChangeText={val => changeText(val, 'lastName')}
            />
            <Input
              label="Age"
              keyboardType="numeric"
              value={form.age}
              onChangeText={val => changeText(val, 'age')}
            />
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
    </Container>
  );
};

export default Form;

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 20,
  },
});
