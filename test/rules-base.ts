import * as firebase from '@firebase/testing'
import * as fs from "fs"

const projectId = 'rdx-demo'
const coverageUrl = `http://localhost:8080/emulator/v1/projects/${projectId}:ruleCoverage.html`

export const rules = fs.readFileSync("firebase/firestore.rules", "utf8")

export const authedApp = (auth) => firebase.initializeTestApp({ projectId, auth }).firestore()
export const anonApp = () => firebase.initializeTestApp({ projectId }).firestore()
export const adminApp = () => firebase.initializeAdminApp({ projectId }).firestore()

export abstract class AbstractTestBase {
  public static async before() {
    await firebase.loadFirestoreRules({ projectId, rules })
  }

  async before() {
    await firebase.clearFirestoreData({ projectId })
  }

  public static async after() {
    await Promise.all(firebase.apps().map(app => app.delete()))
    console.log(`View rule coverage information at ${coverageUrl}\n`)
  }
}
