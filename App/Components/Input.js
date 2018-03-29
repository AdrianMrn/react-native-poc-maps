import React from 'react';
import { View, Text, TextInput } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
    return (
        <View style={styles.containerStyle}>
            { !!label &&
                <Text style={styles.labelStyle}>{label}</Text>}
            <TextInput
                secureTextEntry={secureTextEntry}
                autoCorrect={false}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                style={styles.inputStyle}
            />
        </View>
    );
};

const styles = {
    containerStyle: {
        flex: 1,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
    },
    labelStyle: {
        fontSize: 18,
        flex: 1,
    },
    inputStyle: {
        color: '#000',
        paddingHorizontal: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2,
    },
};

export default Input;
