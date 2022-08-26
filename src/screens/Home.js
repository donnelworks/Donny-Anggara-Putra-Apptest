import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
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
  const [scaleButton, setScaleButton] = useState(1);

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
    axios
      .delete(`${Url.api}contact/${idConfirm}`)
      .then(res => {
        setModalVisible(false);
        loadData();
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  // Scroll List
  const onScrollHandle = scroll => {
    if (scroll == 'start') {
      setScaleButton(0);
    } else {
      setScaleButton(1);
    }
  };
  return (
    <Container>
      <Header title="Contacts" isHome />
      {loadingScreen ? (
        <ActivityIndicator size="large" color={Color.primary} />
      ) : (
        <ContactLists
          data={contacts}
          onEdit={id => editContact(id)}
          onDelete={id => confirmDelete(id)}
          onScroll={scroll => onScrollHandle(scroll)}
        />
      )}
      <FloatingButton onPress={() => addContact()} onScale={scaleButton} />
      <ModalConfirm
        visible={modalVisible}
        onCloseModal={() => setModalVisible(false)}
        onDelete={() => deleteContact()}
      />
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({});
