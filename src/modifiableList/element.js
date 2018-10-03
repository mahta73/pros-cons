import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

// import CSS file
import './modifiableList.css';

class Element extends Component {
    editHandle = () => {
        this.props.editHandle(this.props.element, this.props.index, this.props.title);
    }

    render() {
        return (
            <span
                className = 'editableItem'
                onClick = {this.editHandle}
            >   
                {this.props.element}
            </span>
        )
    }
}

Element.propTypes = {
    editHandle: PropTypes.func,
    element: PropTypes.string,
    index: PropTypes.number,
    title: PropTypes.string
}

export default Element;