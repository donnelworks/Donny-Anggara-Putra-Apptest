import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Button, Container, Gap, Header, Input} from '../components';
import {Row, Col} from 'react-native-responsive-grid-system';
import {Color} from '../utils';

const Form = ({navigation}) => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    age: '',
    photo: '',
  });

  const changeText = (val, input) => {
    setForm({
      ...form,
      [input]: val,
    });
  };

  return (
    <Container>
      <Header title="Add a contact" />
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
              // disabled={loading}
              loading={false}
              bgColor={Color.primary}
              color={Color.white}
              // onPress={() => submit()}
            >
              Add contact
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
