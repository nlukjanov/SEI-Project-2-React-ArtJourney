import React from 'react'
import { Link } from 'react-router-dom'
import Magnifier from 'react-magnifier'

const ArtCardVertical = (artPiece) => (
  <>
    <h1 className="title has-text-centered">{artPiece.title}</h1>
    <div className="columns">
      <div className="column is-half">
        <figure className="image is-horizontal-center img-magnifier-container">
          <Magnifier
            src={artPiece.webImage.url}
            alt={artPiece.title}
          />
        </figure>
      </div>
      <div className="column is-5">
        <div className="content">
          <h5>Full title:</h5>
          <h4>{artPiece.longTitle}</h4>

          <h5 className="is-italic">Artist:</h5>
          {artPiece.principalMakers.length > 0 ?
            <Link to={`/${artPiece.principalMakers[0].name}`}><h4 className="artist-search">{artPiece.principalMakers[0].name}</h4></Link>
            : <h4>Unknown</h4>}

          <h5>Description:</h5>
          {artPiece.plaqueDescriptionEnglish ? <p>{artPiece.plaqueDescriptionEnglish}</p> : <p>No description available</p>}
        </div>
        <div className="content">
          <h5>Presenting date:</h5>
          <p>{artPiece.dating.presentingDate}</p>
          <h5>Colour palette:</h5>
          <div className="color-palette">
            {artPiece.colors.map(color => {
              const colorHex = color.hex
              return (
                <div key={color.hex} className="color-box" style={{ backgroundColor: colorHex }}></div>
              )
            })}
          </div>
        </div>
      </div>
      <div className="column"></div>
    </div>
  </>
)


export default ArtCardVertical