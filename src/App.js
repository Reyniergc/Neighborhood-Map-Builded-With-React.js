import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import ListViewLocation from './ListViewLocation';

export class MapContainer extends Component {

	constructor(props) {
		super(props);

		this.state = {
			AddressList: [],
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
				title: "Restaurant",
				name: "Restaurant",
				position: ["35.81583", "14.53768409"]
			},
			{
				title: "Museum.",
				name: "Museum",
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

		this.handleChange = this.handleChange.bind(this);
	}
	
	getAddressApi() {
		return fetch("https://api.foursquare.com/v2/venues/search?ll=35.85472104,14.48779873&categoryId=4bf58dd8d48988d181941735,4bf58dd8d48988d15e941735,4d4b7105d754a06374d81259,4bf58dd8d48988d13a941735,4bf58dd8d48988d1ed931735&client_id=LZL0304WQ5WHZCSUFSAPCVXF45DJNGGJAVDQGEL2J1DT04J5&client_secret=CZSMM1XIYLGFHZSZ3PMDXMOFSTHXE44ZWN4WFVK0IM0D4BK3&v=20180513")
		.then(res => res.json())
	}

	componentDidMount() {
		this.getAddressApi().then(data => {
			this.setState({ AddressList: this.state.AddressList.concat(data.response.venues) });
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
		const index = event.target.value;
	}

	render() {
		console.log(this.state.AddressList);
		return (
			<div className="container">
				<ListViewLocation listViewLocation={this.objMarkers} handleChange={this.handleChange} />
			
				<div id="google_map">
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