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

		this.selectedMarker = this.selectedMarker.bind(this);
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
							position: [obj.location.lat, obj.location.lng],
							defaultAnimation: this.props.google.maps.Animation.DROP
						});
						break;
					}
				}
			}

			this.setState({ AddressListMarkers: this.state.AddressListMarkers });
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
		document.getElementById("modalHeader").innerHTML = this.state.AddressListMarkers[index].name;

		$('#myModal').modal({
			backdrop: 'static',
			keyboard: false
		});
	}

	selectedMarker(index) {
		var items = document.getElementsByClassName("list-group-item");
		items[index].className = "list-group-item active";

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
		return (
			<div className="container">
				<ListViewLocation
					listViewLocation={this.state.AddressListMarkers}
					selectedMarker={this.selectedMarker}
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
								animation={marker.defaultAnimation}
								visible={marker.visibility}
								name={marker.name}
								position={{lat: marker.position[0], lng: marker.position[1]}}
								onClick={() => this.selectedMarker(index)} />
						))}
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