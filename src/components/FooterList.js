import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';


const FooterList = ({ load }) => {
    if(!load) return null;
     
    return <View style={styles.loading }>
        <ActivityIndicator size={25} color="#121212" />
    </View>;
}

const styles = StyleSheet.create({
    loading: {
        padding: 10
    }
})

export default FooterList;