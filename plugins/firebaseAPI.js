import firebase from '@/plugins/firebase'
import 'firebase/auth'
import 'firebase/firestore'

const firestore = firebase.firestore()
const auth = firebase.auth()

const firebaseAPI = {
  login(email, password) {
    return new Promise((resolve, reject) => {
      auth.signInWithEmailAndPassword(email, password)
        .then(user => resolve(user))
        .catch(err => reject(err))
    })
  },
  logout() {
    return new Promise((resolve, reject) => {
      auth.signOut()
      .then(() => resolve())
      .catch(err => reject(err))
    })
  },
  auth() {
    return new Promise((resolve, reject) => {
      auth.onAuthStateChanged(user => resolve(user))
    })
  },
  regist(email, password) {
    return new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => {
        resolve(user)
      }).catch(err => {
        reject(err)
      });
    })
  },
  createUser(user, note) {
    let registUser = {
      uid : user.uid,
      email : user.email,
      note : note,
      createdAt : firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt : firebase.firestore.FieldValue.serverTimestamp()
    }
    return new Promise((resolve, reject) => {
      firestore.collection('users').doc(user.uid).set(registUser)
      .then(newData => {
        resolve(newData)
      }).catch(err => {
        reject(err)
      })
    })
  },
  fetchNotes(userid) {
    return new Promise((resolve, reject) => {
      firestore.collection('notes').doc(userid).collection('entry').get()
      .then(querySnapshot => {
        resolve(querySnapshot)
      }).catch(err => {
          reject(err)
      })
    })
  },
  addNote(note, userid) {
    return new Promise((resolve, reject) => {
      note.createdAt = firebase.firestore.FieldValue.serverTimestamp()
      note.updatedAt = firebase.firestore.FieldValue.serverTimestamp()
      firestore.collection('notes').doc(userid).collection('entry').add(note)
      .then(newData => {
        resolve(newData)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default firebaseAPI