import { createSelector } from 'reselect'
import { State } from './store'
import { Route } from './config'

export namespace RouteSelectors {
  const routingSelector = (state: State) => state.routing

  export const route = createSelector(
    [routingSelector],
    (routing) => <Route>routing.page
  )
}

export { AuthSelectors } from './models/auth'