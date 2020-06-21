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

function animalsByIds(...ids) {
  // seu código aqui
  const animalId = [];
  data.animals.forEach((animal, index) => {
    if (animal.id === ids[index]) {
      animalId.push(animal);
    }
  });
  return animalId;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  return data.animals.filter(({ name }) => name === animal)[0]
  .residents.every(({ age: idade }) => idade > age);
}

console.log(animalsOlderThan('lions', 10));

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) return {};
  return data.employees.filter(({ firstName, lastName }) => (
    firstName === employeeName || lastName === employeeName
  ))[0];
}

console.log(employeeByName('Nigel'));

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  return Object.values(data.employees).some(({ managers }) => managers[0] === id);
}

console.log(isManager('0e7b460e-acf4-4e17-bcb3-ee472265db83'));

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(newEmployee);
}

function animalCount(species) { 
  // seu código aqui
  if (species === undefined) return
}

console.log(animalCount());

function entryCalculator(entrants) {
  // seu código aqui
  if (entrants.length === 0) return 0;
  let totalPrice = 0;
  entrants.forEach(({ Adult, Senior, Child }) => )
}

console.log(entryCalculator([]));

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
