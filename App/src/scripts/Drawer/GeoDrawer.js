import React from 'react';

import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';

import {
    StyleSheet,
    View,
    Image,
    Button,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { Avatar, Drawer, Paragraph,Title, Text } from 'react-native-paper';

import GeomiAppView from '../Views/GeomiAppView';

import auth from '@react-native-firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faCog, faUserFriends, faUsers, faDiceSix, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Separator } from '../Tools/DisplayTools';

class GeoDrawer extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            pseudo: 'MrSsasuke',
            urlImage:'../../images/hadim.png',
            userLevel: 10,
            numberOfFriends: 27,
        }
    }

    logOut(){
        auth().signOut().then(() => {
            this.props.changeState("SignUp","viewState");
        })
        .catch(err => {
            console.log(err);
        })
    }

    render(){
        const SecondDrawer = createDrawerNavigator();
        return(
            <View style={{flex:1}}>
                <View style={styles.topHeaderSettings}>
                    <TouchableOpacity>
                        <FontAwesomeIcon
                            icon={faUser}
                            size={25}
                        />
                    </TouchableOpacity>
                    
                    <TouchableOpacity>
                        <FontAwesomeIcon
                            icon={faCog}
                            size={25}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.userInfoWrapper}>
                    <Avatar.Image
                        source={require('../../images/hadim.png')}
                        size={160}
                    />
                    <Title>{'@'+this.state.pseudo}</Title>
                    <View style={styles.userInfoRow}>
                        <Text>{'Level: ' + this.state.userLevel}</Text>
                        <Text>{'Amis: ' + this.state.numberOfFriends}</Text>
                    </View>
                </View>
                <Separator color='#009cc6' size={90} height={3.0}/>
                <DrawerContentScrollView>
                        <Drawer.Section>
                            <DrawerItemList {...this.props}/>
                            <DrawerItem
                                label="Groupes"
                                icon={() => (
                                    <FontAwesomeIcon
                                    icon={faUsers}
                                    size={25}
                                    />
                                )}
                            />
                            <DrawerItem
                                label="Jeux"
                                icon={() => (
                                    <FontAwesomeIcon
                                    icon={faDiceSix}
                                    size={25}
                                    />
                                )}
                            />
                        </Drawer.Section>
                </DrawerContentScrollView>
                <Drawer.Section>
                    <DrawerItem
                        label="Déconnexion"
                        icon={() => (
                            <FontAwesomeIcon
                            icon={faSignOutAlt}
                            size={20}
                            />
                        )}
                        onPress={() => this.logOut()
                        }>
                    </DrawerItem>
                </Drawer.Section>
            </View>
        );
    }
}

export default GeoDrawer;

const styles = StyleSheet.create({
    userInfoWrapper:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        paddingLeft:'5%',
        paddingRight:'5%',
        marginTop:-20,
    },
    topHeaderSettings:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingLeft:'5%',
        paddingRight:'5%',
        marginTop:'5%'

    },
    userInfoRow:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingLeft:'20%',
        paddingRight:'20%',
        width:'100%',
    },
});