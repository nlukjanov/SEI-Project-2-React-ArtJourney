import React from 'react'
import { Link } from 'react-router-dom'

const ArtCollection = () => (
  <div>
    <div className='column is-one-quarter-desktop is-one-third-tablet is-half-mobile'>
      <Link to='/'>
        <button className='button'>Home</button>
      </Link>
    </div>
    <div>
      <h1 className='title has-text-centered'>Unable to display</h1>
    </div>
  </div>
)

export default ArtCollection
