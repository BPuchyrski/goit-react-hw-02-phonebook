import { Component } from 'react';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Doctor Doom', number: '459-12-56' },
      { id: 'id-2', name: 'Thanos', number: '443-89-12' },
      { id: 'id-3', name: 'Ultron', number: '645-17-79' },
      { id: 'id-4', name: 'Kang', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = e => {
    e.preventDefault();
    const { contacts } = this.state;
    const form = e.currentTarget;
    const name = form.elements.name.value;
    const number = form.elements.number.value;
    const index = contacts.findIndex(contact => contact.number === number);
    if (index === -1) {
      const newContacts = [...contacts];
      const id = nanoid();
      newContacts.push({ id: { id }, name: name, number: number });
      this.setState({ contacts: newContacts });
    } else {
      alert(`${name} is already in contacts`);
    }
  };

  removeContact = e => {
    const { contacts } = this.state;
    const newContacts = [...contacts];
    const number = e.currentTarget.attributes.number.value;
    const index = contacts.findIndex(contact => contact.number === number);
    newContacts.splice(index, 1);
    this.setState({ contacts: newContacts });
  };

  handleFilterChange = e => {
    const searchTerm = e.target.value;
    const { contacts } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.setState({ filter: filteredContacts });
  };

  render() {
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm add={this.addContact} />
        <h2>Contacts</h2>
        <Filter filter={this.handleFilterChange} />
        <ContactList
          contacts={this.state.contacts}
          delite={this.removeContact}
          filter={this.state.filter}
        />
      </div>
    );
  }
}
