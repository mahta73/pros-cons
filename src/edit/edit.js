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

    render() {
        const {
            onSave,
        } = this.props;
        
        return (
            <form 
                onSubmit = {(event) => onSave(event, this.state.value)} 
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
    value: PropTypes.string,
    onSave: PropTypes.func
}

export default Edit;