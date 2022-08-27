import {StyleSheet, Text, View, Modal} from 'react-native';
import React from 'react';
import {Row, Col} from 'react-native-responsive-grid-system';
import {Color} from '../utils';
import Button from './Button';
import Gap from './Gap';

const ModalConfirm = ({visible, onDelete, onCloseModal}) => {
  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={visible}>
        <View style={styles.modalWrapper}>
          <View style={styles.modalBody}>
            <Row rowStyles={{marginBottom: 20}}>
              <Col xs={12} colStyles={{alignItems: 'center'}}>
                <Text style={styles.textModalTitle}>Delete contact?</Text>
              </Col>
            </Row>
            <Row>
              <Col xs={6} colStyles={{paddingRight: 5}}>
                <Button
                  size="sm"
                  onPress={() => onDelete()}
                  loading={false}
                  bgColor={Color.primary}
                  color={Color.white}>
                  Delete
                </Button>
              </Col>
              <Col xs={6} colStyles={{paddingLeft: 5}}>
                <Button
                  size="sm"
                  onPress={() => onCloseModal()}
                  loading={false}
                  bgColor={Color.white}
                  color={Color.primary}>
                  Cancel
                </Button>
              </Col>
            </Row>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalConfirm;

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalBody: {
    backgroundColor: Color.white,
    padding: 10,
    marginHorizontal: 40,
    borderRadius: 10,
    // alignItems: 'center',
    justifyContent: 'center',
    elevation: 20,
  },
  textModalTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Color.dark,
  },
});
