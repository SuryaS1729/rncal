import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/utils/Colors'
import Button from './Button'
import Animated, { 
  withSpring,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'

const Calc = () => {
    // Add this state to track the interval
    const [deleteInterval, setDeleteInterval] = useState<NodeJS.Timer | null>(null);
    const [firstValue, setFirstValue]=useState('')
    const [displayValue, setDisplayValue]=useState('0')
    const [operator,setOperator]=useState('')

    // Add these for animations
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }]
        };
    });

    const animateNumber = () => {
        scale.value = withSpring(1.1, { 
            damping: 4,
            stiffness: 80,
        }, () => {
            scale.value = withSpring(1);
        });
    };

    // Modify your state-changing functions to trigger animation
    const handleNumberInput = (num: string) => {
        if(displayValue=="0"){
            setDisplayValue(num)
        }else{
            setDisplayValue(displayValue+num)
        }
        animateNumber();
    }

    const handleCalculation = () => {
        const num1 = parseFloat(firstValue)
        const num2 = parseFloat(displayValue)
        
        let result = '0';
        if(operator === '+') result = (num1+num2).toString();
        else if(operator === '-') result = (num1-num2).toString();
        else if(operator === 'x') result = (num1*num2).toString();
        else if(operator === '/') result = (num1/num2).toString();
        else if(operator === '%') result = (num1%num2).toString();
        
        setDisplayValue(result);
        setOperator('');
        setFirstValue('');
        animateNumber();
    }

    const handleOperatorInput = (op:string)=>{
        setFirstValue(displayValue)
        setOperator(op)
        setDisplayValue('0')
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
        animateNumber(); // Add animation trigger
    }

    const startDelete = () => {
        const interval = setInterval(() => {
            setDisplayValue(current => {
                const newValue = current.length > 1 ? current.slice(0, -1) : '0';
                animateNumber(); // Add animation trigger
                return newValue;
            });
        }, 100);
        setDeleteInterval(interval);
    };

    const stopDelete = () => {
        if (deleteInterval) {
            clearInterval(deleteInterval as NodeJS.Timeout);
            setDeleteInterval(null);
        }
    };

  const BASE_FONT_SIZE = 70;
  const getFontSize = (length: number) => {
    return Math.max(20, BASE_FONT_SIZE - (length * 5));
  };

  return (
    <View style={styles.container}> 
      <View style={styles.display}>
        <Animated.Text style={{fontSize: 30, fontWeight: '300'}}>
          {firstValue+operator}
        </Animated.Text>
        <Animated.Text 
          style={[
            {
              fontSize: getFontSize(displayValue.length), 
              fontWeight: '300'
            },
            animatedStyle
          ]}
        >
          {displayValue}
        </Animated.Text>
      </View>
      <View style={styles.keypad}>
        <Button title='C' type='top' onPress={handleClear}></Button>
        <Button 
            title='⌫' 
            type='top' 
            onPress={handleDelete}
            onLongPress={startDelete}
            onPressOut={stopDelete}
        ></Button>
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
    padding:22,
    paddingTop:50

 },
 

})
export default Calc
