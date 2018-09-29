import React, {Component} from 'react';

// import CSS file
import './edit.css'

class Edit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value
        }
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

export default Edit;