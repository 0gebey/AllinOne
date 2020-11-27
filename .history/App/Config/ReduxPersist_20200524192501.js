import immutablePersistenceTransform from '../Services/ImmutablePersistenceTransform'
import { AsyncStorage } from 'react-native'

const REDUX_PERSIST = {
  active: true,
  reducerVersion: '1.0',
  storeConfig: {
    key: 'primary',
    storage: AsyncStorage,
    
    blacklist: ['login', 'search', 'nav'],
 
    transforms: [immutablePersistenceTransform]
  }
}

export default REDUX_PERSIST
