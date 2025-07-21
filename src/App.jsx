import "./App.css";
import { Component } from "react";
import ContactForm from "./components/ContactForm";
import Filter from "./components/Filter";
import ContactsList from "./components/ContactsList";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [
        { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
        { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
        { id: "id-3", name: "Eden Clements", number: "645-17-79" },
        { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
      ],
      filter: "",
    };
  }

  handleAddContact = (contact) => {
    this.setState((prev) => ({
      contacts: [...prev.contacts, contact],
    }));
  };

  handleFilter = (e) => {
    this.setState({ filter: e.target.value });
  };
  handleDelete = (id) => {
    this.setState((prev) => ({
      contacts: prev.contacts.filter((contact) => contact.id !== id),
    }));
  };

  componentDidMount() {
    const savedData = localStorage.getItem("userFormData");
    if (savedData) {
      const { contacts, filter } = JSON.parse(savedData);
      this.setState({contacts, filter});
    }
  }

  componentDidUpdate(prevState) {
    if (
      prevState.contacts !== this.state.contacts ||
      prevState.contacts.filter !== this.state.contacts.filter
    ) {
      localStorage.setItem("userFormData", JSON.stringify({contacts: this.state.contacts, filter: this.state.filter}));
    }
  }

  render() {
    const filteredContacts = this.state.contacts.filter((contact) =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
    return (
      <>
        <div>
          <h2>Phonebook</h2>
          <ContactForm onAddContact={this.handleAddContact} />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2 style={{ alignSelf: "start", marginBottom: "0" }}>Contacts</h2>
          <p style={{ alignSelf: "start" }}>Find contacts by name</p>
          <Filter value={this.state.filter} onChange={this.handleFilter} />
          <ContactsList
            contacts={filteredContacts}
            onDelete={this.handleDelete}
          />
        </div>
      </>
    );
  }
}
