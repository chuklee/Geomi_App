import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    TextInput,
    TouchableOpacity
  } from 'react-native';

import React from 'react';


class FriendListView extends React.Component{
    render(){
        return(
            <View style={styles.centeredView}>
                
                <TouchableOpacity
                        style={styles.btnGeomi}
                        onPress={() => this.props.navigation.openDrawer()}>
                        <Image style={styles.headerImg}
                            source={require('../../images/Geomi.png')}>
                        </Image>
                    </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    centeredView:{
        width:'100%',
        height:'100%',
    },
    headerImg:{
        height:'100%',
        width:'100%',
    },
    btnGeomi:{
        position:'absolute',
        bottom:20,
        right:20,
        width:80,
        height:80,

        justifyContent:"center",
        alignItems:'center',
        borderRadius:40
    },

  });

export default FriendListView;