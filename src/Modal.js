import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as FontAwesomeIcons from 'react-icons/lib/fa';
import * as MdIcons from 'react-icons/lib/md';

class Modal extends Component {

	render() {
		const { closeModal } = this.props

		return (
			<div className="modal fade" id="myModal" role="dialog">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h4 className="modal-title" id="modalHeader">
								Modal Header
							</h4>
							<button type="button" className="close" data-dismiss="modal" onClick={() => closeModal()}>
								&times;
							</button>
						</div>

						<div className="modal-body">
							<p><MdIcons.MdAddLocation /> <b>Address: </b><span id="modalAddrress"></span></p>
							<p><FontAwesomeIcons.FaFlag /> <b>Country: </b><span id="modalCountry"></span></p>
							<p><MdIcons.MdLocationCity /> <b>City: </b><span id="modalCity"></span></p>
							<p><MdIcons.MdMarkunreadMailbox /> <b>Postal Code: </b><span id="modalPostalCode"></span></p>
							<p><FontAwesomeIcons.FaGlobe /> <b>Location Lat: </b><span id="modalLat"></span></p>
							<p><FontAwesomeIcons.FaGlobe /> <b>Location Lng: </b><span id="modalLng"></span></p>
						</div>

						<div className="modal-footer">
							<button type="button" className="btn btn-default" data-dismiss="modal" onClick={() => closeModal()}>
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Modal.propTypes = {
	closeModal: PropTypes.func.isRequired
};

export default Modal