import React, { Component } from 'react';
import Form from './Form/Form';
import ContactList from './ContactList/ContactList';
import ContactFilter from './ContactFilter/ContactFilter';
import filterContact from '../utils/filterContact';
import { v4 } from 'uuid';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  changeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  addContact = contact => {
    const contactToAdd = {
      id: v4(),
      ...contact,
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, contactToAdd],
    }));
  };

  deleteContact = ({ target: { name } }) => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts.filter(item => item.id !== name)],
    }));
  };

  componentDidMount() {
    const getLocalStorageContacts = localStorage.getItem('Contacts');
    if (getLocalStorageContacts) {
      this.setState({ contacts: JSON.parse(getLocalStorageContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('Contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = filterContact(contacts, filter);

    return (
      <>
        <h1>Phonebook</h1>
        <Form onAddContact={this.addContact} contacts={contacts} />

        <h2>Contacts</h2>
        {contacts.length >= 2 && (
          <ContactFilter value={filter} onChangeFilter={this.changeFilter} />
        )}
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.deleteContact}
        />
      </>
    );
  }
}
