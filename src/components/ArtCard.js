import React from 'react'
import { Link } from 'react-router-dom'
import Loading from './Loading'

class ArtCard extends React.Component {
  state = {
    imageStatus: 0
  }

  handleImageLoaded() {
    this.setState({ imageStatus: this.state.imageStatus + 1 })
  }
  render() {
    console.log(this.state)
    return (
      <section className='section result-page'>
        {this.state.imageStatus < 30 && <Loading />}
        <div
          className={`columns is-mobile is-multiline ${
            (this.state.imageStatus.length < 30) ? 'cards-hidden' : ''
          }`}
        >
          {this.props.data.artPieces.map(piece => (
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
                        onLoad={this.handleImageLoaded.bind(this)}
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
    )
  }
}

export default ArtCard
