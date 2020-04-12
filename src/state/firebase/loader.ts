import { config } from './config'

export type Firebase = typeof import('firebase')

declare global {
  interface Window {
    firebase: Firebase
  }
}

const loadScript = (url: string) => new Promise((resolve, reject) => {
  const script = document.createElement('script')
  script.src = url
  script.async = true
  script.onload = resolve
  script.onerror = reject
  document.head.appendChild(script)
})

const loadModule = (module: string) => loadScript(`https://www.gstatic.com/firebasejs/FIREBASE_SDK_VERSION/firebase-${module}.js`)


const loadAndInitialize = async () => {
  await loadModule('app')

  window.firebase.initializeApp(config)
  
  return window.firebase
}

export const loadFirebase = loadAndInitialize()

export const app = loadFirebase.then(firebase => firebase.app())

export const authLoader = app.then(app => loadModule('auth').then(() => app.auth()))

// export const firestoreLoader = app.then(app => loadModule('firestore').then(() => {
//   const fs = app.firestore()
//   fs.enablePersistence({ synchronizeTabs: true })
//   return fs
// }))

// TODO: use requestIdleCallback
setTimeout(() => {
  app.then(app => {
    loadModule('analytics').then(() => app.analytics())
    loadModule('performance').then(() => app.performance())
  })
}, 1000)