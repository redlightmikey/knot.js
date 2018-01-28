const knot = (extended = {}) => {
  const events = Object.create(null)

  const on = (name, ...handlers) => {
    events[name] = events[name] || []
    events[name] = events[name].concat(handlers)
    return face
  }

  // function on (name, handler) {
  //   events[name] = events[name] || []
  //   events[name].push(handler)
  //   return this
  // }

  const once = (name, ...handlers) => {
    handlers.forEach(handler => handler._once = true)
    on(name, handlers)
    return face
  }

  // function once (name, handler) {
  //   handler._once = true
  //   on(name, handler)
  //   return this
  // }

  const off = (name, ...handlers) => {
    if (handlers.length === 0) {
      delete events[name]
      return face
    }

    // TODO: need to handle case of multiple events

    return face
  }

  // function off (name, handler = false) {
  //   handler
  //     ? events[name].splice(events[name].indexOf(handler), 1)
  //     : delete events[name]
  //
  //   return this
  // }

  function emit (name, ...args) {
    // cache the events, to avoid consequences of mutation
    const cache = events[name] && events[name].slice()

    // only fire handlers if they exist
    cache && cache.forEach(handler => {
      // remove handlers added with 'once'
      handler._once && off(name, handler)

      // set 'this' context, pass args to handlers
      handler.apply(this, args)
    })

    return this
  }

  return {
    ...extended,

    on,
    once,
    off,
    emit
  }
}

export default knot
