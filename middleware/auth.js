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
  }
}
