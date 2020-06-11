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
    // Support for Google Analytics
    //
    // Uncomment the following line, if you want to use
    // Firebase's integration with Google Analytics
    // Note that you'll require the corresponding entry
    // in config, too.
    // loadModule('analytics').then(() => app.analytics())

    // Support for performance measurements
    //
    // Uncomment the following line, if you want to use
    // Firebase's performance metrics.
    // loadModule('performance').then(() => app.performance())
  })
}, 1000)