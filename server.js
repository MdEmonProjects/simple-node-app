const express = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
var cors = require('cors')
const app = express();
const PORT = 4000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());
// Endpoint to get data from JSON file
app.get("/data", (req, res) => {
  fs.readFile("data.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(JSON.parse(data));
  });
});

// Endpoint to add data to JSON file
// Endpoint to add data to JSON file
app.post('/data', (req, res) => {
  const newData = req.body;
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    let existingData = JSON.parse(data);
    let found = false;
    for (let i = 0; i < existingData.length; i++) {
      if (existingData[i].key === newData.key) {
        existingData[i].age = newData.age;
        found = true;
        break;
      }
    }
    if (!found) {
      // newData.key = uuidv4(); // Generate a unique ID
      existingData.push(newData);
    }
    fs.writeFile('data.json', JSON.stringify(existingData), err => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.status(201).send(newData);
    });
  });
});


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
