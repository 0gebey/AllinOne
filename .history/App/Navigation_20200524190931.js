import { createStackNavigator, createAppContainer } from 'react-navigation'
import UserScreen from '../Containers/UserScreen'
import ProfileScreen from '../Containers/ProfileScreen'
import LoginScreen from '../Containers/LoginScreen'
import LaunchScreen from '../Containers/LaunchScreen'


// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  LoginScreen: { screen: LoginScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
 //def headerMode: 'none',7
 headerMode: 'none',
 initialRouteName: 'LaunchScreen'
})

const secondaryNav = createStackNavigator({
  UserScreen: { screen: UserScreen },
  ProfileScreen: { screen: ProfileScreen },
}, {
  // Default config for all screens
 //def headerMode: 'none',
 
//  defaultNavigationOptions: {
//   headerStyle: styles.header,
//   headerTintColor: '#432577' ,
//   headerVisible: true,
// }
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
