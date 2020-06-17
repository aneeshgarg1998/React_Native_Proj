import React, { Coponent, Component } from 'react';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';
import { View, Text, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { baseUrl } from '../shared/baseURL';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        favorites: state.favorites
    };
};

class Favorites extends Component {
    
    render(){

        const { navigate } = this.props.navigation;

        const renderMenuItem = ({item, index}) => {
            return(
                <ListItem 
                    key = {index}
                    title = {item.name}
                    subtitle = {item.description}
                    hideChevron = {true}
                    onPress = {() => this.props.navigation.navigate('Dishdetail', { dishId: item.id })}
                    leftAvatar = {{source: {uri: baseUrl + item.image}}}
                />
            );
        };

        if(this.props.dishes.isLoading){
            return(
                <Loading />
            );
        }
        else if(this.props.dishes.errMess){
            return(
                <View>
                    <Text>{this.props.dishes.errMess}</Text>
                </View>
            );
        }
        else{
            return(
                <FlatList 
                    data = {this.props.dishes.dishes.filter(
                            dish => this.props.favorites.some(el => el === dish.id)
                    )}
                    renderItem = {renderMenuItem}
                    keyExtractor = {item => item.id.toString()}/>
            );
        }
    }
};

export default connect(mapStateToProps)(Favorites);