import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ListViewLocation extends Component {

	render() {
		const { listViewLocation } = this.props

		return (
			<div>
				<ul>
					{listViewLocation.map((viewLocation, index) => (
						<li key={index}>
							{viewLocation.name}
						</li>
					))}
				</ul>
			</div>
		);
	}
}

ListViewLocation.propTypes = {
	listViewLocation: PropTypes.array.isRequired
};

export default ListViewLocation