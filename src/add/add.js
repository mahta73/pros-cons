import React, {Component} from 'react';

// import CSS file
import './add.css';

class Add extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: ''
        }
    }

    handleChange = (event) => {
        this.setState({value: event.target.value});
    }

    render() {
        const {
            placeHolder,
            handleClick
        } = this.props;

        return (
            <form 
                className = 'container'
            >
                <input 
                    type = 'text'
                    className = 'addInput' 
                    placeholder = {`New ${placeHolder}`}
                    value = {this.state.value}
                    onChange = {this.handleChange}
                />

                <div  
                    className = 'addButton'
                    onClick = {() => {
                        handleClick(this.state.value);
                        this.setState({value: ''});
                    }}
                >
                    +
                </div>
            </form>
        )
    }
}

export default Add;