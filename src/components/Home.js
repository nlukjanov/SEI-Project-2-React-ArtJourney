import React, { Component } from 'react'
import ArtCard from './ArtCard'
import axios from 'axios'

const apikey = process.env.API_KEY

class Home extends Component {
  state = {
    input: '',
    storedInput: '',
    artPieces: []
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
    this.setState({ input: e.target.value })
    // make request to get data
  }

  render() {
    console.log(this.state)
    return (
      <>
        <section className='section'>
          <div>
            <img src='' alt='' />
          </div>
        </section>
        <section>
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
          <div>{this.state.storedInput}</div>
        </section>
        <section className='section'>
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
