import './App.css'
import Nav from './Nav'
import ManageMedia from './ManageMedia'
import ManageClients from './ManageClients'
import ClientMedia from './ClientMedia'
import LoginCard from './LoginPage'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'

function App() {
  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route path='/' exact component={LoginCard} />
          <Route path='/login' exact component={LoginCard} />
          <ProtectedRoute path='/manage_media' component={ManageMedia} />
          <ProtectedRoute path='/manage_clients' component={ManageClients} />
          <ProtectedRoute path='/client_media/:id' component={ClientMedia} />
          <ProtectedRoute path='/logout' />
        </Switch>
      </div>
    </Router>
  )
}

export default App
