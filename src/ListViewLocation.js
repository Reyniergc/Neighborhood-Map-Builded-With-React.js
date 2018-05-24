import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ListViewLocation extends Component {

	render() {
		const { listViewLocation, selectedMarker, filter } = this.props

		let arrListViewLocationFiltered = [];
		for (const marker of listViewLocation) {
			if (marker.visibility) {
				arrListViewLocationFiltered.push(marker);
			}
		}

		return (
			<div className="col-sm-3">
				<label htmlFor="searchPlace">Search a place by name:</label>
				<input id="searchPlace" type="text" className="form-control" aria-label="Search Place" aria-describedby="Maker Filter" placeholder="Type here..." onChange={(event) => filter(event)} autoFocus="autoFocus" />

				<ul role="listitem" aria-label={"Places of interest"} aria-hidden="false" className="list-group">
					{arrListViewLocationFiltered.map((viewLocation, index) => (
						<li title={viewLocation.name} className="list-group-item" tabIndex={index} aria-hidden="false" aria-label={`link ${viewLocation.name}`} key={viewLocation.key} onClick={() => selectedMarker(viewLocation.key, index)}>
							{viewLocation.name}
						</li>
					))}
				</ul>

				<div role="contentinfoerror" id="errorApi" className="alert alert-danger">
					<a href="#" className="close" data-dismiss="alert" aria-label="close" title="Close">×</a>
					<strong>Error API!</strong> <span id="messageErrorApi"></span>
				</div>
				
				<div role="contentinfo" className="alert alert-info" id="info">
					<p>Neighbourhood Map Project made by <strong>Reynier Téllez</strong></p>
					<p>This is the final project in the Udacity Front-End Nanodegree Program.</p>
					<p>
						<strong>Disclaimer:</strong> The data provided in the modals is provided by <strong><a href="https://developer.foursquare.com" target="_blank" title="FourSquare Api Documentation">FourSquare API</a></strong>.
					</p>
					<p>Copyright 2018. All rights reserved.</p>
				</div>
			</div>
		);
	}
}

ListViewLocation.propTypes = {
	listViewLocation: PropTypes.array.isRequired,
	selectedMarker: PropTypes.func.isRequired,
	filter: PropTypes.func.isRequired
};

export default ListViewLocation


/*
(viewLocation.visibility &&
	<li title={viewLocation.name} className="list-group-item " aria-hidden="false" aria-label={`link ${viewLocation.name}`} key={index} onClick={() => selectedMarker(index)}>
		{viewLocation.name}
	</li>
)
*/
