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
  // 1. transformar os parâmetros passados em um array
  // usando parâmetro rest (colocar ... antes de ids);
  // 2. se não recebe parâmetros, retorna um array vazio;
  if (ids === undefined) {
    return [];
  }
  // 3. definir uma constante para armazenar o animal com aquela id;
  // 4. passar por todas as ids do array parâmetro (forEach);
  // 5. localizar a id desejada (filter);
  // 6. jogar pra dentro da variável criada (push);
  const animalsById = [];
  ids.forEach((id) => {
    animalsById.push(...animals.filter(animal => animal.id === id));
  });
  return animalsById;
}

function animalsOlderThan(animalsName, age) {
  // 1. criar uma constante para armazenar os animais que são mais velhos;
  // 2. localizar o animal que vai ser parâmetro de comparação (find);
  // 3. passar por todos os animais residentes e comparar as idades (every);
  const animalsOlder = animals.find(animal => animal.name === animalsName)
    .residents.every(animal => animal.age > age);
  return animalsOlder;
}

function employeeByName(employeeName) {
  // 1. se não receber parâmetros, retorna um objeto vazio;
  if (employeeName === undefined) {
    return {};
  }
  // 2. encontrar dentro da lista de empregados o nome passado como parâmetro;
  // 3. pode ser nome ou sobrenome como parâmetro;
  return employees.find(employee =>
    employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // 1. usar spread para pegar as informações;
  // 2. transformar em um novo objeto acrescentando {};
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  const managerCheck = employees.some(
    employee => id === employee.managers.find(item => item === id),
  );
  return managerCheck;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  employees.push(newEmployee);
}

function animalCount(species) {
  // 1. sem parâmetros, retorna animais e suas quantidades;
  const allAnimals = animals.reduce((acc, { name, residents }) => {
    acc[name] = residents.length;
    return acc;
  }, {});
  if (species === undefined) return allAnimals;
  // 2. com o nome de uma espécie dado como parâmetro,
  // retornar somente a quantidade deste;
  const specificAnimal = animals.find(({ name }) => name === species);
  return specificAnimal.residents.length;
}

function entryCalculator(entrants) {
  // 1. se não recebe parâmetros, retorna zero;
  if (entrants === undefined || Object.entries(entrants).length === 0) return 0;
  // 2. colocar a quantidade de pessoas que vão entrar em um objeto;
  const { Adult, Child, Senior } = entrants;
  // 3. fazer a multiplicação dos preços X quantidade de pessoas;
  const totalValue = (prices.Adult * Adult) + (prices.Child * Child) + (prices.Senior * Senior);
  return totalValue;
}

function animalMap(options) {
  // seu código aqui
}

// *REQUISITOS: 1. sem parâmetros, retorna um cronograma legível para humanos
// 2. se um único dia for passado, retorna somente este dia em um
// formato legível para humanos
function setSchedule(open, close) {
  if (open === 0 && close === 0) {
    return 'CLOSED';
  }
  return `Open from ${open}am until ${close - 12}pm`;
}

function schedule(dayName) {
  const rotina = {};
  if (dayName === undefined) {
    Object.keys(hours).forEach(
      day => (rotina[day] = setSchedule(hours[day].open, hours[day].close)));
  } else {
    rotina[dayName] = setSchedule(hours[dayName].open, hours[dayName].close);
  }
  return rotina;
}

// *REQUISITO: Passado o id de um funcionário, encontra a
// primeira espécie de animal gerenciado pelo funcionário,
// e retorna um array com nome, sexo e idade do animal
// mais velho dessa espécie.
function oldestFromFirstSpecies(id) {
  // 1. encontrar o funcionário (find id) e armazenar numa const
  const employeeId = employees.find(person => person.id === id);
  // 2. encontrar o primeiro animal (responsibleFor[0]) e armazenar sua id numa const
  const animalId = employeeId.responsibleFor[0];
  // 3. usando a id do animal, encontrar todos da sua espécie (find + .residents)
  const allAnimalsFromThisSpecies = animals.find(animal => animal.id === animalId).residents;
  // 4. organizar esses animais por idade, colocando o mais velho primeiro (sort .age)
  const oldestAnimal = allAnimalsFromThisSpecies.sort(function (a, b) {
    return b.age - a.age;
  });
  // 5. criar um objeto que armazene os dados do animal mais velho
  const { name, sex, age } = oldestAnimal[0];
  // 6. retornar os valores do objeto em um array
  return [name, sex, age];
}

// *REQUISITO: Ao passar uma porcentagem, incrementa todos os preços,
// arrendondados em duas casas decimais
function increasePrices(percentage) {
  // seu código aqui
}

// *REQUISITOS: 1. Sem parâmetros, retorna uma lista de funcionários
// e os animais pelos quais eles são responsáveis;
// 2. Com o id de um funcionário, retorna os animais pelos quais
// o funcionário é responsável
// 3. Com o primeiro nome de um funcionário, retorna os animais
// pelos quais o funcionário é responsável
// 4. Com o último nome de um um funcionário, retorna os animais
// pelos quais o funcionário é responsável
function employeeCoverage(idOrName) {
  const allEmployeesAndAnimals = {};
  employees.forEach((employee) => {
    allEmployeesAndAnimals[`${employee.firstName} ${employee.lastName}`] =
      employee.responsibleFor.map(
        idAnimal => animals.find(animal => idAnimal === animal.id).name);
  });
  if (idOrName === undefined) {
    return allEmployeesAndAnimals;
  }
  const idOrNameInput = employees.find(idWork =>
    idOrName === idWork.id || idOrName === idWork.firstName || idOrName === idWork.lastName,
  );
  const employeeList = `${idOrNameInput.firstName} ${idOrNameInput.lastName}`;

  return { [employeeList]: allEmployeesAndAnimals[employeeList] };
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
