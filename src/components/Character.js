import React from 'react';
import { View, ActivityIndicator, Pressable, Text, StyleSheet, FlatList } from 'react-native';
import Http from '../store/http';
import CharacterItem from './CharacterItem';
import FooterList from './FooterList';

class Character extends React.Component {
    state = {
        characters: [],
        loading: false,
        next: null,
        prev: null,
    }

    componentDidMount = async () => {
        this.setState({ loading: true });
        const res = await Http.instance.get('https://rickandmortyapi.com/api/character/');
        this.setState({ characters: res.results, loading: false });
        if (res.info.next) {
            this.setState({ next: res.info.next });
        }
        if (res.info.prev) {
            this.setState({ prev: res.info.prev });
        }
    }


    handleNextPress = async () => {
        const { next } = this.state;
        this.setState({ loading: true });
        const res = await Http.instance.get(next);
        console.log('Go to Next Page ');
        this.setState({ characters: res.results, loading: false });
        if (res.info.next) {
            this.setState({ next: res.info.next });
        }
        else {
            this.setState({ next: null })
        }
        if (res.info.prev) {
            this.setState({ prev: res.info.prev });
        } else {
            this.setState({ prev: null })
        }

        //this.props.navigation.navigate('CoinDetail');
    }
    handlePrevPress = async () => {
        const { prev } = this.state;
        this.setState({ loading: true });
        const res = await Http.instance.get(prev);
        console.log('Go to Next Page ');
        this.setState({ characters: res.results, loading: false });

        if (res.info.next) {
            this.setState({ next: res.info.next });
        }
        else {
            this.setState({ next: null })
        }
        if (res.info.prev) {
            this.setState({ prev: res.info.prev });
        } else {
            this.setState({ prev: null })
        }

    }

    handleCharacterPress = (character_url) => {
        console.log(character_url)
        this.props.navigation.navigate('CharacterDetail', { character_url });
    }

    render() {

        const { characters, loading, next, prev } = this.state;
        return (
            <View style={styles.container}>
                {loading ?
                    <ActivityIndicator
                        color='#000'
                        size='large'
                        style={styles.loader}
                    >
                    </ActivityIndicator>
                    : null
                }
                <FlatList
                contentContainerStyle={{marginHorizontal: 5}}
                    data={characters}
                    renderItem={
                        ({ item }) => {
                            return (
                                <View>
                                    <Pressable onPress={() => this.handleCharacterPress('https://rickandmortyapi.com/api/character/' + item.id)}>
                                        <CharacterItem item={item}></CharacterItem>
                                    </Pressable>
                                </View>
                            );
                        }
                    }
                    onEndReached={this.handleNextPress}
                    onEndReachedThreshold={0.1}>
                </FlatList>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FEFEFE',

    },
    groupBtn: {
        flexDirection: 'row',
        backgroundColor: '#b8b8b8'
    },
    btn: {
        padding: 0,
        backgroundColor: '#2da4ed',
        height: 30,
        width: 50,
        borderRadius: 3
    },
    btnText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 30,
    },
    loader: {
        marginTop: 10,
    },
});

export default Character;