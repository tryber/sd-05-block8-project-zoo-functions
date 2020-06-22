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

const { animals, employees, hours, prices } = data;

// console.log(employees);
/*
Caso receba nenhum parâmetro, necessário retornar um array vazio
Ao receber como parâmetro um único id, retorna os animais com este id
Ao receber mais de um id, retorna os animais que têm um desses ids
*/
function animalsByIds(...parametro) {
  const animalsArray = [];
  parametro.forEach(objId => animalsArray.push(animals.find(animal => animal.id === objId)));
  return animalsArray;
}

/*
Ao passar o nome de uma espécie e uma idade,
testa se todos os animais desta espécie possuem a idade mínima especificada
_________________BABY-STEPS_____________________
fazer uma const pra receber true ou false.
achar e retornar o nome da 'espécie' e
SE a age for a mínima para todos dentro do residents[], retorna true ou false.
*/
function animalsOlderThan(animal, age) {
  const minimunAge = animals.find(specieName =>
    specieName.name === animal).residents.every(animalAge =>
      animalAge.age >= age);
  return minimunAge;
/*
______________1º-RACIOCINIO_______________
const minimunAge = animals.filter(specieName => {
  if (specieName === animal) {
    return // retorna true SE 'age' for a mínima (<=)
              para todos os animais da espécie declarada em 'animal'
  }
  return // retorna false SE pelo menos uma 'age' NÃO for a mínima (<=)
            para todos os animais da espécie declarada em 'animal'
})
*/
}

/*
Sem parâmetros, retorna um objeto vazio
Quando provido o primeiro nome do funcionário, retorna o objeto do funcionário
Quando provido o último nome do funcionário, retorna o objeto do funcionário
SE o parametro for o firstName OU o lastName do objeto em employees, retorna o objeto
SENÃO retorna um objeto{} vazio.
_________________BABY-STEPS_____________________
1º SE employeeName não for passado, retorna um objeto{} vazio.
2º Crie uma const que será retornada como objeto{}
3º Tenho que acessar o value do first 'OU' last Name do objeto dentro do array employees
usando find, some, every?
*/
function employeeByName(employeeName) {
  if (!employeeName) return {};
  const objEmployee = employees.find(name => // ache um key dentro de employees
    (name.firstName === employeeName || name.lastName === employeeName));
    // acesse o Value daquele Key
  return objEmployee; // retorna o objeto{}
}

/*
Cria um novo colaborador a partir de objetos contendo informações
pessoais = personalInfo e
associatedWith = gerentes e animais gerenciados.
Ou seja, crie um novo objeto. default deve funcionar!
_________________BABY-STEPS_____________________
1º desestruturo o objeto em id, firstName e lastName assossiando à personalInfo
2º desestruturo o objeto em managers e responsibleFor assossiando à associatedWith
3º retorno os parametros passados em um só objeto{}
*/
function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}

/*
Testa se o id passado é de um gerente
_________________BABY-STEPS____________________
1º criar uma const de saída (isId)
2º acessar o employees
3º acessar pelo menos um id dentro da key managers
4º testar true ou false para pelo menos 1 id em managers
5º retornar a saída (isId)
*/
function isManager(id) {
  const isId = employees.some(key => key.managers.some(eachId => eachId === id));
  return isId;
}

/*
Adiciona um funcionário no fim da lista
_________________BABY-STEPS____________________
1º criar uma const de saída (lastEmployee)
2º nesse objeto {}, usar um destructuring para add os parâmetros
3º atribuir aos 2 last param um array[]
4º add ao fim de employees a minha saída (lastEmployee) com .push
*/
function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const lastEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(lastEmployee);
}

/*
Sem parâmetros, returna animais e suas quantidades
Com o nome de uma espécie de animal, retorna somente a quantidade
_________________BABY-STEPS____________________
1º criar uma const obj{} onde vou atribuir o 'name': qnt(value) quando sem paran
2º Se não receber paran,
2º SE receber specie, return o residents.name(value): popularity(value)
*/
function animalCount(species) {
  const objNoParan = {};
  if (!species) {
    animals.forEach((animal) => {
      objNoParan[animal.name] = animal.residents.length;
    });
    return objNoParan;
  }
  const arrQnt = animals.find(animal => animal.name === species).residents.length;
  return arrQnt;
}

/*
Returna 0 se nenhum argumento for passado
Retorna 0 se um objeto vazio for passado
Retorna o preço total a ser cobrado dado o número de adultos, crianças e idosos
_________________BABY-STEPS____________________
1º
*/
function entryCalculator(entrants) {
  if (!entrants || Object.entries(entrants).length === 0) {
    return 0;
  }
  const allPrices = Object.keys(prices).reduce((accumulator, valor) =>
  accumulator + (prices[valor] * entrants[valor]), 0);
  return allPrices;
}

/*
Sem parâmetros, retorna animais categorizados por localização
Com opções especificadas, retorna nomes de animais
Com opções especificadas, retorna nomes de animais ordenados
Com opções especificadas, retorna somente nomes de animais macho/fêmea
Só retorna informações específicas de gênero se includeNames for setado
_________________BABY-STEPS____________________

*/
function animalMap(options) {

}

/*
Sem parâmetros, retorna um cronograma legível para humanos
Se um único dia for passado, retorna somente este dia em um formato legível para humanos
_________________BABY-STEPS____________________
1º criar um return para cada dia quando passar um parâmetro(dayName)
2º criar um return para todos os dias quando não parâmetro
*/
function schedule(dayName) {
  const objAllDays = Object.keys(hours);
  const objCadaDay = {};
  objAllDays.forEach((day) => {
    if (day !== 'Monday') {
      objCadaDay[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
    } else {
      objCadaDay[day] = 'CLOSED';
    }
  });
  if (!dayName) {
    return objCadaDay;
  }
  return ({ [dayName]: objCadaDay[dayName] });
}

/*
Passado o id de um funcionário, encontra a primeira espécie de animal gerenciado
pelo funcionário, e retorna um array com nome, sexo e idade do animal mais velho dessa espécie
_________________BABY-STEPS____________________

*/
function oldestFromFirstSpecies(id) {
  const findOldestAnimal = (old, older) => (old.age > older.age ? old : older);
  const employeeID = employees.find(employee => employee.id === id);
  const responsibleID = employeeID.responsibleFor[0];
  const animalID = animals.find(animal => animal.id === responsibleID).residents;
  const oldestAnimal = animalID.reduce(findOldestAnimal);
  const result = [];
  Object.values(oldestAnimal).forEach(key => result.push(key));
  return result;
}

/*
Ao passar uma porcentagem, incrementa todos os preços, arrendondados em duas casas decimais
_________________BABY-STEPS____________________

*/
function increasePrices(percentage) {
  function increase(entryType) {
    let newValue = prices[entryType] * (percentage / 100);
    newValue += prices[entryType];
    newValue = Math.round((newValue + Number.EPSILON) * 100) / 100;
    newValue = Number(newValue);
    prices[entryType] = newValue;
  }
  Object.keys(prices).forEach(item => increase(item));
}

/*
Sem parâmetros, retorna uma lista de funcionários e os animais pelos quais eles são responsáveis
Com o id de um funcionário, retorna os animais pelos quais o funcionário é responsável
Com o primeiro nome de um funcionário, retorna os animais pelos quais o funcionário é responsável
Com o último nome de um um funcionário, retorna os animais pelos quais o funcionário é responsável
_________________BABY-STEPS____________________
function employeeCoverage(idOrName) {
  if (!idOrName) {
    const allEmployees = employees.reduce((accumulator, employee) => {
      const animalsNames = employee.responsibleFor.map(animalID =>
        animals.find(element => animalID === element.id).name);
      accumulator[`${employee.firstName} ${employee.lastName}`] = animalsNames;
      return accumulator;
    }, {});
    return allEmployees;
  } else if (idOrName) {
    const filteredEmployee = employees.filter(emp => ( // abreviei employee para emp por causa do CC
      emp.id === idOrName || emp.firstName === idOrName || emp.lastName === idOrName
    ));
    return filteredEmployee;
  }
  return 'undefined';
}
*/
function employeeCoverage(idOrName) {
  const specieDoEmploy = {};
  employees.forEach((employee) => {
    specieDoEmploy[`${employee.firstName} ${employee.lastName}`] = employee.responsibleFor.map(
      employId => animals.find(animal => animal.id === employId).name,
    );
  });
  if (!idOrName) return specieDoEmploy;
  const allEmpAnimals = employees.find(employee =>
    idOrName === employee.id || idOrName === employee.lastName || idOrName === employee.firstName,
  );
  return {
    [`${allEmpAnimals.firstName} ${allEmpAnimals.lastName}`]: specieDoEmploy[
      `${allEmpAnimals.firstName} ${allEmpAnimals.lastName}`
    ],
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
