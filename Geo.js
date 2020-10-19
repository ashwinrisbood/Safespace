import React, { Component } from 'react';
import {View, Text, Switch, StyleSheet } from 'react-native'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions';

class Geo extends Component {

    constructor(props) {
        super(props);
        this.getLocationAsync();
    }

    state= {
        location:null,
        geocode:null,
        errorMessage:""
      }
    
    componentDidMount()
    {
        setInterval(this.getLocationAsync(), 5000);
    }

    getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }
        let location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Highest});
        const { latitude , longitude } = location.coords
        this.getGeocodeAsync({latitude, longitude})
        this.setState({ location: {latitude, longitude}});
    };

    getGeocodeAsync= async (location) => {
        let geocode = await Location.reverseGeocodeAsync(location)
        console.log(geocode);
        this.setState({ geocode})
    };
    
    render(){
        // console.log(this.state)this.getLocationAsync();
        const {location,geocode, errorMessage } = this.state
        return (
            <View style={styles.overlay}>
                <Text>helasdasdloasdas</Text>
                <Text>{geocode  ? `${geocode[0].city}, ${geocode[0].isoCountryCode}` :""}</Text>
                <Text>{geocode ? geocode[0].street :""}</Text>
                <Text>{location ? `${location.latitude}, ${location.longitude}` :""}</Text>
                <Text>{errorMessage}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    overlay:{
      height:"100%",
      width:"100%",
      justifyContent:"center",
      alignItems:"center"
    },
  });

export default Geo;