import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Text,
  StatusBar,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import Item_Btn from './itemBtn';


const Module_input = ({ visible, onSubmit, note, isEdit, onClose }) => {
  const [date, setDate] = useState('09-10-2021');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const handleModalClose = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (isEdit) {
      setTitle(note.title);
      setDesc(note.desc);
      setDate(note.date)
    }
  }, [isEdit]);
 

  const handleOnChangeText = (text, valueFor,date) => {
    if (valueFor === 'title') setTitle(text);
    if (valueFor === 'desc') setDesc(text);
    if (valueFor === 'date') setDate(text);
  };
 
  

  const closeModal = () => {
    if (!isEdit) {
      setTitle('');
      setDesc('');
      setDate('');
    }
    onClose();
  };

  
  const handleSubmit = () => {
    if (!date.trim() && !title.trim() && !desc.trim()) return onClose();
    onSubmit(title,desc,date);
    setTitle('');
    setDate('');
    setDesc('');
    onClose();
    
  }
  return (
    <>
      <StatusBar hidden />
      <Modal visible={visible} animationType='slide'>
        <View style={styles.container}>
          <TextInput
            value={title}
            onChangeText={text => handleOnChangeText(text, 'title')}
            keyboardType="default"
            placeholder='Город: '
            
            style={[styles.input, styles.desc]}
          />
          <TextInput
            value={desc}
            multiline
            placeholder='Заметки'
            keyboardType='default'
            style={[styles.input, styles.desc]}
            onChangeText={text => handleOnChangeText(text, 'desc')}
          />
        <DatePicker
          style={styles.datePickerStyle}
          date={date}
          mode="date"
          placeholder="Выберите дату"
          format="DD/MM/YYYY"
          minDate="01-01-2022"
          maxDate="01-01-2040"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          useNativeDriver='true'
          customStyles={{
              
            dateIcon: {
              position: 'absolute',
              right: -15,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              borderColor : "gray",
              alignItems: "flex-start",
              borderWidth: 0,
              borderBottomWidth: 1,
            },
            placeholderText: {
              fontSize: 17,
              color: "gray"
            },
            dateText: {
              fontSize: 17,
            }
          }}
          onDateChange={(date) => {
            setDate(date);
          }}
        />
          
          <View style={styles.btnContainer}>
            <Item_Btn
              size={15}
              antIconName='check'
              onPress={handleSubmit}
              
            />
            {title.trim() || desc.trim() ? (
              <Item_Btn
                size={15}
                style={{ marginLeft: 15 }}
                antIconName='close'
                onPress={closeModal}
              />
            ) : null}
          </View>
        </View>
        <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: '20%',
  },
    datePickerStyle: {
    width: 230,
    justifyContent:'center',
    alignItems:'center',
    paddingTop:30
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: '#dbb2ff',
    fontSize: 20,
    color: '#1e1e1e',
  },
  title: {
    height: 40,
    marginBottom: '10%',
    fontWeight: 'bold',
  },
  desc: {
    height: '17%',
  },

  modalBG: {
    flex: 1,
    zIndex: -1,
  },
  
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: '10%',
  },
});

export default Module_input;