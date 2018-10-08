import React, {Component} from 'react';
import PropTypes from 'prop-types';

// import CSS file
import './modifiableList.css';

// import the context provider and consumer
import { ContextCunsomer } from '../context/context';

class Element extends Component {
    
    render() {
        return (
            <ContextCunsomer>
                {
                    data =>
                    <span
                        className = 'editableItem'
                        onClick = {() => data.editHandle(this.props.element, this.props.index, this.props.title)}
                    >   
                        {this.props.element}
                    </span> 
                }
            </ContextCunsomer>
        )
    }
}

Element.propTypes = {
    element: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
}

export default Element;