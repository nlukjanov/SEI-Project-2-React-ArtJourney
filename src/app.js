import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import 'bulma'
import './stylesheets/main.scss'

import Home from './components/Home'
import ShowArt from './components/ShowArt'
import Footer from './components/Footer'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <main>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/art/:id' component={ShowArt} />
            <Route path='/:query' component={Home} />
          </Switch>
        </main>
        <Footer />
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
