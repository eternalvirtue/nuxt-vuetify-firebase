import firebase from '@/plugins/firebase'

export default function ({ store, route, redirect }) {
  if (route.name === "login" || route.name === "createAccount") {
    // do nothing
  } else if (route.name === "logout") {
    firebase.auth().signOut();
    redirect('/login');
  } else {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        redirect('/login');
      } else {
        store.commit('user/setUser', {
          uid: user.uid,
          email: user.email,
          username: user.displayName,
          userImage: user.photoURL,
        })
      }
    })
  }
}