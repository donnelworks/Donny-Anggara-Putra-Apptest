import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ContactLists,
  Container,
  FloatingButton,
  Header,
  LoadingScreen,
  ModalConfirm,
  SwipeList,
} from '../components';
import axios from 'axios';
import {Color, Url} from '../utils';

const Home = ({navigation}) => {
  // Local State
  const [contacts, setContacts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [idConfirm, setIdConfirm] = useState('');

  // Init
  useEffect(() => {
    loadData();
  }, []);

  // Load Data
  const loadData = () => {
    axios
      .get(`${Url.api}contact`)
      .then(res => {
        setContacts(res.data.data);
        setLoadingScreen(false);
      })
      .catch(err => {});
  };

  //   Add Contact
  const addContact = () => {
    navigation.navigate('Form', {id: '', mode: 'Add'});
  };

  //   Edit Contact
  const editContact = id => {
    navigation.navigate('Form', {id: id, mode: 'Update'});
  };

  //   Confirm Delete
  const confirmDelete = id => {
    setIdConfirm(id);
    setModalVisible(true);
  };

  // Delete Contact
  const deleteContact = () => {
    console.log(`${Url.api}contact/${idConfirm}`);
    axios
      .delete(`${Url.api}contact/${idConfirm}`)
      .then(res => {
        setModalVisible(false);
        loadData();
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <>
      {loadingScreen ? (
        <LoadingScreen />
      ) : (
        <Container>
          <Header title="Contacts" />
          <ContactLists
            data={contacts}
            onEdit={id => editContact(id)}
            onDelete={id => confirmDelete(id)}
          />
          <FloatingButton onPress={() => addContact()} />
          <ModalConfirm
            visible={modalVisible}
            onCloseModal={() => setModalVisible(false)}
            onDelete={() => deleteContact()}
          />
        </Container>
      )}
    </>
  );
};

export default Home;

const styles = StyleSheet.create({});
