import firebaseAPI from '~/plugins/firebaseAPI'
import logUtil from '~/plugins/logUtil'

export default async function ({ store, route, redirect }) {
  console.log('route.name = ', route.name)
  if (store.state.Account.user === null) {
    console.log('store.state.Account.user is null')
  } else {
    console.log('store.state.Account.user = ', logUtil.stringify(store.state.Account.user))
  }

  if (route.name === "login" || route.name === "createAccount") {
    if (store.state.Account.user !== null) {
      redirect('/')
    }
  } else if (route.name === "logout") {
    firebaseAPI.logout().then(store.commit('Account/clearUser')).then(redirect('/login'))
  } else {
    if (store.state.Account.user === null ) {
      await firebaseAPI.auth().then(user => {
        console.log('state auth user ', logUtil.stringify(user))
        if (!user) {
          redirect('/login');
        } else {
          store.dispatch('Account/setUser', {
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
