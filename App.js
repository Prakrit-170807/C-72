import * as React from 'react';
import { Text, View, StyleSheet, Button, Image } from 'react-native';
import Constants from 'expo-constants';
import { createAppContainer, createSwitchNavigator, } from 'react-navigation'; 
import {createBottomTabNavigator} from 'react-navigation-tabs'

// You can import from local files
import Look from './components/search';
import Trans from './components/transaction';

// or any pure javascript modules available in npm
//import { Card } from 'react-native-paper';
export default class App extends React.Component {
  render() {
    return (
      <View style={{flex:1}}>
        <Appcontainer />
      </View>
    )
  }
}

var switchContainer = createBottomTabNavigator({
  Transaction: Trans,
  Search : Look
},
{
  defaultNavigationOptions : ({navigation})=>({
    tabBarIcon: ()=>{
      const routeName = navigation.state.routeName
      if(routeName=="Transaction"){
        return(
          <Image source={require("./assets/Transaction.png")} style={{width:30, height: 20, }} resizeMode="contain">
          </Image>
        )
      } else if(routeName=="Search"){
        return(
          <Image source={require("./assets/Transaction.png")} style={{width:30, height: 20}} resizeMode="contain">
          </Image>
        )
      }
    }
  })
}
)

const Appcontainer = createAppContainer(switchContainer)