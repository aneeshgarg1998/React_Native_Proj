import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, StyleSheet, Modal, Button } from 'react-native';
import { Card, Icon, Rating, Input} from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseURL';
import { postFavorite } from '../redux/ActionCreators';
import { postComment } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
})

function RenderComments(props) {
    const comments = props.comments;
    const renderCommentItem = ({item, index}) => {
        return(
            <View key = {index} style = {{margin: 10}}>
                <Text style = {{fontSize: 14}}>{item.comment}</Text>
                <View flex = {2} flexDirection = 'row' margin = {4}>
                    <Rating imageSize = {12} readonly startingValue = {item.rating} flex = {1}/>
                </View>
                <Text style = {{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date}</Text>
            </View>
        );
    }
    return(
        <Card title = "Comments">
            <FlatList 
                data = {comments}
                renderItem = {renderCommentItem}
                keyExtractor = {item => item.id.toString()}
            />
        </Card>
    );
}

function RenderDish(props) {

    const dish = props.dish;
    
        if (dish != null) {
            return(
                <Card
                featuredTitle={dish.name}
                image={{uri: baseUrl + dish.image}}>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                    <View flexDirection = 'row' justifyContent = 'center'>
                        <Icon
                            raised
                            reverse
                            name = { props.favorite ? 'heart' : 'heart-o'}
                            type = 'font-awesome'
                            color = '#f50'
                            onPress = {() => props.favorite ? 
                                    console.log('Already favorite') : props.onPress()} 
                        />
                        <Icon 
                            raised
                            reverse
                            name = "pencil"
                            type = 'font-awesome'
                            color = '#512DA8'
                            onPress = {() => props.toggleModal()} 
                        />
                    </View>
                </Card>
            );
        }
        else {
            return(<View></View>);
        }
}

class Dishdetail extends Component {

    constructor(props){
        super(props);
        this.state = {
            author: '',
            comment: '',
            rating: 0,
            showModal: false
        }
    }

    toggleModal(){
        this.setState({showModal: !this.state.showModal});
    }

    handleComment(dishId, rating, author, comment){
        this.props.postComment(dishId, rating, author, comment);
    }

    resetForm(){
        this.setState({
            author: '',
            comment: '',
            rating: 0,
            showModal: false
        });
    };

    makeFavorite(dishId) {
        this.props.postFavorite(dishId);
    };

    render() {
        const dishId = this.props.route.params.dishId;
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]} 
                    favorite={this.props.favorites.some(d => d === dishId)}
                    onPress = {() => this.makeFavorite(dishId)}
                    toggleModal = {() => this.toggleModal()}/>
                <RenderComments comments={this.props.comments.comments.filter((c) => c.dishId === dishId)} />
                <Modal 
                    animationType = {"slide"}
                    transparent = {false}
                    visible = {this.state.showModal}
                    onDismiss = {() => this.toggleModal()}
                    onRequestClose = {() => this.toggleModal()}
                > 
                    <View style = {styles.modal}>
                        <Rating 
                            ratingCount = {5}
                            showRating
                            startingValue = {0}
                            onFinishRating = {(rating) => this.setState({rating: rating})}
                        />
                        <Input placeholder = " Author"
                            leftIcon = {
                                <Icon name = "user-o" type = "font-awesome" size = {24} />
                            }
                            onChangeText={value => this.setState({ author: value })}/>
                        <Input placeholder = " Comment"
                            leftIcon = {
                                <Icon name = "comment-o" type = "font-awesome" size = {24} />
                            }
                            onChangeText={value => this.setState({ comment: value })}/>
                        <View style = {styles.formRow}>
                            <Button onPress = {() => {this.handleComment(dishId, this.state.rating, this.state.author, this.state.comment); this.toggleModal(); this.resetForm();}} 
                                color = "#512DA8"
                                title = "Submit"
                            />
                        </View>
                        <View style = {styles.formRow}>
                            <Button onPress = {() => {this.toggleModal(); this.resetForm();}} 
                                color = "#808080"
                                title = "Cancel"
                            />
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 30
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    },
    ratingRight: {
        flex: 6,
        flexDirection: 'row'
    },
    Rating: {
        flex: 1
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);