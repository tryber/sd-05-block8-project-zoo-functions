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

function animalsByIds(...ids) {
/*
sem parâmetros, retorna um array vazio
 com um único id, retorna os animais com este id
 com mais de um id, retorna os animais que têm um desses ids
 */
  const animal = [];
  ids.forEach(id => animal.push(id === undefined ? '' : data.animals.find(animals => animals.id === id)));
  return animal;
}
/*
console.log(animalsByIds('01422318-ca2d-46b8-b66c-3e9e188244ed'))
------------------------------------------------------------------
*/
function animalsOlderThan(animal, age) {
/*
passados o nome de uma espécie e uma idade, testa se residentes os animais desta
espécie possuem a idade mínima especificada
*/
  const relatorio = [];
  const especie = data.animals.find(specie => (specie.name === animal));
  especie.residents.forEach(idade => relatorio.push(idade.age > age ? 1 : 0));
  return relatorio.every(a => a);
}
/*
console.log(animalsOlderThan('otters', 7))
------------------------------------------------------------------
*/
function employeeByName(employeeName) {
/*
sem parâmetros, retorna um objeto vazio
quando provido o primeiro nome do funcionário, retorna o objeto do funcionário
quando provido o último nome do funcionário, retorna o objeto do funcionário
*/
  if (employeeName === undefined) return {};
  const name = data.employees;
  return name.find(nome => employeeName === nome.firstName || nome.lastName === employeeName);
}
/*
console.log(employeeByName('Sharonda'))
------------------------------------------------------------------
*/
function createEmployee(personalInfo, associatedWith) {
/*
cria um novo colaborador a partir de objetos contendo informações pessoais,
gerentes e animais gerenciados
*/
  const newEmployee = {};
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  newEmployee.id = id;
  newEmployee.firstName = firstName;
  newEmployee.lastName = lastName;
  newEmployee.managers = managers;
  newEmployee.responsibleFor = responsibleFor;
  return newEmployee;
}
/*
const infoPessoais = {
  id: '5540a139-d4dc-4f09-822d-ec25e819a5ad',
  firstName: 'Elisangelo',
  lastName: 'Alves Ferreira'
}
const atribuicao = {
  managers: [],
  responsibleFor: []
}
const novoempregado = createEmployee(infoPessoais, atribuicao);
console.log(novoempregado);

------------------------------------------------------------------ */
function isManager(id) {
/*
testa se o id passado é de um gerente
*/
  const empregado = data.employees.some(funcionario =>
  funcionario.managers.find(managers => managers === id));
  return empregado;
}
console.log(isManager('c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1'))
/*
console.log(isManager('c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1'))
------------------------------------------------------------------
*/
function addEmployee(id, firstName, lastName, managers, responsibleFor) {
// adiciona um funcionário no fim da lista
  if (managers === undefined) managers = [];
  if (responsibleFor === undefined) responsibleFor = [];
  const empregado = createEmployee({ id, firstName, lastName }, { managers, responsibleFor });
  data.employees.push(empregado);
}
/*

addEmployee('39800c14-4b76-454a-858d-2f8d168146a7', 'John', 'Doe', [
  '546fe3d4-2d81-4bb4-83a7-92d5b7048d17',
  'a67a36ee-3765-4c74-8e0f-13f881f6588a',
],
[
  'ee6139bf-b526-4653-9e1e-1ca128d0ad2e',
  '210fcd23-aa7b-4975-91b7-0230ebb27b99',
]);

const penultimo = data.employees[8]
console.log(penultimo.firstName)

addEmployee('55800c14-4b76-454a-858d-2f8d168146a7', 'Elisangelo', 'Alves Ferreira', [
],
[
]);

const ultimo = data.employees[9];
console.log(ultimo.firstName)
console.log(data.employees)

ultimo.responsibleFor = ['fdb2543b-5662-46a7-badc-93d960fdc0a8',
'9e7d4524-363c-416a-8759-8aa7e50c0992','0e7b460e-acf4-4e17-bcb3-ee472265db83'];

console.log(ultimo)
console.log(addEmployee())
------------------------------------------------------------------
*/
function animalCount(species) {
/*
sem parâmetros, retorna animais e suas quantidades
 com o nome de uma espécie de animal, retorna somente a quantidade
*/
  if (species === undefined) {
    const relatorio = {};
    data.animals.forEach(animal => (relatorio[`${animal.name}`] = animal.residents.length));
    return relatorio;
  }
  const especie = data.animals.filter(animal => animal.name === species)
  .reduce((valorAcumulador, animais) => (valorAcumulador = animais.residents), 0);
  return especie.length;
}
console.log(animalCount())
/*
console.log(animalCount())
------------------------------------------------------------------
*/
function entryCalculator(entrants) {
  const { prices } = data;
// returna 0 se nenhum argumento for passado
  if (entrants === undefined || Object.keys(entrants).length === 0) return 0;
/*
retorna o preço total a ser cobrado dado o número de adultos, crianças e idosos
*/
  const soma = Object.keys(prices).reduce(function (total, precoPorPessoa) {
    total += prices[precoPorPessoa] * entrants[precoPorPessoa];
    return total;
  }, 0);
  return soma;
}
console.log(entryCalculator({ 'Adult': 3, 'Child': 3, 'Senior': 1 }));

/*
console.log(entryCalculator({ 'Adult': 2, 'Child': 3, 'Senior': 1 }));
------------------------------------------------------------------
*/
const localiza = () => {
    // populando um objeto com as chaves de localizacao
  const porLocalizacao = {};
  data.animals.forEach((especie) => {
    if (!porLocalizacao[especie.location]) porLocalizacao[especie.location] = [];
    if (porLocalizacao[especie.location]) porLocalizacao[especie.location].push(especie.name);
  });
  return porLocalizacao;
};
//------------------------------------------------
function animalMap(options) {
  const { animals } = data;
  // funcao chamada sem parâmetros, retorna animais categorizados por localização
  if (!options) localiza;
  // funcao chamada com parâmetros, retorna animais categorizados por localização
  // de forma personalizada com os nomes de seus respectivos residentes
  if (options) {
    const { includeNames = false, sex = undefined, sorted = false } = options;
    if (includeNames === true) {
      const porLocal = {};
      const location = Object.keys(localiza());
      location.forEach((local) => {
      // console.log(porLocal[local] = local)
      // console.log(porLocal)
        porLocal[local] = animals.filter(animal => animal.location === local).map((animal) => {
          let residentes = animal.residents;
  // com opções especificadas, retorna somente nomes de animais macho/fêmea
          if (sex) residentes = residentes.filter(animalzinho => animalzinho.sex === sex);
  // com opções 'sorted' especificadas, retorna nomes de animais ordenados
          if (sorted) return { [animal.name]: residentes.map(individuo => individuo.name).sort() };
          return { [animal.name]: residentes.map(individuo => individuo.name) };
        });
      });
      return porLocal;
    }
  }
  return localiza();
}
// options = { includeNames: true, sex: 'female' }
// options = { sex: 'female' }
// console.log(animalMap());
console.log(animalMap());
//------------------------------------------------------------------
function schedule(dayName) {
// funcao pra verifica dia da semana
  const { hours } = data;
  const weekDays = {};
  const checkWeekday = function (day) {
    const { open, close } = hours[day];
    return (day === 'Monday') ? 'CLOSED' : `Open from ${open}am until ${close - 12}pm`;
  };
/*
se um único dia for passado, retorna somente este dia em um formato legível
para humanos
*/
  if (dayName !== undefined) return { [dayName]: `${checkWeekday(dayName)}` };
/*
sem parâmetros, retorna um cronograma legível para humanos
*/
  Object.keys(hours).forEach(dias => (weekDays[dias] = checkWeekday(dias)));
  return weekDays;
}
console.log(schedule('Saturday'));

/*
console.log(schedule());
------------------------------------------------------------------
*/
function oldestFromFirstSpecies(id) {
// passado o id de um funcionário, encontra a primeira espécie de animal
// gerenciado pelo funcionário, e retorna um array com nome, sexo e idade do
// animal mais velho dessa espécie
  const { animals, employees } = data;
  const idEmpregado = employees.find(employee => employee.id === id).responsibleFor[0];
  const animalMaisVelho = animals.find(animal => animal.id === idEmpregado)
  .residents.sort((a, b) => b.age - a.age);
  return Object.values(animalMaisVelho[0]);
}
// oldestFromFirstSpecies('9e7d4524-363c-416a-8759-8aa7e50c0992');
//------------------------------------------------------------------
function increasePrices(percentage) {
  const { prices } = data;
  Object.keys(prices).forEach(preco => (prices[preco] = Number(
    (prices[preco] * ((percentage * 0.01) + 1.0001)).toFixed(2))));
    /*
data uma porcentagem, incrementa residentes os preços, arrendondados em duas casas decimais
     for (i in data.prices){
       data.prices[i] = Number((data.prices[i] * (percentage *0.01 + 1.0001)).toFixed(2))
     }
*/
}
/*
 increasePrices(50);
 increasePrices(30);
------------------------------------------------------------------
*/
function employeeCoverage(idOrName) {
//
  const { employees, animals } = data;
  const funcionario = {};
  /*
  com o id de um funcionário, retorna os animais pelos quais o funcionário é
  responsável
  */
  const checkPerson = employees.find(person => (
  person.id === idOrName || person.firstName === idOrName || person.lastName === idOrName));
  //
  const checkAnimals = (employee) => {
    const animalsTreated = employee.responsibleFor.map(idDosAnimais =>
  animals.find(animal => animal.id === idDosAnimais).name);
    return animalsTreated;
  };
  /*
  com o primeiro nome de um funcionário, retorna os animais pelos quais o
  funcionário é responsável
  */
  if (idOrName !== undefined) return { [`${checkPerson.firstName} ${checkPerson.lastName}`]: checkAnimals(checkPerson) };
  /*
  sem parâmetros, retorna uma lista de funcionários e os animais pelos quais
  eles são responsáveis
  */
  employees.forEach((employee) => {
    const animalEncontrado = checkAnimals(employee);
    funcionario[`${employee.firstName} ${employee.lastName}`] = animalEncontrado;
  });
  return funcionario;
}
 console.log(employeeCoverage());
//------------------------------------------------------------------
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
