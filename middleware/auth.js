import firebase from '@/plugins/firebase'

export default function ({ store, route, redirect }) {
  if (route.name === "login" || route.name === "createAccount") {
    if (store.state.Account.user !== null) {
      redirect('/');
    }
  } else if (route.name === "logout") {
    firebase.auth().signOut();
    store.commit('Account/clearUser');
    redirect('/login');
  } else {
    if (store.state.Account.user === null) {
      redirect('/login');
    }
  }
}