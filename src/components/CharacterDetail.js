import React from 'react';
import { View, ActivityIndicator, Text, FlatList, StyleSheet, Image } from 'react-native';
import Http from '../store/http';

class CharacterDetail extends React.Component {

    state = {
        loading: false,
        character: null,
        episodes: [],
    }

    componentDidMount = async () => {
        this.setState({ loading: true });
        const res = await Http.instance.get(this.props.route.params.character_url);
        this.setState({ character: res });
        const { character } = this.state
        if (character) {
            let episodes_info = []
            //console.log(character.episode)
            for (let i in character.episode) {
                //console.log(character.episode[i]);
                episodes_info.push(await Http.instance.get(character.episode[i]));
            }

            this.setState({ episodes: episodes_info })
        }
        this.setState({ loading: false });
    }

    render() {
        const { character, loading, episodes } = this.state;
        return (
            <View>
                {character ?
                    <View style={styles.container}>
                        <Image source={{ uri: character.image }}
                            style={styles.image}></Image>
                        <View style={styles.description}>
                            <View style={styles.textContainer}>
                                <Text style={styles.text}>Nome: </Text><Text style={styles.text2}>{character.name}</Text>
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.text}>Gênero: </Text><Text style={styles.text2}>{character.gender}</Text>
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.text}>Especie: </Text><Text style={styles.text2}>{character.species}</Text>
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.text}>Local de Origem: </Text><Text style={styles.text2}>{character.origin.name}</Text>
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.text}>Localização Atual: </Text><Text style={styles.text2}>{character.location.name}</Text>
                            </View>
                        </View>
                        <Text style={styles.titleList}> Lista de Episódios</Text>
                    </View>
                    : null
                }
                {loading ?
                        <ActivityIndicator
                            color='#000'
                            size='large'
                            style={styles.loader}
                        >
                        </ActivityIndicator>
                        :
                        <FlatList
                            style={styles.episode_list}
                            data={episodes}
                            renderItem={
                                ({ item }) => <Text style={styles.text}>{item.name}</Text>
                            }>
                        </FlatList>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '50%',
        backgroundColor: '#FEFEFE',
        alignItems: 'center'
    },
    description: {
        padding: 20,
        marginTop: 5,
        backgroundColor: '#FEFEFE',
        width: '100%',
    },
    textContainer: {
        flexDirection: 'row'
    },
    episode_list: {
        padding: 10,
        marginTop: 0,
        backgroundColor: '#FEFEFE',
        width: '100%'
    },
    loader: {
        marginTop: 0,
        padding: 0
    },
    titleList: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    image: {
        width: '100%',
        height: '50%',
        borderRadius: 5
    },
    text: {
        fontSize: 22,
        color: '#000',
        fontWeight: 'bold'
    },
    text2: {
        fontSize: 17,
        color: '#000',
        paddingTop: 6
    }
});
export default CharacterDetail;