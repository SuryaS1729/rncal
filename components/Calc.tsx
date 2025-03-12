import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/utils/Colors'
import Button from './Button'

const Calc = () => {
    const [firstValue, setFirstValue]=useState('')
    const [displayValue, setDisplayValue]=useState('0')
    const [operator,setOperator]=useState('')

    const handleNumberInput = (num:string)=>{
        if(displayValue=="0"){
            setDisplayValue(num)
        }else{
            setDisplayValue(displayValue+num)}

    }

    const handleOperatorInput = (op:string)=>{
        setFirstValue(displayValue)
        setOperator(op)
        setDisplayValue('0')
    }

    const handleCalculation = ()=>{
        const num1 = parseFloat(firstValue)
        const num2 = parseFloat(displayValue)

        if(operator === '+'){
            setDisplayValue((num1+num2).toString())
        }else if(operator === '-'){
            setDisplayValue((num1-num2).toString())
        }else if(operator === 'x'){
            setDisplayValue((num1*num2).toString())
        }else if(operator === '/'){
            setDisplayValue((num1/num2).toString())
        }   else if(operator === '%'){
            setDisplayValue((num1%num2).toString())
        }   

        setOperator('')
        setFirstValue('')
    }

    const handleClear = ()=>{
        setDisplayValue('0')
        setFirstValue('')
        setOperator('')
    }

    const handleDelete = ()=>{
        if(displayValue.length>1){
            setDisplayValue(displayValue.slice(0,-1))
        }else{
            setDisplayValue('0')
        }
    }


  return (
    <View style={styles.container}> 
      <View style = {styles.display}>
        <Text style={{fontSize:30,fontWeight:'300'}}>{firstValue+operator}</Text>
        <Text style={{fontSize:displayValue.length>=13?20:displayValue.length>=11?40:displayValue.length>=10?49:displayValue.length>8?50:displayValue.length>6?60:70,fontWeight:'300'}}>{displayValue}</Text>

      </View>
      <View style = {styles.keypad}>
        <Button title='C' type='top' onPress={handleClear}></Button>
        <Button title='⌫' type='top' onPress={handleDelete}></Button>
        <Button title='%' type='top' onPress={()=>handleOperatorInput('%')}></Button>
        <Button title='/' type='right' onPress={()=>handleOperatorInput('/')}></Button>
        <Button title='7' type='number' onPress={() => handleNumberInput('7')}></Button>
        <Button title='8' type='number' onPress={() => handleNumberInput('8')}></Button>
        <Button title='9' type='number' onPress={() => handleNumberInput('9')}></Button>
        <Button title='x' type='right' onPress={()=>handleOperatorInput('x')}></Button>
        <Button title='6' type='number' onPress={() => handleNumberInput('6')}></Button>
        <Button title='5' type='number' onPress={() => handleNumberInput('5')}></Button>
        <Button title='4' type='number' onPress={() => handleNumberInput('4')}></Button>
        <Button title='-' type='right' onPress={()=>handleOperatorInput('-')}></Button>
        <Button title='1' type='number' onPress={() => handleNumberInput('1')}></Button>
        <Button title='2' type='number' onPress={() => handleNumberInput('2')}></Button>
        <Button title='3' type='number' onPress={() => handleNumberInput('3')}></Button>
        <Button title='+' type='right' onPress={()=>handleOperatorInput('+')}></Button>
        <Button title='0' type='number' onPress={() => handleNumberInput('0')}></Button>
        <Button title='00' type='number' onPress={() => handleNumberInput('00')}></Button>
        <Button title='.' type='number' onPress={() => handleNumberInput('.')}></Button>
        <Button title='=' type='right' onPress={handleCalculation}></Button>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
 container:{
    flex:1,

 },
 display:{
    flex:1,
    backgroundColor:Colors.gray,
    alignItems:"flex-end",
    justifyContent: 'flex-end',
    paddingHorizontal:40,
    paddingVertical:20,
   
    
 },
 keypad:{
    flex:2,
    backgroundColor:Colors.light,
    flexDirection:"row",
    flexWrap:"wrap",
    justifyContent:"center",
    gap:20,
    padding:10

 },
 

})
export default Calc
