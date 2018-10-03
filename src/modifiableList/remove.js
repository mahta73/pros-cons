import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

// import CSS file
import './modifiableList';

class Remove extends PureComponent {
    handleDelete = () => {
        this.props.handleDelete(this.props.index, this.props.title);
    }

    render() {
        
        return (
            <div 
                className = 'deleteItem'
                onClick = {this.handleDelete}
            >
                Remove
            </div> 
        )
    }
}

Remove.propTypes = {
    handleDelete: PropTypes.func,
    index: PropTypes.number,
    title: PropTypes.string
}

export default Remove;