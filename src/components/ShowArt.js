import React from 'react'
import axios from 'axios'

const apikey = process.env.API_KEY

class ShowArt extends React.Component {
  state = {
    artPiece: null
  }

  async componentDidMount() {
    const artId = this.props.match.params.id
    try {
      const res = await axios.get(`https://www.rijksmuseum.nl/api/en/collection/${artId}?key=${apikey}`)
      this.setState({ artPiece: res.data.artObject })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { artPiece } = this.state
    if (!artPiece) return null
    return (
      <section className="section">
        <div className="container">
          <h1 className="title has-text-centered">{artPiece.title}</h1>
          <div className="columns">
            <div className="column is-half">
              <figure className="image is-horizontal-center">
                <img src={artPiece.webImage.url} alt={artPiece.title} />
              </figure>
            </div>
            <div className="column is-half">
              <div className="content">
                <h5>Full title:</h5>
                <h4>{artPiece.longTitle}</h4>
                <h5>Artist:</h5>
                <h4 className="title is-4">{artPiece.principalMakers[0].name}</h4>
                <h5>Description:</h5>
                {artPiece.plaqueDescriptionEnglish ? <p>{artPiece.plaqueDescriptionEnglish}</p> : <p>No description available</p>}
              </div>
              <div className="content">
                <h5>Presenting date:</h5>
                <p>{artPiece.dating.presentingDate}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default ShowArt


// title
// webImage.url
// principalMakers (array with objects)[0].name
// plaqueDescriptionEnglish
// dating.presentingDate