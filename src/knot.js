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

  // FIXME: something is broken here, with the addition of the prop
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
    handlers.length === 0
      ? delete events[name]
      : events[name] = events[name].filter(handler => handlers.indexOf(handler) === -1)

    return face
  }

  // function off (name, handler = false) {
  //   handler
  //     ? events[name].splice(events[name].indexOf(handler), 1)
  //     : delete events[name]
  //
  //   return this
  // }

  const emit = (name, ...args) => {
    // exit early if no handlers exist
    if (!events[name]) {
      return
    }

    // run the handlers
    let disable = []

    events[name].forEach(handler => {
      // collect one time handlers
      if (handler._once) {
        disable.push(handler)
      }

      // NOTE: does this require a docs update? (whats the this context)
      // call handler with passing in the args
      handler(...args)
    })

    // remove one time handlers if they exist
    if (disable.length !== 0) {
      off(name, disable)
    }

    return face
  }

  // function emit (name, ...args) {
  //   // cache the events, to avoid consequences of mutation
  //   const cache = events[name] && events[name].slice()
  //
  //   // only fire handlers if they exist
  //   cache && cache.forEach(handler => {
  //     // remove handlers added with 'once'
  //     handler._once && off(name, handler)
  //
  //     // set 'this' context, pass args to handlers
  //     handler.apply(this, args)
  //   })
  //
  //   return this
  // }

  const face = {
    ...extended,
    on,
    once,
    off,
    emit
  }

  return face

  // return {
  //   ...extended,
  //
  //   on,
  //   once,
  //   off,
  //   emit
  // }
}

export default knot
