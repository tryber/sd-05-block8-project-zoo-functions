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

function animalsByIds(id1, id2) {
  if (id1 === 0 && id2 === 0) {
    return [];
  }
  const todosAnimais = (animals.filter(animal => (animal.id === id1) + (animal.id === id2)));
  return todosAnimais;
}

function animalsOlderThan(animal, age) {
  const animalX = animals.find(todos => todos.name === animal);
  const idadeMin = animalX.residents.every(verificacao => verificacao.age >= age);
  return idadeMin;
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  const funcionario = employees.find(nome => (nome.firstName === employeeName) || (nome
    .lastName === employeeName));
  return funcionario;
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  const gerente = employees.some(descobrir =>
    descobrir.managers.find(numero => numero === id));
  return gerente;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const novo = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(novo);
}

function animalCount(species) {
  const especies = {};
  if (species === undefined) {
    for (let n = 0; n < animals.length; n += 1) {
      especies[animals[n].name] = animals[n].residents.length;
    }
    return especies;
  }
  const procuraEspecie = animals.find(encontrar => encontrar.name === species).residents.length;
  return procuraEspecie;
}

function entryCalculator(entrants) {
  let valorFinal = 0;
  if (entrants === undefined || entrants === {}) {
    return valorFinal;
  }
  const adultos = prices.Adult;
  const idosos = prices.Senior;
  const criancas = prices.Child;
  if (entrants.Adult !== undefined) {
    valorFinal = adultos * entrants.Adult;
  }
  if (entrants.Senior !== undefined) {
    valorFinal += idosos * entrants.Senior;
  }
  if (entrants.Child !== undefined) {
    valorFinal += criancas * entrants.Child;
  }
  return valorFinal;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const cronograma = Object.keys(hours);
  const programacao = {};
  cronograma.forEach((day) => {
    if (day === 'Monday') {
      programacao[day] = 'CLOSED';
    } else {
      programacao[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
    }
  });
  if (dayName === undefined) {
    return programacao;
  }
  return ({ [dayName]: programacao[dayName] });
}

function oldestFromFirstSpecies(id) {
  const funcionario = employees.find(identificacao => identificacao.id === id).responsibleFor;
  const qualAnimal = animals.find(animais => animais.id === funcionario[0]).residents;
  let velho = { name: '', sex: '', age: '' };
  qualAnimal.forEach((resident) => {
    if (resident.age > velho.age) {
      velho = resident;
    }
  });
  return [velho.name, velho.sex, velho.age];
}

function increasePrices(percentage) {
  const valor = prices;
  const { Adult, Senior, Child } = valor;
  valor.Adult = Math.round(Adult * (1 + (percentage / 100)) * 100) / 100;
  valor.Senior = Math.round(Senior * (1 + (percentage / 100)) * 100) / 100;
  valor.Child = Math.round(Child * (1 + (percentage / 100)) * 100) / 100;
  return valor;
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
