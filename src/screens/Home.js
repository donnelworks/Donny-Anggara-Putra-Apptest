import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ContactLists, Container, FloatingButton, Header} from '../components';
import axios from 'axios';
import {Color, Url} from '../utils';

const Home = ({navigation}) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  // Load Data
  const loadData = () => {
    axios
      .get(`${Url.api}contact`)
      .then(res => {
        setContacts(res.data.data);
      })
      .catch(err => {});
  };

  //   Add Contact
  const addContact = () => {
    navigation.navigate('Form');
  };
  return (
    <Container>
      <Header title="Contacts" />
      <ContactLists data={contacts} />
      <FloatingButton onPress={() => addContact()} />
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({});
