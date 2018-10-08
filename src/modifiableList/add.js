import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

// import the context provider and consumer
import { ContextCunsomer } from '../context/context';

// import CSS file
import './add.css';

class Add extends PureComponent {

    state = {
        value: '',
    }

    handleChange = (event) => {
        this.setState({value: event.target.value});
    }

    render() {
        const {
            title
        } = this.props;
        
        const {
            value
        } = this.state;
        return (
            <ContextCunsomer>
                {
                    data => 
                        <form 
                        className = 'container'
                        onSubmit = {(e) => {
                            e.preventDefault();
                            data.handleClick(this.state.value, this.props.title);
                            this.setState({value: ''});
                        }}
                        >
                            <input 
                                type = 'text'
                                className = 'addInput' 
                                placeholder = {`New ${title}`}
                                value = {value}
                                onChange = {this.handleChange}
                            />

                            <div  
                                className = 'addButton'
                                onClick = {(e) => {
                                    e.preventDefault();
                                    data.handleClick(this.state.value, this.props.title);
                                    this.setState({value: ''});
                                }}
                            >
                                +
                            </div>
                        </form>
                }
            </ContextCunsomer>
        )
    }
}

Add.propTypes = {
    handleClick: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
}
export default Add;