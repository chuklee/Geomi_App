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


class SignUpForm extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            pseudo:null,
            password:null,
            email:null,
            activityStatus:[0,"#00bfa7"],
            errormsg:"L'email n'est pas correct",
            focusColor:{
                email:"#000000",
                pseudo:"#000000",
                password:"#000000"
            }
        }
        
    }

    onfocusChange(source){
        switch(source){
            case "email":
                this.setState({focusColor:{email:"#009cc6"}});
                break;
            case "password":
                this.setState({focusColor:{password:"#009cc6"}});
                break;
            case "pseudo":
                this.setState({focusColor:{pseudo:"#009cc6"}});
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
            case "pseudo":
                this.setState({focusColor:{pseudo:"#000000"}});
                break;
        }
    }

    checkEmailConstraint(email){
        var asArrobase = false;
        var callb = true, errType = "Carré";

        if(email === null || email == undefined){
            callb = false;
            errType ="Vous n'avez pas entré de mail.";
        }else{
            for(var i = 0;i < email.length ;i++){
                if(email[i] === "@"){
                    asArrobase = true;
                }
            }
        }

        if(!asArrobase){
            callb = false;
            errType ="No Arrobase";
        }

        return [callb,errType];
    }

    checkPseudoConstraint(pseudo){
        var asMinChar,asMaxChar = false;
        var callb = true, errType = "Carré";

        return [callb,errType];
    }

    checkPasswordConstraint(password){
        var asNumber,asLower,asUpper,asEnoughChar = false;
        var callb = true, errType = "Carré";
        
       


        return [callb,errType];
    }

    onChangeInput(source,text){
        switch(source){
            case "email":
                this.setState({[source]: text});
                break;
            case "pseudo":
                this.setState({[source]: text});
                break;
            case "password":
                this.setState({[source]: text});
                break;
        }
    }

    performSignUp(){
        this.setState({activityStatus:[35,"#00bfa7"]});

        const pseudo = this.state.pseudo
        const mail = this.state.email
        const password = this.state.password

        const [isMailCorrect,mailErrorMessage] = this.checkEmailConstraint(mail);
        const [isPasswordCorrect,passwordErrorMessage] = this.checkPasswordConstraint(password);
        const [isPseudoCorrect,pseudoErrorMessage] = this.checkPseudoConstraint(pseudo);

        if(isMailCorrect && isPasswordCorrect && isPseudoCorrect){
            console.log(mail + " "+ password);
            auth().createUserWithEmailAndPassword(mail,password)
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

                    if(errMessage ="auth/email-already-in-use"){

                    }
                    console.log("Error with code: " + errCode + ". " + errMessage);
                })
        }else{
            this.setState({activityStatus:[0,"#00bfa7"]});
            Alert.alert(mailErrorMessage + passwordErrorMessage + pseudoErrorMessage);
            console.log(mailErrorMessage + passwordErrorMessage + pseudoErrorMessage);
        }

        
    }

    render(){
        return(
                
                <View style={styles.signView}>
                    
                    <Text style={styles.errormsg}>
                        {this.state.errormsg}
                    </Text>
                    <TextInput
                        value={this.state.email}
                        placeholder="Entrez une adresse email"
                        onChangeText={(text) => this.onChangeInput('email',text)}
                        onBlur={() => this.onBlurChange("email")}
                        onFocus={() => this.onfocusChange("email")}
                        style={{...styles.inputText,borderColor:this.state.focusColor.email}}>
                    </TextInput>
                    <TextInput
                        value={this.state.pseudo}
                        placeholder="Entrez un pseusdo"
                        onChangeText={(text) => this.onChangeInput('pseudo',text)}
                        onBlur={() => this.onBlurChange("pseudo")}
                        onFocus={() => this.onfocusChange("pseudo")}
                        style={{...styles.inputText,borderColor:this.state.focusColor.pseudo}}>
                    </TextInput>
                    <TextInput
                        value={this.state.password}
                        textContentType="newPassword"
                        placeholder="Entrez un mot de passe"
                        onChangeText={(text) => this.onChangeInput('password',text)}
                        onBlur={() => this.onBlurChange("password")}
                        onFocus={() => this.onfocusChange("password")}
                        style={{...styles.inputText,borderColor:this.state.focusColor.password}}>
                    </TextInput>
                    <TouchableOpacity
                        style={styles.btnForSignUp}
                        onPress={() => this.performSignUp()}>
                            <Text style={styles.btnText}>
                                S'inscrire
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
  
export default SignUpForm;