import { useState, useEffect } from "react";

export default function ContactForm({ onAddContact }) {
  const [name, setName] = useState("");
  const [number,setNumber] = useState("");

  const handleChangeName = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleChangeNumber = (e) => {
    e.preventDefault();
    setNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newContact = {
      id: Math.random().toString(36).slice(2) + Date.now(),
      name: name.trim(),
      number: number.trim(),
    };
    onAddContact(newContact)
    setName("");
    setNumber("");
  };

    return (
      <>
        <form onSubmit={handleSubmit}  style={{display: "flex", flexDirection: "column", gap: "20px", border: "1px solid black", padding: "20px"}}>

          <label style={{display:"flex", justifyContent:"flex-start"}}>Name</label>
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={handleChangeName}
            style={{width: "200px", }}
          />
          <label style={{display:"flex", justifyContent:"flex-start"}}>Number</label>
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={handleChangeNumber}
            value={number}
            style={{width: "200px"}}
          />
          <button type="submit" style={{border: "1px solid black"}}>Add contact</button>
        </form>
      </>
    );
  }

