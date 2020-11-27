import {  createAppContainer } from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import UserScreen from '../Containers/UserScreen'
import ProfileScreen from '../Containers/ProfileScreen'
import LoginScreen from '../Containers/LoginScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import SavedScreen from '../Containers/SavedScreen'
import SavedProfilesList from '../Containers/SavedProfilesList'
import DetailedInformationScreen from '../Containers/DetailedInformationScreen'
import ProfileTwitterScreen from '../Containers/ProfileTwitterScreen'



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
  ProfileTwitterScreen: {screen: ProfileTwitterScreen },
  SavedScreen: { screen: SavedScreen },
  SavedProfilesList: {screen: SavedProfilesList },
  DetailedInformation: {screen: DetailedInformationScreen}

 
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
