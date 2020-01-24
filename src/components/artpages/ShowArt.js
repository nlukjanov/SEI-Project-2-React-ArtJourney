import React from 'react'
import axios from 'axios'

import ArtCardHorizontal from './ArtCardHorizontal'
import ArtCardVertical from './ArtCardVertical'
import ArtError from './ArtError'

const apikey = process.env.API_KEY

class ShowArt extends React.Component {
  state = {
    artPiece: null
  }

  async componentDidMount() {
    const artId = this.props.match.params.id
    try {
      const res = await axios.get(
        `https://www.rijksmuseum.nl/api/en/collection/${artId}?key=${apikey}`
      )
      this.setState({ artPiece: res.data.artObject })
    } catch (err) {
      this.props.history.push('/error')
    }
  }

  render() {
    const { artPiece } = this.state
    if (!artPiece) return null
    return (
      <>
        <section className='section'>
          <div className='container'>
            <button className='button' onClick={this.props.history.goBack}>
              Back
            </button>
            {!artPiece.webImage ? <ArtError /> :
              (artPiece.webImage.width > artPiece.webImage.height ? (<ArtCardHorizontal {...artPiece} />) : (<ArtCardVertical {...artPiece} />))
            }
          </div>
        </section>
      </>
    )
  }
}

export default ShowArt