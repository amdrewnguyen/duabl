import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { closeDropdown } from '../actions/ui_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    Component: state.ui.dropdown,
    modalOn: Boolean(state.ui.dropdown),
    options: state.ui.options,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => (
  {
    closeDropdown: () => dispatch(closeDropdown()),
  }
);

class Dropdown extends React.Component {
  render() {
    const { modalOn, Component, options, closeModal } = this.props;
    return modalOn ? (
      <div className="modal-overlay {options.overlayClass}"
           onClick={closeModal}>
        <Component {...options} closeModal={closeModal}/>
      </div>
    ) : (
      null
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Dropdown)
);
