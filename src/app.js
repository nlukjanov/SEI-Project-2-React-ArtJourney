import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import 'bulma'
import './stylesheets/main.scss'

import Home from './components/common/Home'
import ShowArt from './components/artpages/ShowArt'
import ErrorPage from './components/common/ErrorPage'
// import Footer from './components/common/Footer'


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <main>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/art/:id' component={ShowArt} />
            <Route path='/error' component={ErrorPage} />
            <Route path='/:query' component={Home} />
          </Switch>
        </main>
        {/* <Footer /> */}
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
