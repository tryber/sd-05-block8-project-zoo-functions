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
const { animals } = require('./data');
const { employees } = require('./data');
const { prices } = require('./data');
const { hours } = require('./data');


function animalsByIds(...ids) {
  // Tratamento caso seja vazio.
  const vetAux = [];
  // Tratamento para 1 ou 2 posições.
  const [pos1, pos2] = ids;
  if (ids === false) {
    return vetAux;
  }
  const animalsReturn = animals.filter(element => element.id === pos1
    || element.id === pos2);
  return animalsReturn;
}

function animalsOlderThan(animal, age) {
  // Cria uma constante e procura pelo nome do animal e armazena o seus dados.
  const searchAnimal = animals.find(aux => aux.name === animal);
  // Pega o animal armazenado e checka se a idade de todos os residents é maior ou igual.
  const checkAge = searchAnimal.residents.every(aux2 => aux2.age >= age);
  return checkAge;
}

function employeeByName(employeeName) {
  // Tratamento caso receba com parâmetro vazio.
  const objAux = {};
  if (employeeName === undefined) {
    return objAux;
  }
  // Procura pelo nome do funcionário ou pelo sobrenome e retorna o seu objeto
  // Tentei usar o .filter mas ele retorna dentro de um array.
  const searchEmp = employees.find(aux => aux.firstName === employeeName ||
  aux.lastName === employeeName);
  return searchEmp;
}

function createEmployee(personalInfo, associatedWith) {
  // Retorna um objeto com as informações do funcionário cadastrado.
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // Procura pelo código do funcionário e procura se esse código esta contido
  // em algum gerente designado.
  const searchMan = employees.some(aux => aux.managers.some(manId => manId === id));
  return searchMan;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // Recebe os valores dos parâmetros, e adiciona no final da lista
  // Ps: Não retorna nada.
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  // Tratamento caso a função seja chamada sem parâmetros
  const aCount = {};
  if (species === undefined) {
    // Recebe o nome e a quantidade daquele anima e armazena no objeto animal count
    animals.forEach((element) => {
      const count = element.residents.length;
      const name = element.name;
      aCount[name] = count;
    });
    return aCount;
  }
  // Procura pelo nome do animal passado no parâmetro e retorna o número de animais
  return animals.find(aux => aux.name === species).residents.length;
}

function entryCalculator(...entrants) {
  // Testa se a entrada é vazia ou se é um objeto vazio e retorna 0
  if (entrants.length === 0 || Object.keys(entrants[0]).length === 0) {
    return 0;
  }
  // Joga os valores dos parametros para um array e depois multiplica com o valor de cada entrada.
  const eVet = Object.values(entrants[0]);
  const total = (eVet[0] * data.prices.Adult) + (eVet[1] * data.prices.Child) +
  (eVet[2] * data.prices.Senior);
  return total;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // Cria um objeto auxiliar
  const auxObj = {};
  // Cria uma função percorrendo as chaves do objeto utilizando um forEach
  Object.keys(hours).forEach((day) => {
    // Condição de parada caso o dia seja domingo
    if (day === 'Monday') {
      auxObj[day] = 'CLOSED';
    } else {
      // Ajusta o horário de fechamento com o -12 para ficar no padrão am/pm
      auxObj[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
    }
  });
  return dayName ? { [dayName]: auxObj[dayName] } : auxObj;
}

function oldestFromFirstSpecies(id) {
  // Recebe o id do funcionário a ser pesquisado
  const empId = employees.find(aux => aux.id === id);
  // Recebe o id do primeiro animal que o funcionario foi responsável
  const specId = empId.responsibleFor[0];
  // Cria um objeto com os animais dessa espécie.
  const objRes = animals.find(aux2 => aux2.id === specId).residents;
  let actOld = 0;
  let objOld = 0;
  // Percorre o objeto checkando a idade do mais velho e salvando o objeto com as informações
  for (let i = 0; i < objRes.length; i += 1) {
    if (objRes[i].age > actOld) {
      actOld = objRes[i].age;
      objOld = objRes[i];
    }
  }
  return [objOld.name, objOld.sex, objOld.age];
}

function increasePrices(percentage) {
  // Cria uma constante com a porcentagem já traduzida para forma numerica
  const perc = (percentage / 100) + 1;
  // Seta no arquivo o novo preço com os devidos arredondamentos
  data.prices.Adult = Math.round((prices.Adult * perc) * 100) / 100;
  data.prices.Senior = Math.round((prices.Senior * perc) * 100) / 100;
  data.prices.Child = Math.round((prices.Child * perc) * 100) / 100;
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
