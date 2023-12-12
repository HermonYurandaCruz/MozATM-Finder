import React, { useState } from 'react';
import {View,TouchableOpacity,Text} from 'react-native';
import styles from './styles';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';

import {Dropdown} from 'react-native-element-dropdown'

import { Ionicons,AntDesign,MaterialCommunityIcons  } from '@expo/vector-icons';


export default function AddBank(){

  const [open, setOpen] = useState(false);

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
 
  const [items, setItems] = useState([
    { label: 'absa bank', value: 'opcao1' },
    { label: 'Standard bank', value: 'opcao2' },
    { label: 'BCI', value: 'opcao3' },
  ]);

  const [itemsATM, setItemsATM] = useState([
    { label: 'Banco', value: 'opcao1' },
    { label: 'ATM', value: 'opcao2' },
  ]);


  
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const data=[
    { label: 'Banco', value: 'opcao1' },
    { label: 'ATM', value: 'opcao2' },
  ];


  

    const navigation = useNavigation();
    return(

      <View style={styles.container}>
      <View style={styles.heade}>
          <Ionicons name="arrow-back-outline" size={24} color="black" onPress={()=>navigation.goBack()} />
          <Text style={styles.TextHeade}>Adicionar Banco ou ATM</Text>
       </View>
      
        <Text style={styles.TituloATM}>Nome do Banco</Text>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'rgba(37, 78, 70, 1)' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? 'rgba(37, 78, 70, 1)' : 'rgba(37, 78, 70, 1)'}
              name="bank"
              size={20}
            />
          )}
        />
        

        <Text style={styles.TituloATM} >Escolha o Estabelecimento</Text>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'rgba(37, 78, 70, 1)' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? 'rgba(37, 78, 70, 1)' : 'rgba(37, 78, 70, 1)'}
              name="Safety"
              size={20}
            />
          )}
        />

      <TouchableOpacity style={styles.camera}>
          <View style={styles.camera}>
          <MaterialCommunityIcons name="camera-outline" size={72} color="black" />
          <Text style={styles.Titulo}>Capture uma Imagem do</Text>
          <Text style={styles.Titulo}>Banco/ATM</Text>
          </View>
      </TouchableOpacity>

      <View style={styles.termosCondi}>
      <Text style={styles.termos}>Aceito os termos e condicoes.</Text>
      <Text style={styles.termosLink}> Ler agora</Text>
      </View>

      <TouchableOpacity style={styles.button} >
                <Text style={styles.text}>Submeter</Text>
      </TouchableOpacity>
               
        





      </View>  


    )
}