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

const { animals, employees, prices } = data;

function animalsByIds(...ids) {
  // seu código aqui
  /*  function retornar 0, retornar animais de id,retornar animais de multiplos id */
  const array = [];
  if (ids.length === 0) return array;
  animals.forEach((animal) => {
    ids.forEach((id) => {
      if (id === animal.id) array.push(animal);
    });
  });
  return array;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  /* testar idade especifica de certa especie */
  const speciesNames = animals.find(specie => specie.name === animal);
  const animalAge = speciesNames.residents.every(specie => specie.age > age);

  return animalAge;
}

function employeeByName(employeeName) {
    // seu código aqui
    /* retornar vazio, primeiro nome gera objeto do func, ultimo nome tambem */
  const employeeFirstName = employees.find(name => name.firstName === employeeName);
  const employeeLastName = employees.find(lastname => lastname.lastName === employeeName);
  if (employeeFirstName) {
    return employeeFirstName;
  } else if (employeeLastName) {
    return employeeLastName;
  } return {};
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
} // abençõe o redux por me obrigar a decorar spread

function isManager(id) {
  // seu código aqui
  const manager = employees.some(staff => staff.managers.includes(id) === true);

  return manager;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  // seu código aqui
  const animalAmount = {};
  animals.forEach(animal => (animalAmount[animal.name] = animal.residents.length));
  return species
    ? animals.find(animal => animal.name === species).residents.length
    : animalAmount;
}

function entryCalculator(entrants) {
  // seu código aqui
  if (!entrants || Object.entries(entrants).length === 0) return 0;

  const pricing = Object.keys(prices);
  const earinings = (price, ticket) => price + (prices[ticket] * entrants[ticket]);

  return pricing.reduce(earinings, 0);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
  const workHours = {};
  const week = Object.keys(data.hours);
  week.forEach((day) => {
    if (day === 'Monday') {
      workHours[day] = 'CLOSED';
    } else {
      workHours[day] = `Open from ${data.hours[day].open}am until ${
        data.hours[day].close - 12
      }pm`;
    }
  });

  if (dayName !== undefined) return { [dayName]: workHours[dayName] };
  return workHours;
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const animalID = employees.find(employee => employee.id === id).responsibleFor[0];
  const { name, sex, age } = animals
  .find(animal => animal.id === animalID)
  .residents.sort((y, o) => o.age - y.age)[0];
  return [name, sex, age];
}

function increasePrices(percentage) {
  // seu código aqui
  const ticketPrices = Object.keys(prices);
  ticketPrices.forEach((priceTag) => {
    prices[priceTag] =
      Math.round((prices[priceTag] * 100) * (1 + (percentage / 100))).toFixed(2) / 100;
  });
}

function employeeCoverage(idOrName) {
  // seu código aqui
  if (!idOrName) {
    const employeeDuties = employees.reduce((coverage, employee) => {
      const animalsList = employee.responsibleFor.map(
        animalID => animals.find(animal => animalID === animal.id).name,
      ); // reciclando o animalID de oldestSpecies
      coverage[`${employee.firstName} ${employee.lastName}`] = animalsList;

      return coverage;
    }, {});

    return employeeDuties;
  }

  const employeeName = employees.find(
    employee =>
      idOrName === employee.id ||
      idOrName === employee.firstName ||
      idOrName === employee.lastName,
  );
  const employeeResponsibility = employeeName.responsibleFor;
  const animalsList = employeeResponsibility.map(
    animalID => animals.find(animal => animalID === animal.id).name,
  );

  return {
    [`${employeeName.firstName} ${employeeName.lastName}`]: animalsList,
  };
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
