import React, { Component } from 'react'
import ArtCollection from './ArtCollection'
import axios from 'axios'

const apikey = process.env.API_KEY

class Home extends Component {
  state = {
    input: '',
    storedInput: '',
    artPieces: [],
    isTyping: false,
    hasSearched: false
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
        hasSearched: true
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
      hasSearched: false
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

  render() {
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
          <ArtCollection data={this.state} />
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
