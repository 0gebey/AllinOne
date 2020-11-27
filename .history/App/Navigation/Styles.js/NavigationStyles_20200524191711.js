import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    backgroundColor: '#432577',
    width: '100%',
    flex: 1
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    padding: 26, 
    fontWeight: '600',    
    textAlign: 'center'
  },
  backButton: {
    textAlign: 'left',
    position: 'absolute',
    left: 20,
  },
  homeButton: {
    textAlign: 'right',
    position: 'absolute',
    right: 20,
  },
  
})
