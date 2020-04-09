import { createSelector } from 'reselect'
import { State } from './store'

export namespace RouteSelectors {
  const routingSelector = (state: State) => state.routing

  export const view = createSelector(
    [routingSelector],
    (routing) => routing.page
  )
}

export { AuthSelectors } from './models/auth'