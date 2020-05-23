import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './form.module.css';

export default class Form extends Component {
  static propTypes = {
    onAddContact: PropTypes.func.isRequired,
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
  };

  state = {
    name: '',
    number: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.name !== '' && this.state.number !== '') {
      if (
        this.props.contacts.find(
          contact => contact.name === this.state.name,
        ) === undefined
      ) {
        this.props.onAddContact({ ...this.state });
        this.setState({ name: '', number: '' });
      } else {
        alert(`${this.state.name} is alredy in contacts`);
      }
    } else {
      alert('No data entered, try again');
    }
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Number
            <input
              type="number"
              name="number"
              value={this.state.number}
              onChange={this.handleChange}
            />
          </label>
          <button type="submit">Add Contact</button>
        </form>
      </>
    );
  }
}
