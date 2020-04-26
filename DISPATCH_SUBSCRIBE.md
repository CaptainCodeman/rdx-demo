# Forensics on RDX usage

This is a "working" guess on how RDX works, and how to implement it into your own system.

- working - because it's enough code to actually prove that it functions as advertised
- guess - in that "Who knows if this is the right way, or not"

## What is the source of this document?

This document is taken entirely from examining the code from the March 2020 version of rdx-demo, and trying to replicate what that does within the firebase sign out code

## What is the high level objective?

- one WC would be able to pass a value into the rdx state model
- the rdx state model would then be able to do some pure function with that passed value, in our case, square the number
- any other WC would be able to subscribe to the results of that pure function via a property

## Now, describe the above in code:

This is the simple part, not more difficult than coding in events or properties-down or any other state handling mechanism. Just different semantics/syntax

- within calling WC `dispatch.myModel.takeValue(value)`
- within the pure function `value = value * value`
- within the receiving WC's mapState() `myval: MyModelSelectors.squaredValue(state)`

## memoization, under the hood?

- a package called "reselect" provides a memoization layer for us.
- this doc does not even consider the possibility of bypassing this layer - although some may ask if this is advantageous or possible in some situations

<hr>

# Coding steps, in addition to the above:

This is the core purpose of this document - to define those coding tasks which are required to support dispatch, pure functions, and receiving results of functions

The lion's share of the coding is done in `src/state/models/mymodel.ts`

- create the takeValue() function
- insert the appropriate code into takeValue() function
- initialize state, as is or is not required
- create the appropriate MyModelSelector for reselect memoization

<code>
import { createModel } from '@captaincodeman/rdx-model'
import { State } from '../store'
import { createSelector } from 'reselect'

export interface MyModelState {
  input: Number
  squaredValue: String
}

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

const getState = (state: State) => state.mymodel

export namespace MyModelSelectors {
  export const foo = createSelector(
    [getState],
    (state) => state.squaredValue
  )
}
</code>

Once you have created  `src/state/models/mymodel.ts` as above, you still have to export a couple things that you created.

- in `src/state/models/index.ts` add this: `export { default as mymodel } from './mymodel'`
- in `src/state/selector.ts` add this: `export { MyModelSelectors } from './models/mymodel'`

## Some easy points of confusion from above:

- `src/state/models/index.ts` exports default from `src/state/models/mymodel.ts` which is in turn consumed within `src/state/models/mymodel.ts`. This kinda threw me for a loop.

- If you are not accustomed to TypeScript you may have to wrestle a bit with the code inside `src/state/models/mymodel.ts` even just to get it to work. Some TypeScript code is really intuitive to imitate, once you see it. This code isn't quite as intuitive as some.

## Other code, not describe in this document

There are other elements that are not describe in this document. It is assumed that these are already known and understood, or are documented elsewhere.

- views,
- routing,
- buttons
- menus
