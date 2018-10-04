import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

// import CSS file
import './edit.css'

class Edit extends PureComponent {

    state = {
        value: this.props.value
    }

    handleChange = (event) => {
        this.setState({value: event.target.value})
    }

    onSave = (event) => {
        event.preventDefault();
        this.props.onSave(this.state.value, this.props.title, this.props.index);
    }

    render() {
    
        return (
            <form 
                onSubmit = {this.onSave} 
                className = 'formField'
            >
                <input 
                    type = 'text' 
                    onChange = {this.handleChange}
                    value = {this.state.value}
                />
            </form>
        )
    }
}

Edit.propTypes = {
    value: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired
}

export default Edit;