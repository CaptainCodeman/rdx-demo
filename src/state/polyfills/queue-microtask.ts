if (typeof window.queueMicrotask !== 'function') {
  window.queueMicrotask = callback => Promise.resolve().then(callback)
}