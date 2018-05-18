import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import ListViewLocation from './ListViewLocation';
import Modal from './Modal';
import * as GoogleMapsAPI from './utils/GoogleMapsAPI';
import $ from 'jquery';

export class MapContainer extends Component {

	constructor(props) {
		super(props);

		this.state = {
			zoom: 12,
			AddressListMarkers: [],
			initialCenter: {lat: 35.85472104, lng: 14.48779873}
		};

		this.style = {
			height: "97%",
			width: "75%"
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

		this.selectedMarker = this.selectedMarker.bind(this);
		this.filter = this.filter.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	componentDidMount() {
		GoogleMapsAPI.getAddressApi().then(data => {
			if (data.meta.code === 200) {
				let index = 0;
				for (const marker of this.objMarkers) {
					for (const obj of data.response.venues) {		
						if ((marker.position[0] == obj.location.lat) && (marker.position[1] == obj.location.lng)) {
							this.state.AddressListMarkers.push({
								key: index++,
								visibility: true,
								name: obj.name.substring(0, 38),
								address: (obj.location.address) ? obj.location.address : "Unknown",
								country: obj.location.country,
								city: obj.location.city,
								postalCode: obj.location.postalCode,
								position: [obj.location.lat, obj.location.lng],
								defaultAnimation: this.props.google.maps.Animation.DROP
							});
							break;
						}
					}
				}

				this.setState({ AddressListMarkers: this.state.AddressListMarkers });
			}
		})
	}

	closeModal() {
		var items = document.getElementsByClassName("list-group-item");

		for (let index = 0; index < items.length; index++) {
			items[index].className = "list-group-item";
		}

		this.setState({ zoom: 11 });
	}

	openModal(index) {
		const headerTitle = this.state.AddressListMarkers[index].name;
		const address = this.state.AddressListMarkers[index].address;
		const country = this.state.AddressListMarkers[index].country;
		const city = this.state.AddressListMarkers[index].city;
		const postalCode = this.state.AddressListMarkers[index].postalCode;
		const locationLat = this.state.AddressListMarkers[index].position[0];
		const locationLng = this.state.AddressListMarkers[index].position[1];

		document.getElementById("modalHeader").innerHTML = headerTitle;
		document.getElementById("modalAddrress").innerHTML = address;
		document.getElementById("modalCountry").innerHTML = country;
		document.getElementById("modalCity").innerHTML = city;
		document.getElementById("modalPostalCode").innerHTML = postalCode;
		document.getElementById("modalLat").innerHTML = locationLat;
		document.getElementById("modalLng").innerHTML = locationLng;

		$('#myModal').modal({
			backdrop: 'static',
			keyboard: false
		});
	}

	selectedMarker(index, indexDiffLength) {
		var items = document.getElementsByClassName("list-group-item");

		// We can use the index only if both array have the same length.
		if (items.length === this.state.AddressListMarkers.length) {
			items[index].className = "list-group-item active";
		}
		else {
			items[indexDiffLength].className = "list-group-item active";
		}

		this.setState(state => {
			for (let markerObj of this.state.AddressListMarkers) {
				markerObj.defaultAnimation = (markerObj.key === index) ? this.props.google.maps.Animation.BOUNCE : null;
			}

			return {
				zoom: 14,
				AddressListMarkers: state.AddressListMarkers,
				initialCenter: {
					lat: this.state.AddressListMarkers[index].position[0],
					lng: this.state.AddressListMarkers[index].position[1]
				}
			}
		});

		this.openModal(index);
	}

	filter(event) {
		const value = event.target.value;

		for (const marker of this.state.AddressListMarkers) {
			marker.visibility = (marker.name.toLowerCase().indexOf(value.toLowerCase()) !== -1) ? true : false;
			marker.defaultAnimation = null;
		}

		this.setState({
			AddressListMarkers: this.state.AddressListMarkers
		});
	}

	render() {
		let arrListViewLocationFiltered = [];
		for (const marker of this.state.AddressListMarkers) {
			if (marker.visibility) {
				arrListViewLocationFiltered.push(marker);
			}
		}

		return (
			<div className="container-fluid">
				<div className="row">
					<ListViewLocation
						listViewLocation={this.state.AddressListMarkers}
						selectedMarker={this.selectedMarker}
						filter={this.filter} />
				
					<div className="w-75" id="google_map">
						<Map
							google={this.props.google}
							style={this.style}
							center={{lat: this.state.initialCenter.lat, lng: this.state.initialCenter.lng}}
							zoom={this.state.zoom}>

							{arrListViewLocationFiltered.map((marker, index) => (
								<Marker
									key={marker.key}
									animation={marker.defaultAnimation}
									name={marker.name}
									position={{lat: marker.position[0], lng: marker.position[1]}}
									onClick={() => this.selectedMarker(marker.key, index)} />
							))}
						</Map>
					</div>

					<Modal closeModal={this.closeModal} />
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