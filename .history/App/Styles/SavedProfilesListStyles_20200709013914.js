import { StyleSheet, Dimensions } from 'react-native'
import { ApplicationStyles, Metrics } from '../Themes'

const { width: WIDTH } = Dimensions.get('window')

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  container: {
    paddingBottom: Metrics.baseMargin
  },

  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },

  centered: {
    alignItems: 'center'
  },

  scrollContainer: {
    flex: 1,
    marginBottom: 80,
  },

  textInput: {
    width: 200,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    color: '#ffffff',
    marginHorizontal: 25,
    marginBottom: 15,
    alignItems: 'center'


  },

  subtitleText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '500',
    marginTop: 10,
    marginBottom: 10,

  },
  ApiText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '500',
    marginTop: 2,
    marginBottom: 2,

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
    marginTop: 20
  },
  loginText: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'rgba(190, 143, 195, 0.35)',
    color: '#ffffff',
    marginHorizontal: 25,
    marginBottom: 15
  },
  createProfileText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 24,
    textAlign: 'center',
    paddingTop: 10
  },
  viewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loginButton: {
    backgroundColor: '#432577',
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    justifyContent: 'center',
    elevation: 2,
    marginTop: 10,
  },
  loginButtonText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
    textAlign: 'center',


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
  },
  profileButton: {
    backgroundColor: '#432577',
    width: WIDTH - 90,
    height: 45,
    borderRadius: 25,
    justifyContent: 'center',
    elevation: 2,
    marginTop: 10,
    alignItems: 'center',
  },
  profileButtonText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
    textAlign: 'center',
  },

  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  listStyle: {
    alignItems: 'center',
    justifyContent: 'center',
},


container: {
  paddingBottom: Metrics.baseMargin
},

logo: {
  marginTop: Metrics.doubleSection,
  height: Metrics.images.logo,
  width: Metrics.images.logo,
  resizeMode: 'contain'
},

centered: {
  alignItems: 'center'
},

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
  marginTop: 10,
  marginBottom: 10
},
loginText: {
  width: WIDTH - 55,
  height: 45,
  borderRadius: 25,
  fontSize: 16,
  paddingLeft: 45,
  backgroundColor: 'rgba(190, 143, 195, 0.35)',
  color: '#ffffff',
  marginHorizontal: 25,
  marginBottom: 15
},
bioText: {
  width: WIDTH - 55,
  height: 45,
  fontSize: 16,
  color: '#ffffff',
  marginHorizontal: 25,
  marginBottom: 10,
  textAlign: 'center',
  justifyContent: 'center',
  borderBottomWidth: 2,
  borderBottomColor: '#ffffff',

},
viewStyle: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
},

loginButton: {
  backgroundColor: '#432577',
  width: WIDTH - 55,
  height: 45,
  borderRadius: 25,
  justifyContent: 'center',
  elevation: 2,
  marginTop: 10,
},
loginButtonText: {
  color: 'rgba(255, 255, 255, 0.7)',
  fontSize: 16,
  textAlign: 'center',
},

listText: {
  width: WIDTH - 55,
  height: 35,
  fontSize: 18,
  color: '#ffffff',
  marginHorizontal: 25,
  marginBottom: 10,
  textAlign: 'left',
  justifyContent: 'center',
},

listContainer: {
  flexDirection: 'row'
},

listStyle: {
  flex: 1,
  justifyContent: 'center',
  paddingLeft: 15
},

profileButton: {
  backgroundColor: '#432577',
  width: WIDTH - 90,
  height: 45,
  borderRadius: 25,
  justifyContent: 'center',
  elevation: 2,
  marginTop: 10,
  alignItems: 'center',
},
profileButtonText: {
  color: 'rgba(255, 255, 255, 0.7)',
  fontSize: 16,
  textAlign: 'center',
},

profileContainer: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
}
})
