import React from 'react'
import { Link } from 'react-router-dom'
import Magnifier from 'react-magnifier'
import Loading from '../common/Loading'

class ArtCardHorizontal extends React.Component {
  state = {
    imageLoaded: false
  }

  handleOnLoad = () => {
    this.setState({
      imageLoaded: true
    })
  }

  render() {
    return (
      <>
        <h1 className='title has-text-centered'>{this.props.title}</h1>
        <div className='columns'>
          <div className='column is-10 is-offset-1'>
            {!this.state.imageLoaded && <Loading />}
            <figure
              onLoad={this.handleOnLoad}
              className={`image navbar-brand ${
                this.state.imageLoaded ? 'cards-visible' : 'cards-hidden'
              }`}
            >
              <Magnifier src={this.props.webImage.url} alt={this.props.title} />
            </figure>
            <div className='horizontal-info'>
              <div className='content'>
                <h5 className='is-italic'>Full title:</h5>
                <h4>{this.props.longTitle}</h4>
                <h5 className='is-italic'>Artist:</h5>
                {this.props.principalMakers.length > 0 ? (
                  <Link to={`/${this.props.principalMakers[0].name}`}>
                    <h4 className='artist-search'>
                      {this.props.principalMakers[0].name}
                    </h4>
                  </Link>
                ) : (
                  <h4>Unknown</h4>
                )}

                <h5 className='is-italic'>Description:</h5>
                {this.props.plaqueDescriptionEnglish ? (
                  <h5>{this.props.plaqueDescriptionEnglish}</h5>
                ) : (
                  <h5>No description available</h5>
                )}
              </div>
              <div className='content'>
                <h5 className='is-italic'>Presenting date:</h5>
                <h4>{this.props.dating.presentingDate}</h4>
                <h5 className='is-italic'>Colour palette:</h5>
                <div className='color-palette'>
                  {this.props.colors.map(color => {
                    const colorHex = color.hex
                    return (
                      <div
                        key={color.hex}
                        className='color-box'
                        style={{ backgroundColor: colorHex }}
                      ></div>
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
}

export default ArtCardHorizontal
