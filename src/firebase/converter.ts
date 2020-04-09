import { Todo } from './models'

const getFireStoreProp = value => {
  const props = { 'arrayValue': 1, 'bytesValue': 1, 'booleanValue': 1, 'doubleValue': 1, 'geoPointValue': 1, 'integerValue': 1, 'mapValue': 1, 'nullValue': 1, 'referenceValue': 1, 'stringValue': 1, 'timestampValue': 1 }
  return Object.keys(value).find(k => props[k] === 1)
}

export const FireStoreParser = value => {
  const prop = getFireStoreProp(value)
  if (prop === 'doubleValue' || prop === 'integerValue') {
    value = Number(value[prop])
  }
  else if (prop === 'arrayValue') {
    value = (value[prop] && value[prop].values || []).map(v => FireStoreParser(v))
  }
  else if (prop === 'mapValue') {
    value = FireStoreParser(value[prop] && value[prop].fields || {})
  }
  else if (prop === 'geoPointValue') {
    value = { latitude: 0, longitude: 0, ...value[prop] }
  }
  else if (prop === 'timestampValue') {
    value = new Date(value[prop])
  }
  else if (prop) {
    value = value[prop]
  }
  else if (typeof value === 'object') {
    Object.keys(value).forEach(k => value[k] = FireStoreParser(value[k]))
  }
  return value;
}

export const toJS = (obj: any) => {
  for (const prop in obj) {
    if (obj[prop] instanceof window.firebase.firestore.Blob) {
      obj[prop] = obj[prop].toBase64()
    } else if (obj[prop] instanceof window.firebase.firestore.Timestamp) {
      obj[prop] = obj[prop].toDate()
    } else if (typeof obj[prop] === 'object') {
      toJS(obj[prop])
    } else if (Array.isArray(obj[prop])) {
      obj[prop].forEach(toJS)
    }
  }
  return obj
}

export const todoConverter = {
  toFirestore(todo: Todo): firebase.firestore.DocumentData {
    const { id, ...data } = todo
    return data
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): Todo {
    const data = snapshot.data(options)!;
    return <Todo>{ ...toJS(data), id: snapshot.id };
  }
};