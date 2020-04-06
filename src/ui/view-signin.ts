import { LitElement, customElement, html, css } from 'lit-element'
import { sharedStyles } from './shared-styles'
import { dispatch } from './connected'

import '@material/mwc-button'

declare global {
  interface HTMLElementTagNameMap {
    'view-signin': ViewSigninElement
  }
}

@customElement('view-signin')
export class ViewSigninElement extends LitElement {
  signIn(e: Event) {
    const el = <HTMLElement>e.target
    dispatch.auth.signinProvider(el.id)
  }

  render() {
    return html`
      <h1>Sign In</h1>
      <p>Signing in will redirect you to the firebase authentication page for this app.</p>
      <mwc-button class="auth" raised @click=${this.signIn} id="google">
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg">
        Sign in with Google
      </mwc-button>
    `
  }

  static get styles() {
    return [
      sharedStyles,
      css`
        .auth {
          min-width: 240px;
          margin: 8px 0;
          width: 100%;
        }

        .auth img { 
          margin-right: 0.5em;
        }

        #google {
          --mdc-theme-on-primary: #757575;
          --mdc-theme-primary: #ffffff;
        }

        #facebook {
          --mdc-theme-on-primary: #ffffff;
          --mdc-theme-primary: #3b5998;
        }

        #twitter {
          --mdc-theme-on-primary: #ffffff;
          --mdc-theme-primary: #55acee;
        }

        img, svg {
          width: 24px;
          height: 24px;
          vertical-align: middle;
          margin-right: 10px;
        }
      `
    ]
  }
}
