export default {
  getRandomNumber (max) {
    return Math.floor((Math.random() * 1000) + 1) % max
  },

  replaceAll: (str, find, replace) => {
    return str.replace(new RegExp(find, 'g'), replace)
  },

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  debounce: (func, wait, immediate) => {
    var timeout
    return () => {
      var context = this
      var args = arguments
      var later = () => {
        timeout = null
        if (!immediate) func.apply(context, args)
      }
      var callNow = immediate && !timeout
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
      if (callNow) func.apply(context, args)
    }
  }
}
