import React, { Component } from 'react';
import { DISHES } from '../shared/dishes';
import { View, Text, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Home from './HomeComponent';
import { Icon } from 'react-native-elements';

const MenuNavigator = createStackNavigator();
const HomeNavigator = createStackNavigator();
const MainNavigator = createDrawerNavigator();

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

    function home_stack_navigator() {
        return(
            <HomeNavigator.Navigator initialRouteName = "Home">
                <HomeNavigator.Screen name = "Home" component={Home}
                    options = { nav_option } />
            </HomeNavigator.Navigator>
        );
    };

    function menu_stack_navigator() {
        return(
            <MenuNavigator.Navigator initialRouteName="Menu">
                <MenuNavigator.Screen name="Menu" component={Menu} 
                    options= { nav_option }/>
                <MenuNavigator.Screen name="Dishdetail" component={Dishdetail} 
                    options= { nav_option }/>
            </MenuNavigator.Navigator>
        );
    };
  
    return (
        <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
            <NavigationContainer >
                <MainNavigator.Navigator initialRouteName = "Home" 
                    drawerStyle={{
                        backgroundColor: '#D1C4E9'
                    }}>
                    <HomeNavigator.Screen name = "Home" component={ home_stack_navigator } />
                    <MenuNavigator.Screen name = "Menu" component={ menu_stack_navigator } />
                </MainNavigator.Navigator>
            </NavigationContainer>
        </View>
    );
  }
}
  
export default Main;