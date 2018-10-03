import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

// import CSS file
import './add.css';

class Add extends PureComponent {

    state = {
        value: '',
    }

    handleChange = (event) => {
        this.setState({value: event.target.value});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.handleClick(this.state.value, this.props.title);
        this.setState({value: ''});
    }

    render() {
        const {
            title
        } = this.props;
        
        return (
            <form 
                className = 'container'
                onSubmit = {this.handleSubmit}
            >
                <input 
                    type = 'text'
                    className = 'addInput' 
                    placeholder = {`New ${title}`}
                    value = {this.state.value}
                    onChange = {this.handleChange}
                />

                <div  
                    className = 'addButton'
                    onClick = {this.handleSubmit}
                >
                    +
                </div>
            </form>
        )
    }
}

Add.propTypes = {
    handleClick: PropTypes.func,
    title: PropTypes.string,
}
export default Add;