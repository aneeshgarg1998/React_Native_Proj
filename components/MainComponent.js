import React, { Component } from 'react';
import { DISHES } from '../shared/dishes';
import { View, Platform, Image, StyleSheet, ScrollView, SafeAreaView, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
  })

const MenuNavigator = createStackNavigator();
const HomeNavigator = createStackNavigator();
const ContactNavigator = createStackNavigator();
const AboutUsNavigator = createStackNavigator();
const MainNavigator = createDrawerNavigator();

const navOption = ({ navigation }) => {
    return (
        {
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: "#fff"            
            },
            headerLeft: () => (
            <Icon name = 'menu' size = {24} color = 'white' 
                onPress={() => navigation.toggleDrawer()}/>
            )         
        }
    );
};

function homeStackNavigator() {
    return(
        <HomeNavigator.Navigator initialRouteName = "Home">
            <HomeNavigator.Screen name = "Home" component={Home}
                options = { navOption } />
        </HomeNavigator.Navigator>
    );
};

function menuStackNavigator({ navigation }) {
    return(
        <MenuNavigator.Navigator initialRouteName="Menu">
            <MenuNavigator.Screen name="Menu" component={Menu} 
                // options= { navOption }
                options = { navOption({navigation}) }/>
            <MenuNavigator.Screen name="Dishdetail" component={Dishdetail} 
                options= { 
                    {
                        headerStyle: {
                            backgroundColor: "#512DA8"
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            color: "#fff"            
                        }
                    } 
                }/>
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

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    drawerHeader: {
      backgroundColor: '#512DA8',
      height: 140,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row'
    },
    drawerHeaderText: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold'
    },
    drawerImage: {
      margin: 10,
      width: 80,
      height: 60
    }
  });

const CustomDrawerContentComponent = (props) => (
    <ScrollView>
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <View style={styles.drawerHeader}>
          <View style={{flex:1}}>
            <Image source={require('./images/logo.png')} style={styles.drawerImage} />
          </View>
          <View style={{flex: 2}}>
            <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
          </View>
        </View>
        <DrawerItemList {...props} />
      </SafeAreaView>
    </ScrollView>
);

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
        dishes: DISHES,
        selectedDish: null
      };
  }

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {

    return (
        <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
            <NavigationContainer >
                <MainNavigator.Navigator initialRouteName = "Home" 
                    drawerContent = {CustomDrawerContentComponent}
                    drawerStyle={{
                        backgroundColor: '#D1C4E9'
                    }}>
                    <HomeNavigator.Screen name = "Home    " component={ homeStackNavigator } 
                        options = {{
                            drawerIcon: ({ tintColor }) => (
                                <Icon 
                                    name = 'home'
                                    type = 'font-awesome'
                                    size = {24}
                                    color = {tintColor}
                                />
                            )
                        }}/>
                    <AboutUsNavigator.Screen name = "About Us    " component={ aboutUsStackNavigator }
                        options = {{
                            drawerIcon: ({ tintColor }) => (
                                <Icon 
                                    name = 'info-circle'
                                    type = 'font-awesome'
                                    size = {24}
                                    color = {tintColor}
                                />
                            )
                        }}/>
                    <MenuNavigator.Screen name = "Menu    " component={ menuStackNavigator }
                    options = {{
                        drawerIcon: ({ tintColor }) => (
                            <Icon 
                                name = 'list'
                                type = 'font-awesome'
                                size = {24}
                                color = {tintColor}
                            />
                        )
                    }}/>
                    <ContactNavigator.Screen name = "Contact Us    " component={ contactStackNavigator }
                    options = {{
                        drawerIcon: ({ tintColor }) => (
                            <Icon 
                                name = 'address-card'
                                type = 'font-awesome'
                                size = {22}
                                color = {tintColor}
                            />
                        )
                    }}/>
                </MainNavigator.Navigator>
            </NavigationContainer>
        </View>
    );
  }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Main);