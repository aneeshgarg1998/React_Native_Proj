import React, { Coponent, Component } from 'react';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';
import { View, Text, FlatList, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import { baseUrl } from '../shared/baseURL';
import Swipeout from 'react-native-swipeout';
import { deleteFavorite } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        favorites: state.favorites
    };
};

const mapDispatchToProps = dispatch => ({
    deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
});

class Favorites extends Component {
    
    render(){

        const { navigate } = this.props.navigation;

        const renderMenuItem = ({item, index}) => {

            const rightButton = [
                {
                    text: 'Delete',
                    type: 'delete',
                    onPress: () => {
                        Alert.alert('Delete Favorite?', 
                                    'Are you sure you want to delete the favorite dish ' + item.name + '?', 
                                    [
                                        {
                                            text: 'Cancel',
                                            onPress: () => console.log(item.name + 'Not Deleted'),
                                            style: 'cancel'
                                        },
                                        {
                                            text: 'ok',
                                            onPress: () => this.props.deleteFavorite(item.id)
                                        }
                                    ], { cancelable: false });    
                    }
                }
            ];

            return(
                <Swipeout right = {rightButton} autoClose = {true}>
                    <Animatable.View animation="fadeInRightBig" duration={2000}>
                        <ListItem 
                            key = {index}
                            title = {item.name}
                            subtitle = {item.description}
                            hideChevron = {true}
                            onPress = {() => this.props.navigation.navigate('Dishdetail', { dishId: item.id })}
                            leftAvatar = {{source: {uri: baseUrl + item.image}}}
                        />
                    </Animatable.View>
                </Swipeout>
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

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);