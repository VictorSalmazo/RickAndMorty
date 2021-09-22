import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CharacterItem = ({ item }) => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Image source={{ uri: item.image }}
                    style={styles.tinyLogo}></Image>
            </View>
            <View style={styles.column}>
                <Text style={styles.nameText}>{item.name}</Text>
                <Text style={styles.text}>{item.species}</Text>
            </View>
        </View>


    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 3,
        borderBottomWidth: 1,
        backgroundColor: '#b8b8b8',
    },
    tinyLogo: {
        width: 120,
        height: 120,
        borderRadius: 12
    },
    row: {
        flexDirection: 'row',
    },
    column : {
        flexDirection: 'column'
    },
    nameText: {
        color: '#fff',
        fontSize: 25,
        marginLeft: 22,
        fontWeight: 'bold',
    },
    text: {
        color: '#fff',
        fontSize: 18,
        marginLeft: 22
    },
    priceText: {
        fontSize: 14,
        color: '#035'
    },
});

export default CharacterItem;