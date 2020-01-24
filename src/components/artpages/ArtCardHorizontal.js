import React from 'react'
import { Link } from 'react-router-dom'
import Magnifier from 'react-magnifier'
import Loading from '../common/Loading'
import axios from 'axios'
import MapGL, { Marker, NavigationControl } from 'react-map-gl'

const mapboxToken = process.env.MAPBOX_ACCESS_TOKEN

class ArtCardHorizontal extends React.Component {
  state = {
    imageLoaded: false,
    viewport: {
      latitude: 0,
      longitude: 0,
      zoom: 6,
      bearing: 0,
      pitch: 0
    },
    lat: 0,
    lng: 0
  }

  handleOnLoad = () => {
    this.setState({
      imageLoaded: true
    })
  }

  async componentDidMount() {
    try {
      const res = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.props.productionPlaces}.json?access_token=${mapboxToken}`
      )
      this.setState({
        ...this.state,
        viewport: {
          ...this.state.viewport,
          latitude: res.data.features[0].center[1],
          longitude: res.data.features[0].center[0]
        },
        lat: res.data.features[0].center[1],
        lng: res.data.features[0].center[0]
      })
    } catch (err) {
      console.log(err)
    }
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
                <div className='map'>
                  {this.props.productionPlaces.length > 0 && (
                    <MapGL
                      mapboxApiAccessToken={mapboxToken}
                      height={'280px'}
                      width={'100%'}
                      mapStyle='mapbox://styles/mapbox/light-v10'
                      {...this.state.viewport}
                      onViewportChange={viewport => this.setState({ viewport })}
                    >
                      <div style={{ position: 'absolute', right: 0 }}>
                        <NavigationControl />
                      </div>
                      <Marker
                        latitude={this.state.lat}
                        longitude={this.state.lng}
                      >
                        <div>🎨</div>
                      </Marker>
                    </MapGL>
                  )}
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
