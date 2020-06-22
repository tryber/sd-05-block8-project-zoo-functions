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
  const filter = [];
  if (ids.length === 0) {
    return filter;
  }
  ids.forEach(id => filter.push(...animals.filter(element => element.id === id)));
  return filter;
}

function animalsOlderThan(animal, age1) {
  const newArray = animals.filter(element => element.name === animal);
  const verifyAge = newArray.every(item => item.residents.every(key => key.age >= age1));
  return verifyAge;
}

function employeeByName(employeeName = {}) {
  let obj = {};
  employees.forEach((element) => {
    if (element.firstName === employeeName) {
      obj = element;
    } else if (element.lastName === employeeName) {
      obj = element;
    }
  });
  return obj;
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = Object.assign({}, personalInfo, associatedWith);
  return newEmployee;
}

function isManager(id) {
  const verifyEach = employees.map(element => element.managers.includes(id));
  const veryfy = verifyEach.some(element => element === true);
  return veryfy;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEMployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newEMployee);
  return employees;
}

function animalCount(species) {
  if (species === undefined) {
    const obj = {};
    animals.map(({ name, residents }) => [name, residents.length])
    .forEach(({ 0: name, 1: length }) => {
      obj[name] = length;
    });
    return obj;
  }
  let count = 0;
  const newArray = animals.filter(animal => animal.name === species);
  newArray.forEach(element => (count = element.residents.length));
  return count;
}

function entryCalculator(entrants) {
  if (entrants === undefined) {
    return 0;
  } else if (Object.entries(entrants).length === 0) {
    return 0;
  }
  const total = [];
  const { Adult, Child, Senior } = entrants;
  const pricesarray = [prices];
  pricesarray.forEach((element) => {
    total.push((element.Adult * Adult),
    (element.Child * Child),
    (element.Senior * Senior));
  });
  const result = total.reduce((acc, index) => acc + index);
  return result;
}

function animalMap(options) {
  if (options === undefined) {
    animals.reduce((acc, obj) => {
      const key = obj.location;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj.name);
      return acc;
    }, {});
  }
}
function schedule(dayName) {
  const arrayOfKeys = Object.keys(hours);
  const humanSchedule = {};
  if (dayName === undefined) {
    arrayOfKeys.forEach((key) => {
      if (key === 'Monday') {
        humanSchedule[key] = 'CLOSED';
      } else {
        humanSchedule[key] = `Open from ${hours[key].open}am until ${hours[key].close - 12}pm`;
      }
    });
    return humanSchedule;
  } else if (dayName !== 'Monday') {
    return { [dayName]: `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm` };
  }
  return { Monday: 'CLOSED' };
}

function oldestFromFirstSpecies(id) {
  const animal = [];
  employees.filter(employe => employe.id === id)
  .forEach(keys => animal.push(...keys.responsibleFor));
  const firstAnimal = animals.find(animaln => animaln.id === animal[0]);
  const animalFound = [];
  let age = 0;
  let animalsn = {};
  firstAnimal.residents.forEach((animalb) => {
    if (animalb.age > age) {
      age = animalb.age;
      animalsn = animalb;
    }
  });
  animalFound.push(animalsn.name, animalsn.sex, animalsn.age);
  return animalFound;
}

function increasePrices(percentage) {
  const chavesPrices = Object.keys(prices);
  chavesPrices.forEach((key) => {
    prices[key] = Math.round((prices[key] * 100) * (1 + (percentage / 100))).toFixed(2) / 100;
  });
  return prices;
}


function employeeCoverage(idOrName) {
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
