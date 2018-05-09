import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
	constructor(props) {
		super(props);

		const style = {
			width: '100%',
			height: '100%'
		}
	}

	render() {
		return (
			<Map 
				google={this.props.google}
				style={this.style}
				initialCenter={{lat: 35.85472104, lng: 14.48779873}}
				zoom={11}>
				<Marker onClick={this.onMarkerClick} name={'Current location'} />
			</Map>
		);
	}
}

const LoadingContainer = (props) => (
  <div>Fancy loading container!</div>
)
 
export default GoogleApiWrapper({
  apiKey: ("AIzaSyBHq-A0EL3usDeqH5q8B635Rafxcguc0a8"),
  LoadingContainer: LoadingContainer
})(MapContainer)

/*
<InfoWindow onClose={this.onInfoWindowClose}>
	<div>
		<h1>{this.state.selectedPlace.name}</h1>
	</div>
	</InfoWindow>
*/