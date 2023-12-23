import React, { useEffect, useState } from "react";
import MapView, { Marker }  from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';


import api from '../../services/api'

import { Image,TouchableOpacity, Text,ActivityIndicator, View, StyleSheet } from 'react-native';
import styles from './styles';
import gif from '../../../src/assets/giftMap.gif'


export default function MapaAgentes(){
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [maly,setMaly]= useState([])


  async function loadMaly(){
    const response = await api.get(`/maly/searchMalyByTipo?tipo=${"Agente"}`);
    setMaly(response.data)
  }

  
  const navigation = useNavigation();

  useEffect(() => {
    loadMaly();

    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permissão de localização negada');
      return;
    };

    let newLocation = await Location.getCurrentPositionAsync({});
    setLocation(newLocation);
    if (newLocation) {
      mapRef.current.animateToRegion({
        latitude: newLocation.coords.latitude,
        longitude: newLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const mapRef = React.useRef(null);


  return (
    <View style={styles.container}>
    
      {location ? (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true} 
          followsUserLocation={true}
        >
           {maly.map((item) => (
    <Marker
      key={item.id}
      coordinate={{
        latitude: item.latitude,
        longitude: item.longitude,
      }}
      title={item.nomeInstituicao}
      description={item.nomePropretario}
    >
      <Image style={{ width: 30, height: 30, borderRadius:100 }} source={{ uri: item.foto_urlInstituicao }} />

    </Marker>
  ))}
        </MapView>
      ) : (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        
        <Image style={{ width: 350, height: 350, borderRadius:100 }} source={gif}/>
        <Text style={styles.textEspera}>Aguardando a obtenção da localização...</Text>
        <ActivityIndicator size="large" color="#B0BEC5" />

      </View>      
      )}

       <TouchableOpacity style={styles.voltar} onPress={()=>navigation.goBack()}>  
        <Ionicons name="arrow-back-outline" size={24} color="black"  />
        </TouchableOpacity>


      
      <TouchableOpacity style={styles.button} onPress={getLocation}>
      <Ionicons name="locate-sharp" size={56} color="rgba(15, 82, 87, 1)" />
      </TouchableOpacity>
    </View>
  );
};