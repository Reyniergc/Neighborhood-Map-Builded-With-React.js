import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import ListViewLocation from './ListViewLocation';
import Modal from './Modal';
import * as GoogleMapsAPI from './utils/GoogleMapsAPI';
import $ from 'jquery';

export class MapContainer extends Component {

	constructor(props) {
		super(props);

		this.state = {
			zoom: 12,
			defaultAnimation: this.props.google.maps.Animation.DROP,
			AddressListMarkers: [],
			showingInfoWindow: false,
			activeMarker: {},
			selectedPlace: {},
			initialCenter: {lat: 35.85472104, lng: 14.48779873}
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
		this.filter = this.filter.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	componentDidMount() {
		GoogleMapsAPI.getAddressApi().then(data => {
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
			defaultAnimation: null,
			showingInfoWindow: true,
			activeMarker: marker,
			selectedPlace: props
		});
	}

	closeModal() {
		this.setState({ zoom: 11 });
	}

	openModal(index) {
		document.getElementById("modalHeader").innerHTML = this.state.AddressListMarkers[index].name;
		$('#myModal').modal({
			backdrop: 'static',
			keyboard: false
		});
	}

	handleChange(index) {
		for (let markerObj of this.state.AddressListMarkers) {
			markerObj.visibility = (markerObj.key === parseInt(index, 8)) ? true : false;
		}

		this.setState({
			zoom: 14,
			showingInfoWindow: false,
			AddressListMarkers: this.state.AddressListMarkers,
			initialCenter: {
				lat: this.state.AddressListMarkers[index].position[0],
				lng: this.state.AddressListMarkers[index].position[1]
			},
			defaultAnimation: this.props.google.maps.Animation.BOUNCE
		});

		this.openModal(index);
	}
	
	filter(event) {
		const value = event.target.value;

		for (const marker of this.state.AddressListMarkers) {
			marker.visibility = (marker.name.toLowerCase().indexOf(value.toLowerCase()) !== -1) ? true : false;
		}

		this.setState({
			defaultAnimation: null,
			AddressListMarkers: this.state.AddressListMarkers
		});
	}

	render() {
		return (
			<div className="container">
				<ListViewLocation
					listViewLocation={this.state.AddressListMarkers}
					handleChange={this.handleChange}
					filter={this.filter} />
			
				<div id="google_map">
					<Map
						google={this.props.google}
						style={this.style}
						center={{lat: this.state.initialCenter.lat, lng: this.state.initialCenter.lng}}
						zoom={this.state.zoom}>

						{this.state.AddressListMarkers.map((marker, index) => (
							<Marker
								key={index}
								animation={this.state.defaultAnimation}
								visible={marker.visibility}
								name={marker.name}
								position={{lat: marker.position[0], lng: marker.position[1]}}
								onClick={this.onMarkerClick} />
						))}

						<InfoWindow
							marker={this.state.activeMarker}
							visible={this.state.showingInfoWindow}>
							<div>
								<h1>{this.state.selectedPlace.name}</h1>
							</div>
						</InfoWindow>					
					</Map>
				</div>

				<Modal closeModal={this.closeModal} />
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