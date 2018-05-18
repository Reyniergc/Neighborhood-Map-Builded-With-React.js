import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ListViewLocation extends Component {

	render() {
		const { listViewLocation, selectedMarker, filter } = this.props

		return (
			<div className="listViewLocation">
				<input type="text" className="form-control" aria-describedby="Maker Filter" placeholder="Filter" onChange={(event) => filter(event)} />

				<ul aria-label={"Places of interest"} aria-hidden="false" className="list-group">
					{listViewLocation.map((viewLocation, index) => (
						(viewLocation.visibility &&
							<li title={viewLocation.name} className="list-group-item " aria-hidden="false" aria-label={`link ${viewLocation.name}`} key={index} onClick={() => selectedMarker(index)}>
								{viewLocation.name}
							</li>
						)
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