import React, {Component} from 'react';
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
    editHandle: PropTypes.func.isRequired,
    element: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
}

export default Element;