import { StyleSheet, Text, View, TextInput, FlatList, Image} from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Module_input from '../components/Module_input';


const Main = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [notes, setNotes] = useState([]);

  const findNotes = async () => {
    const result = await AsyncStorage.close();
    if(result !== null) setNotes(JSON.parse(result));
        console.log(result)
  };

  const handleOnSubmit = async (title, desc, date) => {
    const note = { id: Date.now(), title, desc,date};
    const updatedNotes = [...notes, note];
    setNotes(updatedNotes);

    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
  };
  useEffect(() => {
    findNotes();
  }, []);

  return (
    
    <View style={styles.container}>
    <View style={[styles.box,{backgroundColor:'#DAC0DE'}]}>
        <Image style = {styles.img} source={{uri:'https://www.freeiconspng.com/thumbs/volcano-png/volcano-png-23.png'}}/>
        
        
         

      </View>
      
        
      <Module_input visible={modalVisible} onClose={() => setModalVisible(false)} onSubmit={handleOnSubmit}/>
    </View>
  );
};
export default Main

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 2,
    height: 50,
    borderRadius: 10,
    paddingLeft: 15,
    fontSize: 25,
    marginBottom: 15,  
  },

  container: {
    paddingHorizontal: 20,
    flex: 1,
    zIndex: 1,
  },

  addBtn: {
    position: 'absolute',
    right: 15,
    bottom: '10%',
    zIndex: 1,
  },
   box:{
    maxWidth:'150%',
    height:200,
    borderColor:'black',
    borderRadius:20,
    flexDirection:'column',
    
    alignContent:'center',
    alignItems:'center'
  },
    img:{
    width:50,
    height:50,
    
    zIndex:1,
  }
})