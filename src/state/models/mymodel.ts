import { createModel } from '@captaincodeman/rdx-model'
import { State } from '../store'
import { createSelector } from 'reselect'

export interface MyModelState {
  input: Number
  squaredValue: String
}

// Please note that this default export of createModel() is re-exported 
// as mymodel in ../ index.ts, then consumed by getState() below 
// as state.mymodel.
// This could be confusing, even if it does make perfect sense, eventually
export default createModel({
  
  state: <MyModelState>{
    input: 1,
    squaredValue: "Input value has not been set"
  },

  reducers: {
    takeValue(state, input) {
      const result =  input * input
      const returning: String = `${input} times itself is ${result} at ${Date.now()}`
      return { ...state, squaredValue: returning }
    }
  }
})

// see ../index.ts for where state.mymodel below,
// is defined using default export from above
const getState = (state: State) => state.mymodel

export namespace MyModelSelectors {
  export const squaredValue = createSelector(
    [getState],
    (state) => state.squaredValue
  )
}