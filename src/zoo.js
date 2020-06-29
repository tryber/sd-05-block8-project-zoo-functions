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

const { animals, employees, prices, hours } = data;

const animalsByIds = (...ids) => {
  if (typeof ids === 'undefined') {
    return [];
  }

  const result = animals.filter(elemento => ids.includes(elemento.id));
  return result;
};

const animalsOlderThan = (animal, age) => {
  const result = animals.filter(({ name }) => animal.includes(name));
  return result[0].residents[0].age > age;
};

const employeeByName = (employeeName) => {
  if (typeof employeeName === 'undefined') {
    return {};
  }

  return employees.find(n => employeeName === n.firstName || employeeName === n.lastName);
};

const createEmployee = (personalInfo, associatedWith) => {
  const alterado = Object.assign(personalInfo, associatedWith);
  return alterado;
};

const isManager = (id) => {
  for (let i = 0; i < employees.length; i += 1) {
    if (employees[i].managers.includes(id)) {
      return true;
    }
  }
  return false;
};

const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) => {
  const objeto = { id, firstName, lastName, managers, responsibleFor };
  employees.push(objeto);
};

const animalCount = (species) => {
  if (species === undefined) {
    const novaLista = animals.reduce((acumulador, currentValue) => {
      acumulador[currentValue.name] = currentValue.residents.length;
      return acumulador;
    }, {});
    console.log(novaLista);
    return novaLista;
  }
  const animal = animals.find(({ name }) => name === species);
  return animal.residents.length;
};

const entryCalculator = (entrants) => {
  if (entrants === undefined) {
    return 0;
  } else if (Object.keys(entrants).length === 0) {
    return 0;
  }
  const adulto = prices.Adult * entrants.Adult;
  const crianca = prices.Child * entrants.Child;
  const idoso = prices.Senior * entrants.Senior;
  const soma = adulto + crianca + idoso;
  return soma;
};

function animalMap(options) {
  // seu código aqui
}

const getTime = (key) => {
  if (hours[key].open === 0 && hours[key].close === 0) {
    return 'CLOSED';
  }

  return `Open from ${hours[key].open}am until ${hours[key].close - 12}pm`;
};

const schedule = (dayName) => {
  const horarios = {};

  if (dayName === undefined) {
    Object.keys(hours).forEach((key) => {
      horarios[key] = getTime(key);
    });
  } else {
    horarios[dayName] = getTime(dayName);
  }

  return horarios;
};
console.log(schedule('Monday'));

const oldestFromFirstSpecies = (id) => {
  const func = employees.find(elemento => elemento.id === id);
  const animal = animals.find(elemento => elemento.id === func.responsibleFor[0]);
  const idade = animal.residents.sort((a, b) => {
    if (a.age < b.age) return 1;
    if (a.age > b.age) return -1;
    return 0;
  });
  return Object.values(idade[0]);
};

const increasePrices = (percentage) => {
  Object.keys(prices).reduce((acc, atual) => {
    acc[atual] = Math.round((acc[atual] * (100 + percentage)).toFixed(2)) / 100;
    return acc;
  }, prices);
};

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
