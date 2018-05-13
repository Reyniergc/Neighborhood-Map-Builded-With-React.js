import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ListViewLocation extends Component {

	render() {
		const { listViewLocation, handleChange } = this.props

		return (
			<div className="listViewLocation">
				<select onChange={(event) => handleChange(event)}>
					{listViewLocation.map((viewLocation, index) => (
						<option key={index} value={index}>
							{viewLocation.name}
						</option>
					))}
				</select>
			</div>
		);
	}
}

ListViewLocation.propTypes = {
	listViewLocation: PropTypes.array.isRequired,
	handleChange: PropTypes.func.isRequired
};

export default ListViewLocation