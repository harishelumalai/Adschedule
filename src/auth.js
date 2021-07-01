class Auth {
  constructor() {
    this.authenticated = false
  }

  getCookie(cname) {
    var name = cname + '='
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i]
      while (c.charAt(0) == ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length)
      }
    }
    return ''
  }

  login(cb) {
    this.authenticated = true
    cb()
    var d = new Date()
    d.setTime(d.getTime() + 60 * 60 * 1000)
    var expires = 'expires=' + d.toUTCString()
    document.cookie = 'token=tokenval; ' + expires + ';path=/'
  }

  logout(cb) {
    this.authenticated = false
    cb()
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    //console.log(this.getCookie('token'))
  }

  isAuthenticated() {
    //console.log(document.cookie)

    return this.authenticated || this.getCookie('token') !== ''
  }
}

export default new Auth()
