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

const { animals, employees, prices } = data; // object destructuring

function animalsByIds(...ids) {
  const output = [];
  ids.forEach((id) => {
    output.push(...animals.filter(animal => animal.id === id));
  });
  return output;
}

function animalsOlderThan(animal, age) {
  const filteredAnimals = animals.find(findAnimal => findAnimal.name === animal);
  const res = filteredAnimals.residents.every(otherAnimal => otherAnimal.age >= age);
  return res;
}

function employeeByName(employeeName) {
  if (employeeName === undefined) { return {}; }
  const filteredEmployee = employees.find(({ firstName, lastName }) =>
  firstName === employeeName || lastName === employeeName);
  return filteredEmployee;
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const newEmployee =
    {
      id,
      firstName,
      lastName,
      managers,
      responsibleFor,
    };
  return newEmployee;
}

function isManager(id) {
  // filters employees for the ones that have the given id as a value of managers property
  const filteredEmployees = employees.filter(employee => employee.managers.includes(id));
  // if there is any, then the id is of a manager
  return filteredEmployees.length > 0;
}

function addEmployee(id = '', firstName = '', lastName = '', managers = [], responsibleFor = []) {
  // adding standard values for each parameter
  const newEmployeeAdd = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newEmployeeAdd);
}

function animalCount(species) {
  const numOfAnimalsObj = {};
  if (species === undefined) {
    animals.forEach((element) => {
      const numOfEach = element.residents.length;
      numOfAnimalsObj[element.name] = numOfEach;
    });
    return numOfAnimalsObj;
  }
  const findBySpecies = animals.find(element => element.name === species);
  const numOfAnimals = findBySpecies.residents.length;
  return numOfAnimals;
}

function entryCalculator(entrants) {
  if (typeof entrants === 'undefined') { return 0; } else
  if (typeof entrants === 'object') { // checking if the function was called with an empty object;
    if (Object.entries(entrants).length === 0) { return 0; } // empty if num of entries is 0
  }
  // argument has the format { 'Adult': 2, 'Child': 3, 'Senior': 1 }
  const adults = entrants.Adult;
  const children = entrants.Child;
  const seniors = entrants.Senior;
  const total = ((adults * prices.Adult) + (children * prices.Child) + (seniors * prices.Senior));
  return total;
}

function animalMap(options) {

}

function schedule(dayName) {
  const scheduleObj = {
    Tuesday: 'Open from 8am until 6pm',
    Wednesday: 'Open from 8am until 6pm',
    Thursday: 'Open from 10am until 8pm',
    Friday: 'Open from 10am until 8pm',
    Saturday: 'Open from 8am until 10pm',
    Sunday: 'Open from 8am until 8pm',
    Monday: 'CLOSED',
  };
  if (dayName === undefined) { return scheduleObj; }
  const outputSchedule = {};
  // creates a new property: key is the given parameter
  // and value is taken from the above declared obj
  outputSchedule[dayName] = scheduleObj[dayName];
  return outputSchedule;
}

function oldestFromFirstSpecies(id) {
  // findId is each employee, checks if id matches parameter
  const findEmployee = employees.find(findId => findId.id === id);
  // the selected employee object has a responsibleFor array of strings
  // with the ids of the species they're (obvs) responsible for
  const animalTypeId = findEmployee.responsibleFor[0];
  // searches in the data.animals array for the animal species
  // corresponding to the responsibleFor[0] id
  const findAnimalObj = animals.find(animal => animal.id === animalTypeId);
  // the species found is an array; the residents property
  // is another array with the individual animals
  const animalsArray = findAnimalObj.residents;
  // sort residents by age
  const oldestAnimalSort = animalsArray.sort(function (a, b) { return b.age - a.age; });
  // to return an array with only the obj values instead of the entire object
  const oldestAnimal = Object.values(oldestAnimalSort[0]);
  return oldestAnimal;
}

function increasePrices(percentage) {
  const pct = percentage / 100;
  /*
  - for initial value = 2.21 and percentage = 50%:
  - res = 2.21 + (2.21 * 0.5) => 3.105
  - 3.105 * 100 => 310.5
  - Math.round(310.5) => 311
  - it always rounds towards positive infinity; so 1.5 goes to 2, and -1.5 goes to -1
  - 311 / 100 => 3.11
  */
  Object.keys(prices).forEach((property) => {
    prices[property] = Math.round(((prices[property] + (prices[property] * pct))) * 100) / 100;
  });
  return Object.values(prices);
}

function employeeCoverage(idOrName) {
  const res = {};

  if (idOrName !== undefined) {
    const animalList = [];
    let animalName;
    const empl = employees.find(({ firstName, lastName, id }) =>
      firstName === idOrName || lastName === idOrName || id === idOrName);
    for (let i = 0; i < empl.responsibleFor.length; i += 1) {
      animalName = animalsByIds(empl.responsibleFor[i])[0].name;
      animalList.push(animalName);
    }
    res[`${empl.firstName} ${empl.lastName}`] = animalList;
    return res;
  }

    // if no argument is passed, for each employee print corresponding animals
  employees.forEach((employee) => {
    const c = [];
    for (let i = 0; i < employee.responsibleFor.length; i += 1) {
      c.push(animalsByIds(employee.responsibleFor[i])[0].name);
    }
    res[`${employee.firstName} ${employee.lastName}`] = c;
  });

  return res;
}
console.log(employeeCoverage());

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
