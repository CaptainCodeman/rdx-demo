import { devtools, persist, createStore, StoreState, StoreDispatch, ModelStore } from '@captaincodeman/rdx'
import { config } from './config'

export const store = devtools(persist(createStore(config)))
export const dispatch: Dispatch = store.dispatch

export interface State extends StoreState<typeof config> {}
export interface Dispatch extends StoreDispatch<typeof config> {}
export interface Store extends ModelStore<Dispatch, State> {}
