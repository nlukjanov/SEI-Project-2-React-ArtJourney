import React from 'react'
import { Link } from 'react-router-dom'

const ArtCard = (piece) => {
  return (
    <div
      key={piece.id}
      className='column is-one-quarter-desktop is-one-third-tablet is-half-mobile'
    >
      <Link to={`/art/${piece.objectNumber}`} >
        <div className='card'>
          <div className='card-header'>
            <h4 className='card-header-title is-centered'>{piece.title}</h4>
          </div>
          <div className='card-image'>
            <figure className='image-index'>
              <img className='image-index' src={piece.webImage.url} alt={piece.title} />
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
  )
}

export default ArtCard