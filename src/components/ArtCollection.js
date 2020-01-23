import React from 'react'
import { Link } from 'react-router-dom'
import Loading from './Loading'

class ArtCollection extends React.Component {
  state = {
    loaded: false
  }

  componentDidMount() {
    console.log(this.state.loaded)
    setTimeout(() => this.setState({ loaded: true }), 1500)
  }

  render() {
    console.log(this.state)
    return (
      
    )
  }
}

export default ArtCollection
