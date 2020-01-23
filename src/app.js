import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom'
import 'bulma'
import './stylesheets/main.scss'

import Home from './components/Home'
import ShowArt from './components/ShowArt'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <nav>
          <Link to='/'>Home</Link>
        </nav>
        <main>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/art/:id' component={ShowArt} />
          </Switch>
        </main>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
