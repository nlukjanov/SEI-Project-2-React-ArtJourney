import React from 'react'
import { Link } from 'react-router-dom'
import Magnifier from 'react-magnifier'

const ArtCardHorizontal = (artPiece) => {
  return (
    <>
      <h1 className="title has-text-centered">{artPiece.title}</h1>
      <div className="columns">
        <div className="column is-10 is-offset-1">
          <figure className="image navbar-brand">
            <Magnifier
              src={artPiece.webImage.url}
              alt={artPiece.title}
            />
          </figure>
          <div className="horizontal-info">
            <div className="content">
              <h5 className="is-italic">Full title:</h5>
              <h4>{artPiece.longTitle}</h4>
              <h5 className="is-italic">Artist:</h5>
              {artPiece.principalMakers.length > 0 ?
                <Link to={`/${artPiece.principalMakers[0].name}`}><h4 className="artist-search">{artPiece.principalMakers[0].name}</h4></Link>
                : <h4>Unknown</h4>}

              <h5 className="is-italic">Description:</h5>
              {artPiece.plaqueDescriptionEnglish ? <h5>{artPiece.plaqueDescriptionEnglish}</h5> : <h5>No description available</h5>}
            </div>
            <div className="content">
              <h5 className="is-italic">Presenting date:</h5>
              <h4>{artPiece.dating.presentingDate}</h4>
              <h5 className="is-italic">Colour palette:</h5>
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
        </div>
      </div>
    </>
  )
}

export default ArtCardHorizontal