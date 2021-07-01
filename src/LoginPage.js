import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import auth from './auth'
import config from './config.json'
import './index.css'
//import Cookies from 'js-cookie'
//import 'bootstrap/dist/css/bootstrap.min.css'
const loginstate_init = { email: '', password: '', logging_in: false }
const center = { margin: '0 auto' }

function LoginCard(props) {
  const [loginState, setLoginState] = useState(loginstate_init)

  const LoginClicked = () => {
    console.log('Login Clicked')

    let username = document.getElementById('login-username').value
    let password = document.getElementById('login-password').value
    let status_ele = document.getElementById('login-status')
    if (username === '' || username === undefined) {
      status_ele.innerText = 'Invalid username'
      return
    }
    if (password.length === 0 || password === undefined) {
      status_ele.innerText = 'Invalid password'
      return
    }
    let fd = new FormData()
    fd.append('command', 'login')
    fd.append('username', username)
    fd.append('password', password)

    let xhr = new XMLHttpRequest()
    let url = config.SERVER_URL + 'login.php'

    xhr.open('POST', url, true)

    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let response = this.responseText
        if (response == 1) {
          console.log('Logged in Successfully')
          //alert('Logged in Successfully')
          auth.login(() => {
            props.history.push('/manage_media')
          })
          loginState.logging_in = false
          //fetchClients()
        } else {
          console.log('Failed to login')
          loginState.logging_in = false
          status_ele.innerText = 'Failed to login'
        }
      }
    }
    xhr.send(fd)
  }

  if (loginState.logging_in) {
    return (
      <div className='CenterContainer LoginBG'>
        <div className='LoginCard Card'>
          <h1 style={center}>Logging In</h1>
        </div>
      </div>
    )
  } else {
    return (
      <div className='CenterContainer LoginBG'>
        <div className='LoginCard Card'>
          <h1 style={center}>Login</h1>
          <Form>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='text'
                id='login-username'
                placeholder='Enter username'
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                id='login-password'
                placeholder='Password'
              />
            </Form.Group>

            <Form.Group>
              <Button variant='primary' onClick={() => LoginClicked()}>
                Submit
              </Button>
            </Form.Group>
            <Form.Group>
              <Form.Text className='text-muted' id='login-status'></Form.Text>
            </Form.Group>
          </Form>
        </div>
      </div>
    )
  }
}

export default LoginCard
