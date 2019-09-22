import firebase from '@/plugins/firebase'
import 'firebase/auth'

const firebaseAPI = {
  login(email, password) {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => resolve(user))
        .catch(err => reject(err))
    })
  },
  logout() {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signOut()
        .then(() => resolve())
        .catch(err => reject(err))
    })
  },
  auth() {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(user => resolve(user))
    })
  }
}

export default firebaseAPI