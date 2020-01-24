import React, { Component } from 'react'
import axios from 'axios'

import ArtCollection from '../artpages/ArtCollection'
import Loading from './Loading'

const apikey = process.env.API_KEY

class Home extends Component {
  state = {
    input: '',
    storedInput: '',
    artPieces: [],
    isTyping: false,
    hasSearched: false,
    loaded: false,
    imageCounter: 0
  }

  handleSubmit = async e => {
    e.preventDefault()
    try {
      this.props.history.push(`/${this.state.input}`)
      const res = await axios.get(
        `https://www.rijksmuseum.nl/api/en/collection?key=${apikey}&imgonly=True&ps=20&q='${this.state.input}'`
      )
      this.setState({ storedInput: this.state.input })
      this.setState({
        input: '',
        artPieces: res.data.artObjects,
        hasSearched: true,
        imageCounter: 0,
        loaded: false
      })
    } catch (err) {
      console.log(err)
      this.props.history.push('/error')
    }
  }

  handleClear = () => {
    this.props.history.push('/')
    this.setState({
      input: '',
      storedInput: '',
      artPieces: [],
      isTyping: false,
      hasSearched: false,
      imageCounter: 0,
      loaded: false
    })
  }

  async componentDidMount() {
    window.scrollTo(0, 0)
    if (!this.props.match.params.query) return
    try {
      this.setState({
        storedInput: this.props.match.params.query,
        isTyping: true
      })
      const res = await axios.get(
        `https://www.rijksmuseum.nl/api/en/collection?key=${apikey}&imgonly=True&ps=20&q='${this.props.match.params.query}'`
      )
      this.setState({
        input: '',
        artPieces: res.data.artObjects,
        hasSearched: true
      })
    } catch (err) {
      console.log(err)
      this.props.history.push('/error')
    }
  }

  handleChange = e => {
    this.setState({ input: e.target.value, isTyping: true })
  }

  handleOnLoad = () => {
    this.setState({
      imageCounter: this.state.imageCounter + 1
    })
    if (this.state.artPieces.length === 1) {
      this.setState({ loaded: true })
    } else if (this.state.imageCounter === this.state.artPieces.length / 2) {
      this.setState({ loaded: true })
    }
  }

  render() {
    return (
      <>
        <div className="">
          <div className="hero-body frame-img">
            {this.state.artPieces[0] && (
              <section className='hero header-image'>
                <div className='hero-body'>
                  <div className='container header-img-container'>
                    <img
                      className="header-img"
                      src={
                        this.state.artPieces[
                          [Math.floor(Math.random() * this.state.artPieces.length)]
                        ].headerImage.url
                      }
                      alt='Main image'
                    />
                  </div>
                </div>
              </section>
            )}
            <section className='section home-begin'>
              <div className={(this.state.hasSearched && this.state.artPieces.length > 0) ? 'slideOutUp animated' : ''}>
                <h1 id='h1' className='title is-1 has-text-centered'>
                  <span className='has-background-white header-text'>
                    Art Journey
                  </span>
                </h1>
                <div className='search-input'>
                  <form onSubmit={this.handleSubmit}>
                    <div className='field'>
                      <label className='label'>
                        <div className='control'>
                          <input
                            onChange={this.handleChange}
                            placeholder='Search for anything you like'
                            type='text'
                            className='input search-input'
                            value={this.state.input}
                          />
                        </div>
                      </label>
                    </div>
                  </form>
                  <div className='search-block'>
                    <div
                      className={`${this.state.storedInput ? 'search-result button' : ''}`}
                    >
                      {this.state.storedInput &&
                        `You searched for: ${this.state.storedInput}`}
                    </div>
                    {this.state.hasSearched && (
                      <button
                        onClick={this.handleClear}
                        className='button'
                      >
                        Clear Results
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </section>
            {this.state.hasSearched && this.state.artPieces.length > 0 ? (
              <section className='section result-page'>
                {!this.state.loaded && <Loading />}
                <div
                  className={`columns is-mobile is-multiline ${
                    this.state.loaded ? 'cards-visible' : 'cards-hidden'}`}
                >
                  {this.state.artPieces.map(piece => (
                    <ArtCollection key={piece.id} {...piece} handleOnLoad={this.handleOnLoad} />
                  ))}
                </div>
              </section>
            ) : (this.state.hasSearched && (
              <div className='has-text-centered'>
                <p className="nothing-text">Nothing found</p>
              </div>
            ))}
          </div>
        </div>
      </>
    )
  }
}

export default Home
