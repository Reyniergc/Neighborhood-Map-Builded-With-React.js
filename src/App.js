import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
	constructor(props) {
		super(props);

		this.style = {
			width: '100%',
			height: '100%'
		}
		
		this.objMarkers = [
			{
				title: "Malta International Airport.",
				name: "International Airport",
				position: ["35.85142254", "14.49219836"]
			},
			{
				title: "Hagar Kin Template.",
				name: "Hagar Kin Template",
				position: ["35.82908772", "14.44275989"]
			},
			{
				title: "Malta Free Port.",
				name: "",
				position: ["35.81583", "14.53768409"]
			},
			{
				title: "Popeye Village.",
				name: "Popeye",
				position: ["35.96113379", "14.34150067"]
			},
			{
				title: "Café Del Mar Malta.",
				name: "Soma",
				position: ["35.95905948", "14.42386195"]
			}
			,
			{
				title: "St. Paul's Catacombs.",
				name: "St. Paul's Catacombs",
				position: ["35.88117638", "14.39832799"]
			}
		]
	}

	render() {
		return (
			<Map 
				google={this.props.google}
				style={this.style}
				initialCenter={{lat: 35.85472104, lng: 14.48779873}}
				zoom={11}>

				{this.objMarkers.map((marker, index) => (
					<Marker
						key={index}
						title={marker.title}
						name={marker.name}
						position={{lat: marker.position[0], lng: marker.position[1]}} />
				))}
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