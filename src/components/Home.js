import React, { Component } from 'react'
import axios from 'axios'

import ArtCollection from './ArtCollection'
import { Link } from 'react-router-dom'
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
        `https://www.rijksmuseum.nl/api/en/collection?key=${apikey}&imgonly=True&ps=30&q='${this.state.input}'`
      )
      this.setState({ storedInput: this.state.input })
      this.setState({
        input: '',
        artPieces: res.data.artObjects,
        hasSearched: true,
        imageCounter: 0,
        loaded: false
      })
      console.log(res.data)
    } catch (err) {
      console.log(err)
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
    if (!this.props.match.params.query) return
    try {
      this.setState({
        storedInput: this.props.match.params.query,
        isTyping: true
      })
      const res = await axios.get(
        `https://www.rijksmuseum.nl/api/en/collection?key=${apikey}&imgonly=True&ps=30&q='${this.props.match.params.query}'`
      )
      this.setState({
        input: '',
        artPieces: res.data.artObjects,
        hasSearched: true
      })
      console.log(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  handleChange = e => {
    this.setState({ input: e.target.value, isTyping: true })
  }

  handleOnLoad = () => {
    if (this.state.imageCounter === this.state.artPieces.length) {
      this.setState({ loaded: true })
    }
    this.setState({
      imageCounter: this.state.imageCounter + 1
    })
  }

  render() {
    console.log(this.state.imageCounter)
    console.log(this.state.artPieces.length)
    return (
      <>
        {this.state.artPieces[0] && (
          <section className='hero header-image'>
            <div className='hero-body'>
              <div className='container'>
                <img
                  src={
                    this.state.artPieces[
                      [Math.floor(Math.random() * this.state.artPieces.length)]
                    ].headerImage.url
                  }
                  alt=''
                />
              </div>
            </div>
          </section>
        )}
        <section className='section home-begin'>
          <div className={this.state.hasSearched ? 'slideOutUp animated' : ''}>
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
                        placeholder='search'
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
                  className={`${this.state.storedInput ? 'search-result' : ''}`}
                >
                  {this.state.storedInput &&
                    `You searched for: ${this.state.storedInput}`}
                </div>
                {this.state.hasSearched && (
                  <button
                    onClick={this.handleClear}
                    className='button is-fullwidth'
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
                this.state.loaded ? 'cards-visible' : 'cards-hidden'
              }`}
            >
              {this.state.artPieces.map(piece => (
                <div
                  key={piece.id}
                  className='column is-one-quarter-desktop is-one-third-tablet is-half-mobile'
                >
                  <Link to={`/art/${piece.objectNumber}`}>
                    <div className='card'>
                      <div className='card-header'>
                        <h4 className='card-header-title is-centered'>
                          {piece.title}
                        </h4>
                      </div>
                      <div className='card-image'>
                        <figure className='image-index'>
                          <img
                            onLoad={this.handleOnLoad}
                            className='image-index'
                            src={piece.webImage.url}
                            alt={piece.title}
                          />
                        </figure>
                      </div>
                      <div className='card-content'>
                        <h5 className='is-6 has-text-centered'>
                          By {piece.principalOrFirstMaker}
                        </h5>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        ) : (
          this.state.hasSearched && (
            <section className='container result-page has-text-centered'>
              Nothing found
            </section>
          )
        )}
      </>
    )
  }
}

export default Home
