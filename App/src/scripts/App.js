/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Node from 'react';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';

import { createDrawerNavigator } from '@react-navigation/drawer';

import GeoDrawer from './Drawer/GeoDrawer';

import {
  StyleSheet,
  Text,
  View,
  Image,
  Button
} from 'react-native';


import SignInView from './Views/SignInView';
import SignUpView from './Views/SignUpView';
import DefaultView from './Views/DefaultView';
import GeomiAppView from './Views/GeomiAppView';
import { Provider as PaperProvider } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import FriendListView from './Views/FriendListView';
const Drawer = createDrawerNavigator();

class App extends React.Component {
  
  state = {
    viewState:"Default",
    onChange : (newStatus,nameStatus) => {this.setState({[nameStatus]: newStatus});}
  }
  


  render(){
    var view = null;
    switch(this.state.viewState){
      case "Default":
        view = <DefaultView changeState={this.state.onChange}/>;
        break;
      case "SignUp":
        view = <SignUpView changeState={this.state.onChange}/>;
        break;
      case "SignIn":
        view = <SignInView changeState={this.state.onChange}/>;
        break;
      case "Connected":
        view =(
          <Drawer.Navigator drawerContent={props => <GeoDrawer {...props} changeState={this.state.onChange}/>}>
            <Drawer.Screen name='GeoMap' options={{
              drawerIcon: config => (
                <Image style={{height:35,width:35,}}
                source={require('../images/Geomi.png')}>
                </Image>
               )
              }}>
              {props => <GeomiAppView {...props} changeState={this.state.onChange}/>}
            </Drawer.Screen>
            <Drawer.Screen name='Amis' options={{
              drawerIcon: config => (
                <FontAwesomeIcon
                icon={faUserFriends}
                size={25}
                />
               )
              }}>
              {props => <FriendListView {...props} changeState={this.state.onChange}/>}
            </Drawer.Screen> 
          </Drawer.Navigator>
          
        );
        break;
      default:
        view = <DefaultView changeState={this.state.onChange}/>;
        break;
    }

    return (
      <PaperProvider>
        <NavigationContainer>
          {view}
        </NavigationContainer>
      </PaperProvider>

    );
  }
  
  
}
export default App;
