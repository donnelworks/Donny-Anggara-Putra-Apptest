import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ContactLists,
  Container,
  FloatingButton,
  Header,
  ModalConfirm,
} from '../components';
import axios from 'axios';
import {Color, Url} from '../utils';
import {useSelector, useDispatch} from 'react-redux';
import {contactSelectors, getContacts} from '../redux/contactsSlice';

const Home = ({navigation}) => {
  // Global State
  const dispatch = useDispatch();
  const contacts = useSelector(contactSelectors.selectAll);

  // Local State
  const [modalVisible, setModalVisible] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [id, setId] = useState('');
  const [scaleButton, setScaleButton] = useState(1);

  // Init
  useEffect(() => {
    loadData();
  }, [dispatch]);

  // Load Data
  const loadData = async () => {
    await dispatch(getContacts());
    setLoadingScreen(false);

    // LOCAL GET
    // ==========
    // axios
    //   .get(`${Url.api}contact`)
    //   .then(res => {
    //     dispatch(getContacts(res.data.data));
    //     setLoadingScreen(false);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
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
    setId(id);
    setModalVisible(true);
  };

  // Delete Contact
  const deleteContact = () => {
    axios
      .delete(`${Url.api}contact/${id}`)
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
