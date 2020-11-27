import {  createAppContainer } from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import UserScreen from '../Containers/UserScreen'
import ProfileScreen from '../Containers/ProfileScreen'
import LoginScreen from '../Containers/LoginScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import SavedScreen from '../Containers/SavedScreen'
import SavedProfilesList from '../Containers/SavedProfilesList'




const PrimaryNav = createStackNavigator({
  LaunchScreen: { screen: LaunchScreen },
  LoginScreen: { screen: LoginScreen },
  
}, {

 headerMode: 'none',
 initialRouteName: 'LaunchScreen'
})

const secondaryNav = createStackNavigator({
 
  UserScreen: { screen: UserScreen },
  ProfileScreen: { screen: ProfileScreen },
  SavedScreen: { screen: SavedScreen },
  SavedProfilesList: {screen: SavedProfilesList }
 
}, {
headerMode: 'none',
navigationOptions: {
  initialRouteName: 'PrimaryNav',
     
 }
})

const mergeNav = createStackNavigator({
 PrimaryNav: {screen: PrimaryNav},
 secondaryNav: {screen: secondaryNav},
},{
  headerMode: 'none',
})

export default createAppContainer(mergeNav)
