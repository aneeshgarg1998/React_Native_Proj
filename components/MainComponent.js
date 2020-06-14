import React, { Component } from 'react';
import { DISHES } from '../shared/dishes';
import { View, Text, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';

const MenuNavigator = createStackNavigator();

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
        dishes: DISHES,
        selectedDish: null
      };
  }

  onDishSelect(dishId) {
    this.setState({selectedDish: dishId})
}

  render() {

    const nav_option = {
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: "#fff"            
        }
    };
  
    return (

        <NavigationContainer>
            <MenuNavigator.Navigator initialRouteName="Menu">
                <MenuNavigator.Screen name="Menu" component={Menu} 
                    options= { nav_option }/>
                <MenuNavigator.Screen name="Dishdetail" component={Dishdetail} 
                    options= { nav_option }/>
            </MenuNavigator.Navigator>
        </NavigationContainer>
    );
  }
}
  
export default Main;