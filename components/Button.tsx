import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '@/utils/Colors'

const Button = ({title,type, onPress}:{title:string, type:"top"|"number"|"right",onPress:()=>void}) => {
  return (

      <TouchableOpacity style={[styles.button,{
        backgroundColor:type =="top"?Colors.btnDark:type=="number"?Colors.btnLight:Colors.btnRight,
      }]} onPress={onPress}>
         <Text style={{fontSize:34, color:type == "number"?Colors.black:Colors.white}}>{title}</Text>
      </TouchableOpacity>
 
  )
}
const styles = StyleSheet.create({
    button:{
        height:70,
        width:70,
        borderRadius:10,
        padding:10,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:Colors.btnDark
    }
})
export default Button