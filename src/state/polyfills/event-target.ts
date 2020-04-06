interface Callback {
  (evt: Event): void
}

interface Listeners {
  [type: string]: Array<Callback>
}

class EventTargetPolyfill implements EventTarget {
  listeners: Listeners = {}

  addEventListener (type: string, callback: Callback) {
    if (!(type in this.listeners)) {
      this.listeners[type] = []
    }
    this.listeners[type].push(callback)
  }

  removeEventListener (type: string, callback: Callback) {
    if (!(type in this.listeners)) {
      return
    }
    const stack = this.listeners[type]
    // tslint:disable-next-line one-variable-per-declaration
    for (let i = 0, l = stack.length; i < l; i++) {
      if (stack[i] === callback) {
        stack.splice(i, 1)
        return
      }
    }
  }

  dispatchEvent (event: Event) {
    if (!(event.type in this.listeners)) {
      return true
    }
    const stack = this.listeners[event.type].slice()
    // tslint:disable-next-line one-variable-per-declaration
    for (let i = 0, l = stack.length; i < l; i++) {
      stack[i].call(this, event)
    }
    return !event.defaultPrevented
  }
}

try {
  new EventTarget()
} catch (err) {
  window.EventTarget = EventTargetPolyfill
}