import firebase from '@/plugins/firebase'
import firebaseAPI from '~/plugins/firebaseAPI'

export default function ({ store, route, redirect }) {
  if (route.name === "login" || route.name === "createAccount") {
    if (store.state.Account.user !== null) {
      redirect('/')
    }
  } else if (route.name === "logout") {
    firebaseAPI.logout().then(store.commit('Account/clearUser')).then(redirect('/login'))
  } else {
    if (store.state.Account.user === null) {
      console.log('store2.state.Account.user is null ')
    } else {
      console.log('store2.state.Account.user = ' + JSON.stringify(store.state.Account.user))
    }
    if (store.state.Account.user === null ) {
      firebaseAPI.auth().then(user => {
        console.log('state2 auth user ' + JSON.stringify(user))
        if (!user) {
          redirect('/login');
        } else {
          store.commit('Account/setUser', {
            uid: user.uid,
            email: user.email,
            username: user.displayName,
            userImage: user.photoURL,
          })
        }
      })
    }
    /*
    setUserInfo(store).then(() => {
      if (store.state.Account.user === null) {
        console.log('store2.state.Account.user is null ')
      } else {
        console.log('store2.state.Account.user = ' + store.state.Account.user.uid)
      }
      if (store.state.Account.user === null) {
        redirect('/login')
      }
    })
    /*
    firebaseAPI.auth().then(user => {
      console.log('store.user = ' + user)
      if (user === null) {
        redirect('/login')
      } else {
        if (store.state.Account.user === null) {
          store.commit('Account/setUser', {
            uid: user.uid,
            email: user.email,
            username: user.displayName,
            userImage: user.photoURL,
          })
          if (store.state.Account.user === null) {
            console.log('store2.state.Account.user is null ')
          } else {
            console.log('store2.state.Account.user = ' + store.state.Account.user.uid)
          }
        }
      }
    }).catch(err => console.log(err))*/
  }
}

const setUserInfo = async (store) => {
  const user = await firebaseAPI.auth()
  console.log('setUserInfo.user = ' + user)
  if (user !== null && store.state.Account.user === null) {
    console.log('setUserInfo trying to set = ')
   await store.commit('Account/setUser', {
      uid: user.uid,
      email: user.email,
      username: user.displayName,
      userImage: user.photoURL,
    })
  }
  if (store.state.Account.user === null) {
    console.log('setUserInfo.state.Account.user is null ')
  } else {
    console.log('setUserInfo.state.Account.user = ' + store.state.Account.user.uid)
  }
}