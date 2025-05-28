const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Handle form submission and append details to contact_details.txt
app.post('/save-contact', (req, res) => {
  const { name, email, phone, address } = req.body;
  const content = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address}\n---\n`;
  const filePath = path.join(__dirname, 'contact_details.txt');

  fs.appendFile(filePath, content, err => {
    if (err) {
      console.error(err);
      return res.status(500).send('Failed to save data');
    }
    res.send('Details saved successfully');
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
