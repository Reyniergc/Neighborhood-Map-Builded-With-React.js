import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import ListViewLocation from './ListViewLocation';

export class MapContainer extends Component {

	constructor(props) {
		super(props);

		this.state = {
			showingInfoWindow: false,
			activeMarker: {},
			selectedPlace: {}
		};

		this.style = {
			float: "right",
			position: "relative",
			height: "100%",
			width: "70%"
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
				name: "Malta Free Port",
				position: ["35.81583", "14.53768409"]
			},
			{
				title: "Popeye Village.",
				name: "Popeye Village",
				position: ["35.96113379", "14.34150067"]
			},
			{
				title: "Café Del Mar Malta.",
				name: "Café Del Mar Malta",
				position: ["35.95905948", "14.42386195"]
			},
			{
				title: "St. Paul's Catacombs.",
				name: "St. Paul's Catacombs",
				position: ["35.88117638", "14.39832799"]
			}
		]
	}

	onMarkerClick = (props, marker, e) => {
		this.setState({
			showingInfoWindow: true,
			activeMarker: marker,
			selectedPlace: props
		});

		console.log(marker);
	}

	render() {
		return (
			<div>
				<Map 
					google={this.props.google}
					style={this.style}
					initialCenter={{lat: 35.85472104, lng: 14.48779873}}
					zoom={12}>

					{this.objMarkers.map((marker, index) => (
						<Marker
							key={index}
							title={marker.title}
							name={marker.name}
							position={{lat: marker.position[0], lng: marker.position[1]}}
							onClick={this.onMarkerClick} />
					))}
					
					<InfoWindow
						marker={this.state.activeMarker}
						visible={this.state.showingInfoWindow}>
						<div>
							<h1>{this.state.selectedPlace.name}</h1>
							<p>{this.state.selectedPlace.title}</p>
						</div>
					</InfoWindow>					
				</Map>

				<ListViewLocation listViewLocation={this.objMarkers} />
			</div>
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