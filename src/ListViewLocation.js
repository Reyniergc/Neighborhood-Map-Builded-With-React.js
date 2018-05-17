import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ListViewLocation extends Component {

	render() {
		const { listViewLocation, selectedMarker, filter } = this.props
		return (
			<div className="listViewLocation">
				<input type="text" placeholder="Filter" onChange={(event) => filter(event)} />

				<ul aria-label={"Places of interest"} aria-hidden="false">
					{listViewLocation.map((viewLocation, index) => (
						(viewLocation.visibility &&
							<li aria-hidden="false" aria-label={`link ${viewLocation.name}`} key={index} onClick={() => selectedMarker(index)}>
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