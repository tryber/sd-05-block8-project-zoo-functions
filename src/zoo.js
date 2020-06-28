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

function animalsByIds(...ids) {
  /*
  Caso receba nenhum parâmetro, necessário retornar um array vazio
  Ao receber como parâmetro um único id, retorna os animais com este id
  Ao receber mais de um id, retorna os animais que têm um desses ids
  */
  // seu código aqui
  const idsAnimals = [];
  ids.forEach(item => idsAnimals.push(animals.find(animal => animal.id === item)));
  return idsAnimals;
}

function animalsOlderThan(animal, age) {
  /*
  Ao passar o nome de uma espécie e uma idade, testa se todos
  os animais desta espécie possuem a idade mínima especificada
  */
  // seu código aqui
  const specieName = animals.find(item => item.name === animal);
  return specieName.residents.every(elemento => elemento.age > age);
}

function employeeByName(employeeName) {
  /*
  Sem parâmetros, retorna um objeto vazio
  Quando provido o primeiro nome do funcionário, retorna o objeto do funcionário
  Quando provido o último nome do funcionário, retorna o objeto do funcionário
  */
  // seu código aqui
  if (employeeName === undefined) {
    return {};
  }
  const foundEmployee = employees.find(employee =>
    employee.firstName === employeeName || employee.lastName === employeeName);
  return foundEmployee;
}

function createEmployee(personalInfo, associatedWith) {
  /*
  Cria um novo colaborador a partir de objetos
  contendo informações pessoais, gerentes e animais gerenciados
  */
  // seu código aqui
  const newEmployee = { ...personalInfo, ...associatedWith };
  return newEmployee;
}

function isManager(id) {
  // Testa se o id passado é de um gerente
  // seu código aqui
  const testIfManager = employees.some(employee =>
    employee.managers.find(manager => manager === id));
  return testIfManager;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // Adiciona um funcionário no fim da lista
  // seu código aqui
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  employees.push(newEmployee);
}

function animalCount(species) {
  // Sem parâmetros, retorna animais e suas quantidades
  // Com o nome de uma espécie de animal, retorna somente a quantidade
  // seu código aqui
  if (species === undefined) {
    const totalAnimals = {};
    animals.forEach(elem => (totalAnimals[elem.name] = elem.residents.length));
    return totalAnimals;
  }
  return animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  /*
  Retorna 0 se nenhum argumento for passado
  Retorna 0 se um objeto vazio for passado
  Retorna o preço total a ser cobrado dado o número de adultos, crianças e idosos
  */
  // seu código aqui
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  const { Adult, Senior, Child } = entrants;
  return (Adult * prices.Adult) + (Senior * prices.Senior) + (Child * prices.Child);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // Sem parâmetros, retorna um cronograma legível para humanos
  // Se um único dia for passado, retorna somente este dia em um
  // formato legível para humanos
  // seu código aqui
  const scheduleHumans = {};
  Object.keys(hours).forEach((day) => {
    if (hours[day].open === 0) {
      scheduleHumans[day] = 'CLOSED';
    } else {
      scheduleHumans[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
    }
  });
  if (dayName === undefined) {
    return scheduleHumans;
  } return { [dayName]: scheduleHumans[dayName] };
}

function oldestFromFirstSpecies(id) {
  // Passado o id de um funcionário, encontra a primeira espécie de animal
  // gerenciado pelo funcionário, e retorna um array com nome, sexo e idade do
  // animal mais velho dessa espécie
  // seu código aqui
  const getEmployee = employees.find(employee => employee.id === id).responsibleFor[0];
  const getAnimalsSpec = animals.find(animal => animal.id === getEmployee).residents;
  const oldestAnimal = getAnimalsSpec.sort(function (a, b) {
    return b.age - a.age;
  });
  const { name, sex, age } = oldestAnimal[0];
  return [name, sex, age];
}

function increasePrices(percentage) {
  // Ao passar uma porcentagem, incrementa todos os preços,
  // arrendondados em duas casas decimais
  // seu código aqui
  const convert = (1 + (percentage / 100));
  Object.keys(prices).forEach((key) => {
    prices[key] = Math.round((prices[key] * 100) * convert).toFixed(2) / 100;
  });
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
