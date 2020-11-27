import { StyleSheet, Dimensions } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../Themes'

const {width: WIDTH} = Dimensions.get('window')

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  scrollContainer: {
    flex: 1,
  },
 
 
  textInput: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    color: '#ffffff',
    marginHorizontal: 25,
    marginBottom: 15
    
  
  },
  
  subtitleText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '500',
    marginTop: 10,
    marginBottom: 10,

  },

  inputIcon: {

    position: 'absolute',
    top: 10,
    left: 37,
    

  },
  
  logo: {
    height: 100,
    width: 400,
    resizeMode: 'contain',
    marginTop: 100
  },
  logo1: {
    height: 100,
    width: 400,
    resizeMode: 'contain',
    marginTop : 20
  },
  loginText: {
    alignItems: 'center',
    justifyContent: 'center',
    width: "80%",
    color: '#ddd',
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#252525',
    marginBottom: 10
  },
  viewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

loginButton: {
        backgroundColor: '#4682B4',
        width: WIDTH - 55,
        height: 45,
        justifyContent: 'center',
        elevation: 2,
        marginTop: 10,
      },
      loginButtonText: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 16,
        textAlign: 'center' ,

        
      },
      
      backgroundContainer: {

        flex: 1,
        width: null,
        height: null,
        justifyContent: 'center',
        alignItems: 'center',
      },

      btnEye: {
        position: 'absolute',
        top: 10,
        right: 37,
      }
})
