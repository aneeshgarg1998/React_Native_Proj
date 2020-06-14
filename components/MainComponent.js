import React, { Component } from 'react';
import { DISHES } from '../shared/dishes';
import { View, Text, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { Icon } from 'react-native-elements';

const MenuNavigator = createStackNavigator();
const HomeNavigator = createStackNavigator();
const ContactNavigator = createStackNavigator();
const AboutUsNavigator = createStackNavigator();
const MainNavigator = createDrawerNavigator();

const navOption = {
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        color: "#fff"            
    }
};

function homeStackNavigator() {
    return(
        <HomeNavigator.Navigator initialRouteName = "Home">
            <HomeNavigator.Screen name = "Home" component={Home}
                options = { navOption } />
        </HomeNavigator.Navigator>
    );
};

function menuStackNavigator() {
    return(
        <MenuNavigator.Navigator initialRouteName="Menu">
            <MenuNavigator.Screen name="Menu" component={Menu} 
                options= { navOption }/>
            <MenuNavigator.Screen name="Dishdetail" component={Dishdetail} 
                options= { navOption }/>
        </MenuNavigator.Navigator>
    );
};

function contactStackNavigator() {
    return(
        <ContactNavigator.Navigator initialRouteName = "Contact">
            <ContactNavigator.Screen name = "Contact" component={ Contact }
                options = { navOption } />
        </ContactNavigator.Navigator>
    );
};

function aboutUsStackNavigator() {
    return(
        <AboutUsNavigator.Navigator initialRouteName = "About">
            <AboutUsNavigator.Screen name = "About" component={ About }
                options = { navOption } />
        </AboutUsNavigator.Navigator>
    );
};

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
  
    return (
        <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
            <NavigationContainer >
                <MainNavigator.Navigator initialRouteName = "Home" 
                    drawerStyle={{
                        backgroundColor: '#D1C4E9'
                    }}>
                    <HomeNavigator.Screen name = "Home" component={ homeStackNavigator } />
                    <AboutUsNavigator.Screen name = "About Us" component={ aboutUsStackNavigator } />
                    <MenuNavigator.Screen name = "Menu" component={ menuStackNavigator } />
                    <ContactNavigator.Screen name = "Contact Us" component={ contactStackNavigator } />
                </MainNavigator.Navigator>
            </NavigationContainer>
        </View>
    );
  }
}
  
export default Main;