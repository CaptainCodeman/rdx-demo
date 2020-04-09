import { suite, test } from 'mocha-typescript'
import * as firebase from '@firebase/testing'
import { AbstractTestBase, adminApp, anonApp, authedApp } from './rules-base';
import { Todo } from '../src/firebase/models'

const todo: Todo = {
  id: '1',
  text: 'Buy some milk',
  created: new Date(),
  completed: false,
}

const path = `users/1/todos/${todo.id}`

@suite('todo')
export class TodoRules extends AbstractTestBase {
  async before() {
    super.before()

    const db = adminApp()
    await db.doc(path).set(todo)
  }

  @test
  async "block anonymous read"() {
    const db = anonApp();
    const doc = db.doc(path)
    await firebase.assertFails(doc.get())
  }

  @test
  async "block anonymous update"() {
    const db = anonApp();
    const doc = db.doc(path)
    await firebase.assertFails(doc.update({ completed: true }))
  }

  @test
  async "allow user update"() {
    const db = authedApp({ uid: '1' })
    const doc = db.doc(path)
    await firebase.assertSucceeds(doc.update({ completed: true }))
  }
}
