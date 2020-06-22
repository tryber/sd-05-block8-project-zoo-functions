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

function searchObjAnimal(variavel, valor) {
  const objeto = data.animals.find((element) => {
    if (element[variavel] === valor) {
      return element;
    }
    return null;
  });
  return objeto;
}

function animalsByIds(...ids) {
  const array = [];
  ids.forEach((id) => {
    const objAnimal = searchObjAnimal('id', id);
    array.push(objAnimal);
  });
  return array;
}

function animalsOlderThan(animal, age) {
  const animals = searchObjAnimal('name', animal);
  const residents = animals.residents;
  let result = true;
  residents.forEach((element) => {
    if (element.age < age) {
      result = false;
    } else {
      result = true;
    }
  });
  return result;
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  const objEmployees = data.employees.find((element) => {
    if (element.firstName === employeeName || element.lastName === employeeName) {
      return element;
    }
    return null;
  });
  return objEmployees;
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = { ...personalInfo, ...associatedWith };
  return newEmployee;
}

function isManager(id) {
  const managers = data.employees.map(element => element.managers);
  let result = false;
  managers.forEach((element) => {
    if (result === false) {
      result = element.some(manager => manager === id);
    }
  });
  return result;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  data.employees.push(newEmployee);
}

function animalCount(species) {
  if (species === undefined) {
    let objAnimal = {};
    data.animals.forEach((element) => {
      objAnimal = { ...objAnimal, [element.name]: element.residents.length };
    });
    return objAnimal;
  }
  const animal = data.animals.find(element => element.name === species);
  return animal.residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  let result = 0;
  result = entrants.Adult * data.prices.Adult;
  result += entrants.Senior * data.prices.Senior;
  result += entrants.Child * data.prices.Child;
  return result;
}

function getResidentsNames(nameAnimal, sex = undefined, sorted = false) {
  let getObj = searchObjAnimal('name', nameAnimal);
  let arrayResidents = [];
  if (sex !== undefined) {
    getObj = getObj.residents;
    const objFiltered = getObj.filter(element => element.sex === sex);
    arrayResidents = objFiltered.map(element => element.name);
  } else {
    arrayResidents = getObj.residents.map(element => element.name);
  }
  if (sorted === true) {
    arrayResidents.sort();
  }
  return arrayResidents;
}

function animalMap(options = {}) {
  const { includeNames = false, sorted = false, sex = undefined } = options;
  let result = { NE: [], NW: [], SE: [], SW: [] };
  Object.keys(result).forEach((position) => {
    const animalsList = [];
    data.animals.forEach((animal) => {
      //  retorna a opção com includeNames undefined or false
      if (animal.location === position && includeNames === false) {
        animalsList.push(animal.name);
        result = { ...result, [position]: animalsList };
      }
      //  retorna a opção com includeNames === true
      if (animal.location === position && includeNames === true) {
        const listNames = getResidentsNames(animal.name, sex, sorted);
        result[position].push({ [animal.name]: [...listNames] });
      }
    });
  });
  return result;
}

function schedule(dayName) {
  const scheduleInform = { Tuesday: '', Wednesday: '', Thursday: '', Friday: '', Saturday: '', Sunday: '', Monday: '' };
  Object.keys(scheduleInform).forEach((day) => {
    if (data.hours[day].open !== 0 && data.hours[day].close !== 0) {
      scheduleInform[day] = `Open from ${data.hours[day].open}am until ${data.hours[day].close - 12}pm`;
    } else {
      scheduleInform[day] = 'CLOSED';
    }
  });
  if (dayName === undefined) {
    return scheduleInform;
  }
  const oneDaySchedule = { [dayName]: scheduleInform[dayName] };
  return oneDaySchedule;
}

function oldestFromFirstSpecies(id) {
  const getSpecieID = data.employees.find(element => element.id === id).responsibleFor[0];
  const getSpecieObj = data.animals.find(element => element.id === getSpecieID);
  const sortResidents = getSpecieObj.residents.sort(function (a, b) { return b.age - a.age; });
  const oldestResident = sortResidents[0];
  const { name, sex, age } = oldestResident;
  return ([name, sex, age]);
}

function increasePrices(percentage) {
  const objPrices = Object.keys(data.prices);
  objPrices.forEach((index) => {
    let increament = 0;
    increament = data.prices[index] * (1 + (percentage / 100));
    increament = Math.round(increament * 100) / 100;
    data.prices[index] = increament;
  });
}

function employeeCoverage(idOrName) {
  let employeesList = {};
  let employeeInfo = [];
  data.employees.forEach((employee) => {
    const animalsNames = employee.responsibleFor.map((animalsResponsive) => {
      const animals = data.animals.find(animal => animal.id === animalsResponsive);
      return animals.name;
    });
    employeesList = { ...employeesList, [`${employee.firstName} ${employee.lastName}`]: [...animalsNames] };
    employeeInfo = [...employeeInfo, [employee.id, employee.firstName, employee.lastName]];
  });
  if (idOrName !== undefined) {
    const selected = employeeInfo.find(employee => employee.includes(idOrName));
    return { [`${selected[1]} ${selected[2]}`]: employeesList[[`${selected[1]} ${selected[2]}`]] };
  }
  return employeesList;
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
