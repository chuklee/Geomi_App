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

export class Separator extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        var marginSize = (100 - this.props.size)/2;
        var longeur = this.props.size.toString() + '%';
        marginSize = marginSize.toString()+'%';

        //console.log(longeur+'/'+marginSize);
        const styles = StyleSheet.create({
            separator:{
                width:longeur,
                height:this.props.height,
                marginLeft:marginSize,
                backgroundColor:this.props.color,
                marginTop:'5%'


            },
        });

        return(
            <View style={styles.separator}></View>
        );
    }
}

