import React, { useState, useEffect } from 'react';
import { Alert, Image, PermissionsAndroid, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Icon  from 'react-native-vector-icons/MaterialIcons';



function Main({ navigation }) {
  const [currentRegion, setCurrentRegion] = useState(null);
  useEffect(() => {
    async function loadInitialPosition() {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          ({ coords: { latitude, longitude } }) => {
            setCurrentRegion({
              latitude,
              longitude,
              latitudeDelta: 0.04,
              longitudeDelta: 0.04,
            })
          },
          error => {
            console.err('Erro ao carregar sua localização');;
            Alert.alert('Erro ao pegar a latitude e longitude');
          },
          {
            timeout: 2000,
            enableHighAccuracy: true,
            maximumAge: 1000
          }
        )
      } else {
        Alert.alert('Permissão de localização não concedida');
      }
    }
    loadInitialPosition();
  }, []);

  if (!currentRegion) {
    return null;
  }

  return (
    <>
      <MapView initialRegion={currentRegion} style={styles.map}>
        <Marker coordinate={{ latitude: -23.937400, longitude: -52.489500 }}>
          <Image style={styles.avatar} source={{ uri: 'https://avatars0.githubusercontent.com/u/7030943?s=460&v=4' }} />
          <Callout onPress={() => {
            navigation.navigate('Profile', { github_username: 'luizeduul' });
          }}>
            <View style={styles.callout}>
              <Text style={styles.devName}>Luiz Uliana</Text>
              <Text style={styles.devBio}>Reacteiro de Plantão</Text>
              <Text style={styles.devTechs}>ReactJS, ReactNative, NodeJS</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>

      <View style={styles.searchForm}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar devs por Techs..."
          placeholderTextColor='#999'
          autoCapitalize='words'
          autoCorrect={false} />
        <TouchableOpacity onPress={() => { }} style={styles.loadButton}>
          <Icon name="my-location" size={20} color="#FFF"/>
        </TouchableOpacity>

      </View>
    </>
  )

}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#FFF'
  },
  callout: {
    width: 260
  },
  devName: {
    fontWeight: 'bold',
    fontSize: 16
  },
  devBio: {
    color: '#666',
    marginTop: 5
  },
  devTechs: {
    marginTop: 5
  },
  searchForm: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: 'row',
  },
  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4
    },
    elevation: 2,

  },
  loadButton: {
    width: 50,
    height: 50,
    backgroundColor: '#8E4DFF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15
  }

})

export default Main;