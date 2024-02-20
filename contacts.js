const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading contacts file:", err);
      return;
    }
    try {
      const contacts = JSON.parse(data);
      console.log("Contacts:");
      console.table(contacts);
    } catch (error) {
      console.error("Error parsing contacts file:", error);
    }
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading contacts file:", err);
      return;
    }
    try {
      const contacts = JSON.parse(data);
      const contact = contacts.find((c) => c.id === contactId);
      if (contact) {
        console.log("Contact found:");
        console.log(contact);
      } else {
        console.log("Contact not found.");
      }
    } catch (error) {
      console.error("Error parsing contacts file:", error);
    }
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading contacts file:", err);
      return;
    }
    try {
      let contacts = JSON.parse(data);
      const updatedContacts = contacts.filter((c) => c.id !== contactId);
      if (contacts.length === updatedContacts.length) {
        console.log("Contact not found.");
        return;
      }
      fs.writeFile(
        contactsPath,
        JSON.stringify(updatedContacts, null, 2),
        (err) => {
          if (err) {
            console.error("Error writing contacts file:", err);
            return;
          }
          console.log("Contact removed successfully.");
        }
      );
    } catch (error) {
      console.error("Error parsing contacts file:", error);
    }
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
};
