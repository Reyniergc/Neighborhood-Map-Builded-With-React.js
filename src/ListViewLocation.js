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
				<input type="text" className="form-control" aria-describedby="Maker Filter" placeholder="Search a place by name..." onChange={(event) => filter(event)} autoFocus="autoFocus" />

				<ul aria-label={"Places of interest"} aria-hidden="false" className="list-group">
					{arrListViewLocationFiltered.map((viewLocation, index) => (
						<li title={viewLocation.name} className="list-group-item " aria-hidden="false" aria-label={`link ${viewLocation.name}`} key={viewLocation.key} onClick={() => selectedMarker(viewLocation.key, index)}>
							{viewLocation.name}
						</li>
					))}
				</ul>
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
