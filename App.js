import React,{useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
 
export default function App() {
  const [name, setName] = useState('Trocar Texto?')
  const [input, setInput] = useState('')

  useEffect(()=>{
    async function mostrarNome(){
      const nomeSalvo = await AsyncStorage.getItem('nome');

      if(nomeSalvo !== null){
        setName(nomeSalvo)
      }
    }

    salvarNome();
  },[])
  
  useEffect(()=>{
    async function salvarNome(){
      await AsyncStorage.setItem('nome', name)
    }

    salvarNome();
  },[name])

  function trocaNome(){
    setName(input)
  }


 
  return (
    <View style={styles.container}>
      <Text>Mandar o Texto</Text>
      <TextInput style={styles.input} value={input} onChangeText={(texto)=>setInput(texto)} />
      <TouchableOpacity style={styles.botao} onPress={()=>trocaNome()}> Trocar </TouchableOpacity>
      <Text> {name} </Text>
 
      <Text style={{marginTop:'25px'}}>---</Text>
 
      <Text style={{marginTop:'25px'}}>Texto Simultaneo</Text>
      <TextInput style={styles.input} onChangeText={(texto)=>setName(texto)} />
      <Text> {name} </Text>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
 
  },
  botao: {
    width:'60px',
    height:'30px',
    borderRadius:'5px',
    backgroundColor:'#00FFFF',
    borderWidth:1,
    borderColor:'black',
    alignItems:'center',
    justifyContent:'center',
    marginTop:'10',
    
  },
  input: {
    width:'300px',
    height:'30px',
    borderRadius:1,
    borderWidth:2,
 
  },
});