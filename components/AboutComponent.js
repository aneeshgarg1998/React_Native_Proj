import React, {Component} from 'react';
import { Text, FlatList, ScrollView } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { LEADERS } from '../shared/leaders';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseURL';

const mapStateToProps = state => {
    return {
        leaders: state.leaders
    }
}

class About extends Component{

    render(){
        const RenderHistory = () => {
            return(
                <Card title = "Our History">
                    <Text>
                        Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.
                    </Text>
                    <Text>
                        The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.
                    </Text>
                </Card>
            );
        };

        const RenderLeaders = ({item, index}) => {
            return(
                <ListItem
                    key = {index}
                    title = {item.name}
                    subtitle = {item.description}
                    leftAvatar={{ source: {uri: baseUrl + item.image}}}
                />
            );
        };

        const RenderAboutUs = () => {
            return(
                <Card title = "Corporate Leadership">
                    <FlatList 
                        data = {this.props.leaders.leaders}
                        renderItem = {RenderLeaders}
                        keyExtractor = {item => item.id.toString()}
                    />
                </Card>
            );
        }

        return(
            <ScrollView>
                <RenderHistory />
                <RenderAboutUs />
            </ScrollView>
        );
    };
};

export default connect(mapStateToProps)(About);