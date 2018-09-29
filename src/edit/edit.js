import React, {Component} from 'react';

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
            <form onSubmit = {() => onSave(this.state.value)} style = {{display: 'inline'}}>
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