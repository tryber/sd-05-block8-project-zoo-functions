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
  const result = [];
  if(ids.length === 0) return result;
  const {animals} = data;
  animals.forEach(animal => {
    ids.forEach(id => {
      if(id === animal.id) result.push(animal);
    });
  });
  return result;
}

function animalsOlderThan(animal, age) {
  const {animals} = data;
  return animals.filter(({ name }) => name === animal)[0]
  .residents
  .every(({ age : idade }) => idade >= age);
}

function employeeByName(employeeName) {
  const result = [];
  if(!employeeName) return result;
  const {employees} = data;
  return employees.filter(({firstName, lastName}) => {
    return firstName === employeeName || lastName === employeeName;
  })[0];
}

function createEmployee(personalInfo, associatedWith) {
  return {...personalInfo, ...associatedWith};
}

function isManager(id) {
  const {employees} = data;
  return employees.some(({managers}) => managers.indexOf(id) !== -1);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const {employees} = data;
  employees.push({id, firstName, lastName, managers, responsibleFor});
}

function animalCount(species) {
  const {animals} = data;
  const result = {};

  if(species) {
    return animals.find(({name}) => name === species).residents.length;
  } 

  animals.map(({name, residents}) => [name, residents.length])
  .forEach(({0 : name, 1 : length}) => {
    result[name] = length;
  });
  return result;
}

function entryCalculator(entrants = {}) {
  if(Object.entries(entrants).length === 0) return 0;
  const {prices} = data;
  let total = 0;
  Object.entries(prices).forEach(({0 : key, 1 : price}) => {
    total += entrants[key] * price;
  })
  return total;
}

function animalMap(options = {}) {
  const {animals} = data;
  const result = {};
  if (options.hasOwnProperty('sex') && options.includeNames) {
    animals.forEach(({residents}, i) => {
      animals[i].residents = residents.filter(({sex}) => sex === options.sex);
    });
    
  }
  animals.forEach(({location, name, residents}) => {
    if (options.hasOwnProperty('includeNames') && options.includeNames) {
      const animal = {};

      animal[name] = residents.map(({name}) => name);

      if (!Array.isArray(result[location])) {
        result[location] = [animal];
      } else { 
        result[location].push(animal);
      }
      if (options.hasOwnProperty('sorted') && options.sorted) {
        result[location].forEach(anim => {
          if(anim[name]) anim[name] = anim[name].sort();
        });
      }
    } else {
      if (!Array.isArray(result[location])) {
        result[location] = [name];
      } else {
        result[location].push(name);
      }
    }
  });
  return result;
}

function schedule(dayName) {
  const {hours} = data;
  const result = {};

  Object.entries(hours).forEach(({0 : key, 1 : value}) => {
    const {open, close} = value;
    if (dayName && dayName === key || !dayName) {
      result[key] = (open === 0 && close === 0) ? 'CLOSED' : `Open from ${open}am until ${close - 12}pm`;
    }
  });
  return result;
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
