import { LitElement, customElement, html, css, query, PropertyValues } from 'lit-element'

import './app-view'
import './auth-status'

import '@material/mwc-drawer'
import '@material/mwc-icon-button'
import '@material/mwc-top-app-bar'

import { Drawer } from '@material/mwc-drawer'
import { TopAppBar } from '@material/mwc-top-app-bar'

const drawerShowAt = 1024
const drawerModalAt = 768

declare global {
  interface HTMLElementTagNameMap {
    'view-shell': AppShellElement
  }
}

@customElement('app-shell')
export class AppShellElement extends LitElement {
  constructor() {
    super()
    this.setDrawOpenState = this.setDrawOpenState.bind(this)
  }

  @query('mwc-drawer')
  drawer: Drawer

  @query('mwc-top-app-bar')
  appBar: TopAppBar

  @query('[slot="appContent"]')
  appContent: HTMLElement

  @query('#drawerContent')
  drawerContent: HTMLElement

  toggleDrawer() {
    this.drawer.open = !this.drawer.open
  }

  clickDrawer(e: Event) {
    // close drawer if item has been clicked (not drawer content itself)
    if (this.drawer.type === 'modal' && e.target !== this.drawerContent) {
      this.drawer.open = false
    }
  }

  setDrawOpenState() {
    const type = window.innerWidth < drawerModalAt ? 'modal' : 'dismissible'
    const open = (this.drawer.open && (this.drawer.type === 'modal' || type === 'dismissible')) || window.innerWidth >= drawerShowAt

    this.drawer.type = type
    this.drawer.open = open
  }

  firstUpdated(_changedProperties: PropertyValues) {
    this.appBar.scrollTarget = this.appContent

    this.setDrawOpenState()

    window.addEventListener('resize', this.setDrawOpenState, { passive: true });
    window.addEventListener('orientationchange', () => setTimeout(this.setDrawOpenState, 500));
  }

  render() {
    return html`
      <mwc-drawer>
        <div id="drawerContent" @click=${this.clickDrawer}>
          <auth-status></auth-status>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/dispatch">Dispatch Example</a></li>
            <li><a href="/subscribe">Subscribe Example</a></li>
          </ul>
        </div>
        <div slot="appContent">
          <mwc-top-app-bar @MDCTopAppBar:nav=${this.toggleDrawer}>
            <mwc-icon-button slot="navigationIcon" icon="menu"></mwc-icon-button>
            <div slot="title">Rdx Demo</div>
          </mwc-top-app-bar>
          <app-view></app-view>
        </div>
      </mwc-drawer>
    `
  }

  static get styles() {
    return css`
      #drawerContent {
        height: 100%;
        background-color: #fafafa;
      }

      #drawerContent mwc-icon-button {
        display: block;
        margin: 16px;
      }

      [slot="appContent"] {
        height: 100%;
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
      }

      mwc-top-app-bar {
        will-change: opacity;
      }

      app-view {
        box-sizing: border-box;
        padding: var(--min-padding);
      }

      auth-status {
        height: 56px;
        background-color: #f8f8f8;
      }

      /* TODO: style ul / li nav links */

      @media (min-width: 600px) {
        auth-status {
          height: 64px;
        }
      }

      @media (min-width: ${drawerShowAt}px) {
        [slot="navigationIcon"] {
          display: none;
        }
      }
    `
  }
}