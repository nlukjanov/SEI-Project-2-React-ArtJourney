import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import ArtCardHorizontal from './ArtCardHorizontal'
import ArtCardVertical from './ArtCardVertical'

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
      console.log(err)
    }
  }

  render() {
    console.log(this.props.history)
    const { artPiece } = this.state
    if (!artPiece) return null
    return (
      <>
        <section className='section'>
          <div className='container'>
            <button className='button' onClick={this.props.history.goBack}>
              Back
            </button>
            {artPiece.webImage.width > artPiece.webImage.height ? (
              <ArtCardHorizontal {...artPiece} />
            ) : (
              <ArtCardVertical {...artPiece} />
            )}
          </div>
        </section>
      </>
    )
  }
}

export default ShowArt

// title
// webImage.url
// principalMakers (array with objects)[0].name
// plaqueDescriptionEnglish
// dating.presentingDate
