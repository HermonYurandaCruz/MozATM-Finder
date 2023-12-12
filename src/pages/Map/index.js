import React, { useEffect, useState } from "react";
import MapView, { Marker }  from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import styles from './styles';
import bankInfra from '../../../src/assets/bankInfra.png'


export default function Map(){
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigation = useNavigation();

  const addBank=() => {
    navigation.navigate('AddBank');
  };

  useEffect(() => {
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
          <Marker
            coordinate={{
              latitude: -25.9660234, // Coordenadas do marcador
              longitude: 32.5736383,
            }}
            title="Standard bank"
            description="Aberto:  08:00–15:00"
            image ={require('../../../src/assets/logoMap.png')}
          />
        </MapView>
      ) : (
        <Text style={styles.textEspera}>Aguardando a obtenção da localização...</Text>
      )}
      <TouchableOpacity style={styles.buttonAdd} onPress={addBank}>
      <Ionicons name="md-add-circle-outline" size={56} color="rgba(15, 82, 87, 1)" />    
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={getLocation}>
      <Ionicons name="locate-sharp" size={56} color="rgba(15, 82, 87, 1)" />
      </TouchableOpacity>
    </View>
  );
};