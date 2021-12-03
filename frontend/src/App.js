
// import React, { useContext } from 'react'
// import Home from './pages/home/Home'
// import Login from './pages/login/Login.jsx'
// import Profile from './pages/profile/Profile'
// import Register from './pages/register/Register'
// import {Redirect} from 'react-router'

// import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
// import { AuthContext } from './context/AuthContext'
// export default function App() {
//   const {user} = useContext(AuthContext)
//   return (
//     <Router>
//       <Switch>
//         <Route path = '/' exact> 
//           {user ? <Home /> : <Register />}
//         </Route>
//         <Route path = '/login'> 
//           {user ? <Redirect to = '/' /> : <Login />}
//         </Route>
//         <Route path = '/register'> 
//         {user ? <Redirect to = '/' /> : <Register />}
//         </Route>
//         <Route path = '/profile/:username'> 
//           <Profile />
//         </Route>
//       </Switch>
//     </Router>
//   )
// }


import React, { useContext } from 'react'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Profile from './pages/profile/Profile'
import Register from './pages/register/Register'

import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import { AuthContext } from './context/AuthContext'

const App = () => {
  const {user} = useContext(AuthContext)
  return <Router>
    <Switch>
      <Route exact path = '/'>
        {user ? <Home />: <Register />}
        
      </Route>
      <Route path = '/login'>
        {user ? <Redirect to = '/' />:<Login />}
      </Route>
      <Route path = '/register'>
      {user ? <Redirect to = '/' />:<Register />}
      </Route>
      <Route path = '/profile/:username'>
        <Profile />
      </Route>
    </Switch>
  </Router>
}

export default App
