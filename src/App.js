import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import ListViewLocation from './ListViewLocation';

export class MapContainer extends Component {

	constructor(props) {
		super(props);

		this.state = {
			AddressListMarkers: [],
			showingInfoWindow: false,
			activeMarker: {},
			selectedPlace: {}
		};

		this.style = {
			height: "97%",
			width: "70%"
		}

		this.objMarkers = [
			{
				position: ["35.84915612671902", "14.495490252452312"]
			},
			{
				position: ["35.88168518370645", "14.39868219703174"]
			},
			{
				position: ["35.82763899628345", "14.442086219787598"]
			},
			{
				position: ["35.959100120885196", "14.424070468114488"]
			},
			{
				position: ["35.91916039970346", "14.490078312897754"]
			},
			{
				position: ["35.890281765367924", "14.508296901344293"]
			},
			{
				position: ["35.898661", "14.51379"]
			}
		]

		this.handleChange = this.handleChange.bind(this);
	}
	
	getAddressApi() {
		return fetch("https://api.foursquare.com/v2/venues/search?ll=35.85472104,14.48779873&categoryId=4bf58dd8d48988d181941735,4bf58dd8d48988d15e941735,4d4b7105d754a06374d81259,4bf58dd8d48988d13a941735,4bf58dd8d48988d1ed931735&client_id=LZL0304WQ5WHZCSUFSAPCVXF45DJNGGJAVDQGEL2J1DT04J5&client_secret=CZSMM1XIYLGFHZSZ3PMDXMOFSTHXE44ZWN4WFVK0IM0D4BK3&v=20180513")
		.then(res => res.json())
	}

	componentDidMount() {
		this.getAddressApi().then(data => {
			let index = 0;
			for (const marker of this.objMarkers) {
				for (const obj of data.response.venues) {			
					if ((marker.position[0] == obj.location.lat) && (marker.position[1] == obj.location.lng)) {
						this.state.AddressListMarkers.push({
							key: index++,
							visibility: true,
							name: obj.name.substring(0, 38),
							position: [obj.location.lat, obj.location.lng]
						});
						break;
					}
				}
			}

			this.setState({ AddressListMarkers: this.state.AddressListMarkers });
		})
	}

	onMarkerClick = (props, marker, e) => {
		this.setState({
			showingInfoWindow: true,
			activeMarker: marker,
			selectedPlace: props
		});
	}
	
	handleChange(event) {
		const indexObj = event.target.value;

		for (let markerObj of this.state.AddressListMarkers) {
			markerObj.visibility = (markerObj.key === parseInt(indexObj, 8)) ? true : false;
		}

		this.setState({   AddressListMarkers: this.state.AddressListMarkers });
	}

	render() {
		return (
			<div className="container">
				<ListViewLocation listViewLocation={this.state.AddressListMarkers} handleChange={this.handleChange} />
			
				<div id="google_map">
					<Map 
						google={this.props.google}
						style={this.style}
						initialCenter={{lat: 35.85472104, lng: 14.48779873}}
						zoom={12}>

						{this.state.AddressListMarkers.map((marker, index) => (
							<Marker
								key={index}
								visible={marker.visibility}
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
				</div>
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