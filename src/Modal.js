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
							<p><MdIcons.MdAddLocation /> Address: <span id="modalAddrress"></span></p>
							<p><FontAwesomeIcons.FaFlag /> Country: <span id="modalCountry"></span></p>
							<p><MdIcons.MdLocationCity /> City: <span id="modalCity"></span></p>
							<p><MdIcons.MdMarkunreadMailbox /> Postal Code: <span id="modalPostalCode"></span></p>
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