import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ListViewLocation extends Component {

	render() {
		const { listViewLocation, handleChange } = this.props

		return (
			<div className="listViewLocation">
				<ul>
					{listViewLocation.map((viewLocation, index) => (
						<li key={index} onClick={() => handleChange(index)}>
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