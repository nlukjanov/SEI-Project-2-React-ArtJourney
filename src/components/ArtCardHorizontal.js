import React from 'react'

const ArtCardHorizontal = (artPiece) => (
  <>
    <h1 className="title has-text-centered">{artPiece.title}</h1>
    <div className="columns">
      <div className="column is-10 is-offset-1">
        <figure className="image is-horizontal-center">
          <img src={artPiece.webImage.url} alt={artPiece.title} />
        </figure>
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
    </div>
  </>
)

export default ArtCardHorizontal