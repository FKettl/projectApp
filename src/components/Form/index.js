import React, {useState} from "react";
import {Keyboard, Pressable, Share, Vibration, View, Text, TextInput, TouchableOpacity} from "react-native"
import ResultImc from "./ResultImc";
import styles from "./style";


export default function Form() {

const [height, setHeight] = useState(null)
const [weight, setWeight] = useState(null)
const [messageImc, setMessageImc] = useState("Preencha o peso e a altura")
const [imc, setImc] = useState(null)
const [textButton, setTextButton] = useState("Calcular")
const [errorMessage, setErrorMessage] = useState(null)
 

function imcCalculator(){
    let heightFormat = height.replace(",",".")
    return setImc((weight/(heightFormat*heightFormat)).toFixed(2))
}

function verificationImc(){
    if(imc == null){
        Vibration.vibrate();
        setErrorMessage("campo obrigatório*")
    }
}


function validationImc(){
    if(weight != null && height != null){
        imcCalculator()
        setHeight(null)
        setWeight(null)
        setMessageImc("Seu imc é igual:")
        setTextButton("Calcular Novamente")
        setErrorMessage(null) 
        return
    }
    setImc(null)
    verificationImc()
    setTextButton("Calcular")
    setMessageImc("Preencha o peso e a altura")
      

}

    return(
        <Pressable onPress={Keyboard.dismiss} style={styles.formContext}>
             <View style={styles.form}> 
                <Text style={styles.formLabel}>Altura</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput
                style={styles.input}
                onChangeText={setHeight}
                value={height}
                placeholder= "Ex. 1.75"
                keyboardType="numeric"
                ></TextInput>
                <Text style={styles.formLabel}>Peso</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput 
                style={styles.input}
                onChangeText={setWeight}
                value={weight}
                placeholder= "Ex. 75.5"
                keyboardType="numeric"
                ></TextInput>
                <TouchableOpacity
                style={styles.buttonCalculator}
                onPress= {() => {
                    validationImc()
                }}>
                <Text style={styles.textButtonCalculator}>{textButton}</Text>
                </TouchableOpacity>
             </View>
             <ResultImc messageResultImc = {messageImc} resultImc={imc}/>
        </Pressable>
    );

}