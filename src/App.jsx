import { useState, useEffect } from "react";

import "./App.css";
import ContactForm from "./components/ContactForm";
import Filter from "./components/Filter";
import ContactsList from "./components/ContactsList";

const initialContacts = [
  { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
  { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
  { id: "id-3", name: "Eden Clements", number: "645-17-79" },
  { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
];

export default function App() {
  const [contacts, setContacts] = useState(initialContacts);

  const [filter, setFilter] = useState("");

  const handleAddContact = (contact) => {
    setContacts((prevContacts) => [...prevContacts, contact]);
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const handleDelete = (id) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id)
    );
  };

  useEffect(() => {
    const savedData = localStorage.getItem("userFormData");
    if (savedData) {
      const { contacts, filter } = JSON.parse(savedData);
      setContacts(contacts);
      setFilter(filter);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("userFormData", JSON.stringify({ contacts, filter }));

    return () => {
      localStorage.removeItem("userFormData");
    };
  }, [contacts, filter]);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <ContactForm onAddContact={handleAddContact} />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <h2 style={{ alignSelf: "start", marginBottom: "0" }}>Contacts</h2>
        <p style={{ alignSelf: "start" }}>Find contacts by name</p>
        <Filter value={filter} onChange={handleFilter} />
        <ContactsList contacts={filteredContacts} onDelete={handleDelete} />
      </div>
    </>
  );
}
