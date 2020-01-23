import React, { Component } from 'react'
import ArtCard from './ArtCard'
import axios from 'axios'

const apikey = process.env.API_KEY

class Home extends Component {
  state = {
    input: '',
    storedInput: '',
    artPieces: [],
    hasSearched: false
  }

  handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.get(
        `https://www.rijksmuseum.nl/api/en/collection?key=${apikey}&imgonly=True&ps=30&q='${this.state.input}'`
      )
      this.setState({ storedInput: this.state.input })
      this.setState({ input: '', artPieces: res.data.artObjects })
      console.log(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  handleChange = e => {
    this.setState({ input: e.target.value, hasSearched: true })
    // make request to get data
  }

  render() {
    return (
      <>
        <section className='section home-begin'>
          <div className={this.state.hasSearched ? 'slideOutUp animated' : ''}>
            <h1 className='title is-1 has-text-centered'>Art Journey</h1>
            <form onSubmit={this.handleSubmit}>
              <div className='field'>
                <label className='label'>
                  <div className='control'>
                    <input
                      onChange={this.handleChange}
                      placeholder='search'
                      type='text'
                      className='input'
                      value={this.state.input}
                    />
                  </div>
                </label>
              </div>
            </form>
            <div className={`is-capitalized ${this.state.storedInput ? 'search-result' : ''}`}>{this.state.storedInput}</div>
          </div>
        </section>
        <section className='section result-page'>
          <div className='columns is-mobile is-multiline'>
            {this.state.artPieces.map(piece => (
              <ArtCard key={piece.id} {...piece} />
            ))}
          </div>
        </section>

      </>
    )
  }
}

export default Home
