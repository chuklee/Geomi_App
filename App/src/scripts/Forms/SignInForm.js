import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    TextInput,
    TouchableOpacity,
    Alert, 
    ActivityIndicator
  } from 'react-native';

import auth, { firebase } from '@react-native-firebase/auth';


class SignInForm extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            password:null,
            email:null,
            activityStatus:[0,"#00bfa7"],
            errormsg:"",
            focusColor:{
                email:"#000000",
                password:"#000000"
            }
        }
        
        var cc = firebase.auth();
    }

    onfocusChange(source){
        switch(source){
            case "email":
                this.setState({focusColor:{email:"#009cc6"}});
                break;
            case "password":
                this.setState({focusColor:{password:"#009cc6"}});
                break;
        }
    }
    onBlurChange(source){
        switch(source){
            case "email":
                this.setState({focusColor:{email:"#000000"}});
                break;
            case "password":
                this.setState({focusColor:{password:"#000000"}});
                break;
        }
    }

    onChangeInput(source,text){
        switch(source){
            case "email":
                this.setState({[source]: text});
                break;
            case "password":
                this.setState({[source]: text});
                break;
        }
    }

    performSignIn(){
        this.setState({activityStatus:[35,"#00bfa7"]});
        this.setState({errormsg:null});

        const pseudo = this.state.pseudo
        const mail = this.state.email
        const password = this.state.password

        console.log(mail + " "+ password);
        auth().signInWithEmailAndPassword(mail,password)
            .then(userCred => {
                this.setState({activityStatus:[0,"#00bfa7"]});
                // L'utilisateur est maintenant co donc faire qq chose
                var user = userCred.user;

                if(user){
                    this.props.changeAppState("Connected","viewState");
                }else{
                    console.log("Probleme de connexion");
                    console.log("User ID "+ user.uid + "Email: "+ user.email);
                }
            })
            .catch(err => {
                this.setState({activityStatus:[0,"#00bfa7"]});
                var errCode = err.code;
                var errMessage = err.message;
                
                switch(errCode){
                    case "auth/invalid-email":
                        this.setState({errormsg:"L'adresse email n'est pas valide"});
                        break;
                    case "auth/user-not-found":
                        this.setState({errormsg:"Cette adresse email n'existe pas"});
                        break;
                    case "auth/wrong-password":
                        this.setState({errormsg:"Mot de passe incorect"});
                        break;
                    default:
                        console.log("Error with code: " + errCode + ". " + errMessage);
                        break;
                }
                
            })


        
    }

    render(){
        return(
                
                <View style={styles.signView}>
                    
                    <Text style={styles.errormsg}>
                        {this.state.errormsg}
                    </Text>
                    <TextInput
                        value={this.state.email}
                        textContentType="emailAddress"
                        placeholder="Entrez une adresse email"
                        onChangeText={(text) => this.onChangeInput('email',text)}
                        onBlur={() => this.onBlurChange("email")}
                        onFocus={() => this.onfocusChange("email")}
                        style={{...styles.inputText,borderColor:this.state.focusColor.email}}>
                    </TextInput>
                    <TextInput
                        value={this.state.password}
                        textContentType="password"
                        placeholder="Entrez un mot de passe"
                        onChangeText={(text) => this.onChangeInput('password',text)}
                        onBlur={() => this.onBlurChange("password")}
                        onFocus={() => this.onfocusChange("password")}
                        style={{...styles.inputText,borderColor:this.state.focusColor.password}}>
                    </TextInput>
                    <TouchableOpacity
                        style={styles.btnForSignIn}
                        onPress={() => this.performSignIn()}>
                            <Text style={styles.btnText}>
                                Se connecter
                            </Text>
                    </TouchableOpacity>

                    <ActivityIndicator size={this.state.activityStatus[0]} color={this.state.activityStatus[1]}/>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    subTittle:{
      fontSize:25,
      marginTop:25
    },  
    signView:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-between",
        alignItems:"center",
        marginTop:15,
        height:200
    },
    btnForSignUp:{
        backgroundColor:"#00bfa7",
        width:200,
        height:50,
        justifyContent:"center",
        marginTop: 10
    },
    btnForSignIn:{
        backgroundColor:"#009cc6",
        width:200,
        height:50,
        justifyContent:"center",
        marginTop: 10
    },
    btnText:{
        color:"#ffffff",
        fontSize:25,
        textAlign:"center",
        margin:5,

    },
    errormsg:{
        marginBottom:20,
        color:"#ff0000",
        fontSize:20
    },
    inputText:{
        borderBottomWidth:1.0,
        width:250
    }
  });

export default SignInForm;