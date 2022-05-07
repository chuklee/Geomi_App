import auth from '@react-native-firebase/auth';
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    TextInput,
    TouchableOpacity
} from 'react-native';


import MapView from 'react-native-maps';




class GeomiAppView extends React.Component{

    constructor(props){
        super(props);
        var user = auth().currentUser;
        
        if(user){
            this.state = {
                canRender:  true,
                currentUser: user,
                currentMail: user.email,
                showMenu: false,
            }
        }else{
            this.changeState("SignIn","viewState");
        }
    
        
    }

    render(){
        if(this.state.canRender && this.state.currentUser){
            return(
                <View style={styles.appView}>
                    <View style={styles.container}>
                        <MapView style={styles.map}
                            initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                            }}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.btnGeomi}
                        onPress={() => this.props.navigation.openDrawer()}>
                        <Image style={styles.headerImg}
                            source={require('../../images/Geomi.png')}>
                        </Image>
                    </TouchableOpacity>

                </View>
                
            );
        }else{
            return(
                <View>
                </View>
            );
        }
        
    }
}

const styles = StyleSheet.create({
    appView:{
        height:'100%',
    },
    container: {
        width:'100%',
        height:'100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height:'100%',
      },
      map: {
        height:'100%',
        width:'100%'
      },
    centeredView:{
        marginTop:60,
        justifyContent:"center",
        alignItems:"center",
        //justifyContent:"center"
    },
    subTittle:{
        fontSize:25,
        marginTop:25
    },  
    btnView:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-between",
        marginTop:50,
        height:200
    },
    btnForSignUp:{
        backgroundColor:"#00bfa7",
        width:200,
        height:50,
        justifyContent:"center"
    },
    btnForSignIn:{
        backgroundColor:"#009cc6",
        width:200,
        height:50,
        justifyContent:"center"
    },
    btnText:{
        color:"#ffffff",
        fontSize:25,
        textAlign:"center",
        margin:5,

    },
    btnToSignUp:{
        marginTop:20,
    },
    btnToSignUpText:{
        color:"#00bfa7",
    },
    btnToSignIn:{
        marginTop:60,
    },
    btnToSignInText:{
        color:"#009cc6",
    },
    btnLogOut:{
        backgroundColor:"#00bfa7",
        width:50,
        height:50,
        justifyContent:"center",
        borderLeftWidth:1.0,
        borderRightWidth:1.0,
        borderBottomWidth:1.0,
        borderTopWidth:1.0,
        borderRadius:40
    },
    btnGeomi:{
        position:'absolute',
        bottom:20,
        right:20,
        width:80,
        height:80,
        elevation:10,
        justifyContent:"center",
        alignItems:'center',
        borderRadius:40
    },
    header:{
        backgroundColor:"#009cc6",
        width:'100%',
        height:'14%',
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        paddingLeft:'2%',
        paddingRight:'2%',
        zIndex:3,
    },
    headerImg:{
        height:'100%',
        width:'100%',
    },
    sideMenu:{
        position:'absolute',
        backgroundColor:'#009cc6',
        top:0,
        left:0,
        width: '90%',
        height:'100%',
        elevation:1,
    }

  });

export default GeomiAppView;