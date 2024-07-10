const fs = require('fs');
const path = require('path');
const jsonpath = require('jsonpath');

const dataPath = path.join(__dirname, '../data/operating_systems.json');

// Helper function to read data from the JSON file
const readData = () => {
  const jsonData = fs.readFileSync(dataPath);
  return JSON.parse(jsonData);
};

// Helper function to write data to the JSON file
const writeData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// Get all operating systems
exports.getAllOS = (req, res) => {
  const data = readData();
  res.json(data.operating_systems);
};

// Get an operating system by ID
exports.getOSById = (req, res) => {
  const data = readData();
  const os = data.operating_systems.find(os => os.id === parseInt(req.params.id));
  if (!os) {
    return res.status(404).send('Operating system not found');
  }
  res.json(os);
};

// Create a new operating system
exports.createOS = (req, res) => {
  const data = readData();
  const newOS = {
    id: data.operating_systems.length + 1,
    ...req.body
  };
  data.operating_systems.push(newOS);
  writeData(data);
  res.status(201).json(newOS);
};

// Update an existing operating system
exports.updateOS = (req, res) => {
  const data = readData();
  const index = data.operating_systems.findIndex(os => os.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send('Operating system not found');
  }
  const updatedOS = { ...data.operating_systems[index], ...req.body };
  data.operating_systems[index] = updatedOS;
  writeData(data);
  res.json(updatedOS);
};

// Delete an operating system
exports.deleteOS = (req, res) => {
  const data = readData();
  const index = data.operating_systems.findIndex(os => os.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send('Operating system not found');
  }
  data.operating_systems.splice(index, 1);
  writeData(data);
  res.status(204).send();
};

// Get the newest and oldest OS names
exports.getNewestAndOldestOS = (req, res) => {
  const data = readData();
  const operatingSystems = data.operating_systems;

  const oldestOS = operatingSystems.reduce((oldest, os) => new Date(os.initial_release) < new Date(oldest.initial_release) ? os : oldest);
  const newestOS = operatingSystems.reduce((newest, os) => new Date(os.initial_release) > new Date(newest.initial_release) ? os : newest);

  res.json({
    oldest: {
        name: oldestOS.name,
        initial_release: oldestOS.initial_release,
    },
    newest: {
        name: newestOS.name,
        initial_release: newestOS.initial_release
        }
    });
};

// List OS with GNU GPL license
exports.listGNU_GPL_OS = (req, res) => {
  const data = readData();
  const gnuGplOS = jsonpath.query(data, `$..operating_systems[?(@.license_type==="GNU GPL")]`);
  res.json(gnuGplOS);
};

// List OS with owner's license
exports.listProprietaria = (req, res) => {
  const data = readData();
  const proprietariaOS = jsonpath.query(data, `$..operating_systems[?(@.license_type==="Proprietária")]`);
  res.json(proprietariaOS);
};

// Get the difference in years between the newest and oldest OS
exports.getYearDifference = (req, res) => {
  const data = readData();
  const operatingSystems = data.operating_systems;

  const oldestOS = operatingSystems.reduce((oldest, os) => new Date(os.initial_release) < new Date(oldest.initial_release) ? os : oldest);
  const newestOS = operatingSystems.reduce((newest, os) => new Date(os.initial_release) > new Date(newest.initial_release) ? os : newest);

  const oldestYear = new Date(oldestOS.initial_release).getFullYear();
  const newestYear = new Date(newestOS.initial_release).getFullYear();

  res.json({
    year_difference: newestYear - oldestYear
  });
};

// List all developers
exports.listAllDevelopers = (req, res) => {
  const data = readData();
  const developers = jsonpath.query(data, `$..developer`);
  res.json(developers);
};
