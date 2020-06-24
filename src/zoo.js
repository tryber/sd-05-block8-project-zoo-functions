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
const { animals, employees, prices, hours } = require('./data');

function animalsByIds(...ids) {
  if (!ids) return [];
  return ids.map(id => animals.find(animal => animal.id === id));
}

function animalsOlderThan(animal, age) {
  const whichAnimal = animals.find(animalData => animalData.name === animal);
  const isOlder = whichAnimal.residents.every(animalData => animalData.age >= age);
  return isOlder;
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees.find(
  employeeData =>
  employeeData.firstName === employeeName || employeeData.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some(
  employeeData => employeeData.managers.find(manager => manager === id) === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (!species) {
    const allAnimals = animals.reduce((acc, { name, residents }) => {
      acc[name] = residents.length;
      return acc;
    }, {});
    return allAnimals;
  }
  const animalName = animals.find(({ name }) => name === species);
  return animalName.residents.length;
}

function entryCalculator(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) return 0;
  const people = Object.keys(prices);
  return people.reduce((acc, values) => acc + (prices[values] * entrants[values]), 0);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const completeSchedule = {};
  Object.keys(hours).forEach((day) => {
    if (hours[day].open === hours[day].close) {
      completeSchedule[day] = 'CLOSED';
    } else {
     completeSchedule[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`
    }});
  return dayName ? { [dayName]:completeSchedule[dayName] } : completeSchedule;
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
