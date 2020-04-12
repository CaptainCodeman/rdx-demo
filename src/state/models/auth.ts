import { createModel } from '@captaincodeman/rdx-model'
import { State, Store } from '../store'
import { createSelector } from 'reselect'
import { authLoader } from '../../firebase'

export type User = import('firebase').UserInfo

export interface AuthState {
  user: User | null
  statusKnown: boolean
}

export default createModel({
  state: <AuthState>{
    user: null,
    statusKnown: false,
  },

  reducers: {
    signedIn(state, user: User) {
      return { ...state, user, statusKnown: true }
    },

    signedOut(state) {
      return { ...state, user: null, statusKnown: true }
    },
  },

  effects: (store: Store) => ({
    async signout() {
      const auth = await authLoader
      await auth.signOut()
    },

    async signinProvider(name: string) {
      const auth = await authLoader
      const provider = providerFromName(name)
      await auth.signInWithRedirect(provider)
    },

    // to support signing in with other methods:
    // async signinEmailPassword(payload: { email: string, password: string }) {
    //   const auth = await authLoader
    //   await auth.signInWithEmailAndPassword(payload.email, payload.password)
    // },

    async init() {
      const auth = await authLoader
      const dispatch = store.dispatch()

      auth.onAuthStateChanged(async user => {
        if (user) {
          dispatch.auth.signedIn(user)
        } else {
          dispatch.auth.signedOut()
        }
      })
    },
  })
})

function providerFromName(name: string) {
  switch (name) {
    case 'google': return new window.firebase.auth.GoogleAuthProvider();
    // TODO: add whatever firebase auth providers are supported by the app
    // case 'facebook': return new window.firebase.auth.FacebookAuthProvider();
    // case 'twitter': return new window.firebase.auth.TwitterAuthProvider();
    default: throw `unknown provider ${name}`
  }
}

const getState = (state: State) => state.auth

export namespace AuthSelectors {
  export const user = createSelector(
    [getState],
    (state) => state.user
  )

  export const statusKnown = createSelector(
    [getState],
    (state) => state.statusKnown
  )

  export const anonymous = createSelector(
    [user],
    (user) => user === null
  )

  export const authenticated = createSelector(
    [user],
    (user) => user !== null
  )
}
