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

const { employees, animals, prices, hours } = data;

function animalsByIds(...ids) {
  if (!ids) return [];
  return ids.map(paramId =>
    data.animals.find(animal => animal.id === paramId));
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  return data.animals
    .find(especie => especie.name === animal)
    .residents.every(idade => idade.age > age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (!employeeName) return {};
  return data.employees.find(primeiro =>
    primeiro.firstName === employeeName || primeiro.lastName === employeeName);
}

const createEmployee = (personalInfo, associatedWith) => ({
  // seu código aqui
  ...personalInfo,
  ...associatedWith,
});

function isManager(id) {
  // seu código aqui
  return data.employees.some(g => g.managers.some(xablau => xablau === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const novoEmployee = {};
  novoEmployee.id = id;
  novoEmployee.firstName = firstName;
  novoEmployee.lastName = lastName;
  novoEmployee.managers = managers;
  novoEmployee.responsibleFor = responsibleFor;
  employees.push(novoEmployee);
}
function animalCount(species) {
  // seu código aqui
  if (species === undefined) {
    const quantidades = {};
    animals.forEach((xablau) => {
      const names = xablau.name;
      const contagem = xablau.residents.length;
      quantidades[names] = contagem;
    });
    return quantidades;
  }
  const animalsbusca = animals.find(especie => especie.name === species);
  return animalsbusca.residents.length;
}

function entryCalculator(entrants) {
  // seu código aqui
  if (entrants === undefined || Object.entries(entrants).length === 0) {
    return 0;
  }
  let total = 0;
  total += (entrants.Adult * 49.99);
  total += (entrants.Senior * 24.99);
  total += (entrants.Child * 20.99);
  return total;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
  let array = ['Tuesday', 'Monday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  if (dayName !== undefined) array = [dayName];
  const convert = (hours2) => {
    let horaR = hours2;
    if (horaR > 12) {
      horaR = `${horaR - 12}pm`;
      return horaR;
    }
    return `${horaR}am`;
  };
  const horadia = nomeDia => hours[nomeDia];
  const obj = {};
  array.forEach((day) => {
    if (day === 'Monday') {
      obj[day] = 'CLOSED';
    } else {
      const abertura = convert(horadia(day).open);
      const fechamento = convert(horadia(day).close);
      const value = `Open from ${abertura} until ${fechamento}`;
      obj[day] = value;
    }
  });
  return obj;
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const empregadoCerto = employees.find(primeiro => primeiro.id === id);
  const pAnimal = animals.find(animal => animal.id === empregadoCerto.responsibleFor[0]).residents;
  let idoso = { age: 0 };
  pAnimal.forEach((animal) => {
    if (idoso.age < animal.age) idoso = animal;
  });
  return [idoso.name, idoso.sex, idoso.age];
}

function increasePrices(percentage) {
  // seu código aqui
  prices.Adult = Math.round(prices.Adult * (1 + (percentage / 100))
  * 100) / 100;
  prices.Senior = Math.round(prices.Senior * (1 + (percentage / 100))
  * 100) / 100;
  prices.Child = Math.round(prices.Child * (1 + (percentage / 100))
  * 100) / 100;
}

function employeeCoverage(idOrName) {
  // seu código aqui
  let nomeFuncionarios = ['Nigel', 'Burl', 'Ola', 'Wilburn', 'Stephanie', 'Sharonda', 'Ardith', 'Emery'];
  if (idOrName !== undefined) nomeFuncionarios = [idOrName];
  const acharFuncionario = idName =>
  employees.find(selecionado =>
  selecionado.id === idName ||
  selecionado.firstName === idName ||
  selecionado.lastName === idName,
);
  const nameAnimals = (arrayanimal) => {
    const retornoAn = [];
    arrayanimal.forEach(id => retornoAn.push(animals.find(animal => animal.id === id).name));
    return retornoAn;
  };
  const obj = {};
  nomeFuncionarios.forEach((employ) => {
    const guardarFun = acharFuncionario(employ);
    const nomeCOmpleto = `${guardarFun.firstName} ${guardarFun.lastName}`;
    const { responsibleFor } = guardarFun;
    const NameDoANimalQueOCaraCuida = nameAnimals(responsibleFor);
    obj[nomeCOmpleto] = NameDoANimalQueOCaraCuida;
  });
  return obj;
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
