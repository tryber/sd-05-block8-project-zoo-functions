/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local",
    "varsIgnorePattern": "data"
  }
]
*/

const data = require('./data');
const { animals, employees } = require('./data');

function animalsByIds(...ids) {
  // seu código aqui
  if (ids === undefined) {
    return [];
  }
  const animalsById = [];
  ids.forEach((id) => {
    animalsById.push(...animals.filter(animal => animal.id === id));
  });
  return animalsById;
}

function animalsOlderThan(animalsName, age) {
  // seu código aqui
  const animalsOlder = animals.find(animal => animal.name === animalsName).residents.every(animal => animal.age > age);
  return animalsOlder;
}

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) {
    return [];
  }
  const employeeNameFound = employees.find(employee => employee.firstName === employeeName || employee.lastName === employeeName);
  return employeeNameFound;
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

function isManager(id) {
  // seu código aqui
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function animalCount(species) {
  // seu código aqui
}

function entryCalculator(entrants) {
  // seu código aqui
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu código aqui
}

function employeeCoverage(idOrName) {
  // seu código aqui
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalsByIds,
  employeeByName,
  employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
