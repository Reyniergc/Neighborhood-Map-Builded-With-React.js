import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ListViewLocation extends Component {

	render() {
		const { listViewLocation, handleChange } = this.props

		return (
			<div className="listViewLocation">
				<ul aria-label={"Places of interest"} aria-hidden="false">
					{listViewLocation.map((viewLocation, index) => (
						<li aria-hidden="false" aria-label={`link ${viewLocation.name}`} key={index} onClick={() => handleChange(index)}>
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
	handleChange: PropTypes.func.isRequired
};

export default ListViewLocation