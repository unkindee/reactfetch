import React, { Component } from 'react';
import './Form.css';
import axios from 'axios';

class Form extends Component {
    constructor(props) {
      super(props);
      this.state = {
        message: '',
        name: '',
        email: '',
        success: '',
        errors: ''
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
  
    handleSubmit(event) {
      event.preventDefault();
      var data = {
        name: this.state.name,
        email: this.state.email,
        message: this.state.message
      }
      var formData = new FormData();
      for ( var key in data ) {
        formData.append(key, data[key]);
      }
      axios.post('/test/process.php', formData)
      .then((res) => {
        this.setState({
            success: res.data.success,
            errors: res.data.errors,
            message: res.data.success ? '' : this.state.message,
            name: res.data.success ? '' : this.state.name,
            email: res.data.success ? '' : this.state.email
        });
      })
      .catch((err) => {
        console.log(err);
      })
    }
  
    render() {
      return (
        <div className="form-wrapper" id="create-course-form">
            <form onSubmit={this.handleSubmit}>
                <div className="input-wrapper">
                  {this.state.errors.name &&
                    <div className="error">
                      <span className="error-message">{this.state.errors.name}</span>
                      <span className="close">&times;</span>
                    </div>
                  }
                  <input value={this.state.name} onChange={this.handleChange} type="text" name="name" placeholder="Name" />
                </div>
                <div className="input-wrapper">
                  {this.state.errors.email &&
                    <div className="error">
                      <span className="error-message">{this.state.errors.email}</span>
                      <span className="close">&times;</span>
                    </div>
                  }
                  <input value={this.state.email} onChange={this.handleChange} type="text" name="email" placeholder="Email" />
                </div>
                <div className="textarea-wrapper">
                  <textarea value={this.state.message} onChange={this.handleChange} name="message" placeholder="Message" />
                  {this.state.errors.message &&
                    <div className="error">
                      <span className="error-message">{this.state.errors.message}</span>
                      <span className="close">&times;</span>
                    </div>
                  }
                </div>
                <div className="submit-wrapper">
                  <button type="submit">Send</button>
                </div>
            </form>
            {this.state.success &&
              <div className="success-message">The message has been sent!</div>
            }
        </div>
      );
    }
  }

export default Form