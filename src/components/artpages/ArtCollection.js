import React from 'react'
import { Link } from 'react-router-dom'

const ArtCollection = ({ objectNumber, title, webImage, principalOrFirstMaker, handleOnLoad }) => (
  <div className='column is-one-quarter-desktop is-one-third-tablet is-half-mobile'>
    <Link to={`/art/${objectNumber}`}>
      <div className='card'>
        <div>
          <h4 className='card-header-title is-centered'>
            {title}
          </h4>
        </div>
        <div className='card-image has-text-centered'>
          <figure className='image-index'>
            <img
              onLoad={handleOnLoad}
              className='image-index'
              src={webImage.url.replace('=s0', '=s400')}
              alt={title}
            />
          </figure>
        </div>
        <div className='card-content'>
          {principalOrFirstMaker && <h5 className='is-6 has-text-centered'>
            By {principalOrFirstMaker}
          </h5>}
        </div>
      </div>
    </Link>
  </div>
)

export default ArtCollection
