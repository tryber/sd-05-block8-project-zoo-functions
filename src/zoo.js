/*
eslint no-unused-vars: [
  'error',
  {
    'args': 'none',
    'vars': 'local',
    'varsIgnorePattern': 'data'
  }
]
*/

const data = require('./data');
const { animals, employees, prices, hours } = require('./data');

function animalsByIds(...ids) {
  if (!ids) return [];

  const [id1, id2] = ids;
  const arr = animals.filter(animal => animal.id === id1 || animal.id === id2);

  return arr;
}

function animalsOlderThan(animal, age) {
  const otters = animals.find(animales => animales.name === 'otters');

  const isOlder = otters.residents.every(resident => resident.age >= age);

  return isOlder;
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees.find(em => (em.firstName === employeeName || em.lastName === employeeName));
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;

  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  return employees.some(emp => emp.managers.some(man => man === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const lastEmployeeee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };

  employees.push(lastEmployeeee);
}


function animalCount(species) {
  const names1 = animals.map(ani => ani.name);
  const numOfResidents = animals.map(ani => ani.residents.length);

  const objConstr = {};
  names1.forEach((names, i) => (objConstr[names] = numOfResidents[i]));

  if (!species) return objConstr;

  return animals.find(an => an.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) return 0;

  const { Adult, Child, Senior } = entrants;
  const { Adult: Aprice, Child: Cprice, Senior: Sprice } = prices;

  return (Adult * Aprice) + (Child * Cprice) + (Senior * Sprice);
}

// ANCHOR animalMap() Versão grande

// Para usar dentro de animalMap ()

// const NEAnimals = animals
//   .filter(a => a.location === 'NE')
//   .map(neAnim => neAnim.name);
// const NWAnimals = animals
//   .filter(a => a.location === 'NW')
//   .map(neAnim => neAnim.name);
// const SEAnimals = animals
//   .filter(a => a.location === 'SE')
//   .map(neAnim => neAnim.name);
// const SWAnimals = animals
//   .filter(a => a.location === 'SW')
//   .map(neAnim => neAnim.name);

// const defaultMAP = {
//   NE: NEAnimals,
//   NW: NWAnimals,
//   SE: SEAnimals,
//   SW: SWAnimals,
// };

// function animalMap(options) {
//   if (!options) return defaultMAP;

//   const { includeNames = false, sorted = false, sex } = options;

//   if (includeNames) {
//     const lionsNames = [];
//     const giraffesNames = [];
//     animals
//       .filter(a => a.location === 'NE')
//       .forEach((eIsAnimal) => {
//         if (eIsAnimal.name === 'lions') {
//           eIsAnimal.residents.forEach((rrr) => {
//             if (sex === 'female') {
//               if (Object.values(rrr)[1] === 'female') {
//                 lionsNames.push(Object.values(rrr)[0]);
//               }
//             }
//             if (!sex) lionsNames.push(Object.values(rrr)[0]);
//           });
//         }
//         if (eIsAnimal.name === 'giraffes') {
//           eIsAnimal.residents.forEach((rrr) => {
//             if (sex === 'female') {
//               if (Object.values(rrr)[1] === 'female') {
//                 giraffesNames.push(Object.values(rrr)[0]);
//               }
//             }
//             if (!sex) giraffesNames.push(Object.values(rrr)[0]);
//           });
//         }
//       });

//     const tigersNames = [];
//     const bearsNames = [];
//     const elephantsNames = [];

//     animals
//       .filter(a => a.location === 'NW')
//       .forEach((eIsAnimal) => {
//         if (eIsAnimal.name === 'tigers') {
//           eIsAnimal.residents.forEach((rrr) => {
//             if (sex === 'female') {
//               if (Object.values(rrr)[1] === 'female') {
//                 tigersNames.push(Object.values(rrr)[0]);
//               }
//             }
//             if (!sex) tigersNames.push(Object.values(rrr)[0]);
//           });
//         }
//         if (eIsAnimal.name === 'bears') {
//           eIsAnimal.residents.forEach((rrr) => {
//             if (sex === 'female') {
//               if (Object.values(rrr)[1] === 'female') {
//                 bearsNames.push(Object.values(rrr)[0]);
//               }
//             }
//             if (!sex) bearsNames.push(Object.values(rrr)[0]);
//           });
//         }
//         if (eIsAnimal.name === 'elephants') {
//           eIsAnimal.residents.forEach((rrr) => {
//             if (sex === 'female') {
//               if (Object.values(rrr)[1] === 'female') {
//                 elephantsNames.push(Object.values(rrr)[0]);
//               }
//             }
//             if (!sex) elephantsNames.push(Object.values(rrr)[0]);
//           });
//         }
//       });

//     const penguinsNames = [];
//     const otterNames = [];

//     animals
//       .filter(a => a.location === 'SE')
//       .forEach((eIsAnimal) => {
//         if (eIsAnimal.name === 'penguins') {
//           eIsAnimal.residents.forEach((rrr) => {
//             if (sex === 'female') {
//               if (Object.values(rrr)[1] === 'female') {
//                 penguinsNames.push(Object.values(rrr)[0]);
//               }
//             }
//             if (!sex) penguinsNames.push(Object.values(rrr)[0]);
//           });
//         }
//         if (eIsAnimal.name === 'otters') {
//           eIsAnimal.residents.forEach((rrr) => {
//             if (sex === 'female') {
//               if (Object.values(rrr)[1] === 'female') {
//                 otterNames.push(Object.values(rrr)[0]);
//               }
//             }
//             if (!sex) otterNames.push(Object.values(rrr)[0]);
//           });
//         }
//       });
//     const frogNames = [];
//     const snakesNames = [];

//     animals
//       .filter(a => a.location === 'SW')
//       .forEach((eIsAnimal) => {
//         if (eIsAnimal.name === 'frogs') {
//           eIsAnimal.residents.forEach((rrr) => {
//             if (sex === 'female') {
//               if (Object.values(rrr)[1] === 'female') {
//                 frogNames.push(Object.values(rrr)[0]);
//               }
//             }
//             if (!sex) frogNames.push(Object.values(rrr)[0]);
//           });
//         }
//         if (eIsAnimal.name === 'snakes') {
//           eIsAnimal.residents.forEach((rrr) => {
//             if (sex === 'female') {
//               if (Object.values(rrr)[1] === 'female') {
//                 snakesNames.push(Object.values(rrr)[0]);
//               }
//             }
//             if (!sex) snakesNames.push(Object.values(rrr)[0]);
//           });
//         }
//       });

//     if (!sex && sorted) {
//       return {
//         NE: [{ lions: lionsNames.sort() }, { giraffes: giraffesNames.sort() }],

//         NW: [
//           { tigers: tigersNames.sort() },
//           { bears: bearsNames.sort() },
//           { elephants: elephantsNames.sort() },
//         ],
//         SE: [{ penguins: penguinsNames.sort() }, { otters: otterNames.sort() }],
//         SW: [{ frogs: frogNames.sort() }, { snakes: snakesNames.sort() }],
//       };
//     }

//     if (sex === 'female' || !sorted) {
//       return {
//         NE: [{ lions: lionsNames }, { giraffes: giraffesNames }],

//         NW: [
//           { tigers: tigersNames },
//           { bears: bearsNames },
//           { elephants: elephantsNames },
//         ],
//         SE: [{ penguins: penguinsNames }, { otters: otterNames }],
//         SW: [{ frogs: frogNames }, { snakes: snakesNames }],
//       };
//     }
//   }

//   if (sex === 'female') return defaultMAP;
// }

// ANCHOR - Reduced version for CodeClimate issues

// const animalsName = (nameOfAnimal, sorted, sex) => {
//   const obj = {};
//   obj[nameOfAnimal] = animals.find(
//     element => element.name === nameOfAnimal,
//   ).residents;
//   if (sex) {
//     obj[nameOfAnimal] = obj[nameOfAnimal].filter(
//       resident => resident.sex === sex,
//     );
//   }
//   obj[nameOfAnimal] = obj[nameOfAnimal].map(({ name }) => name);
//   if (sorted) obj[nameOfAnimal].sort();
//   return obj;
// };

// const animalMap = (options = {}) => {
//   const { includeNames, sex, sorted } = options;
//   const mappedAnimal = animals.reduce((animal, { name, location }) => {
//     if (!animal[location]) animal[location] = [];
//     if (includeNames) {
//       animal[location].push(animalsName(name, sorted, sex));
//     } else {
//       animal[location].push(name);
//     }
//     return animal;
//   }, {});
//   return mappedAnimal;
// };

function animalMap(options) {
  // code here
}

function schedule(dayName) {
  let obj = {};

  // Construindo objeto

  Object.entries(hours).forEach((day) => {
    if (day[1].open === day[1].close) {
      obj[day[0]] = 'CLOSED';
    } else {
      obj[day[0]] = `Open from ${day[1].open}am until ${(((day[1].close + 11) % 12) + 1)}pm`;
    }
  });

  // Objeto contruido. Se for especificado dia, objeto tera só dia especificado.
  if (dayName) {
    const diaSelecionado = Object.entries(obj).find(e => e[0] === dayName);
    obj = {};
    obj[diaSelecionado[0]] = diaSelecionado[1];
  }

  return obj;
}

const findOldest = (old, oldest) => {
  if (old.age < oldest.age) {
    return oldest;
  }
  return old;
};

function oldestFromFirstSpecies(id) {
  const animalID = employees.find(e => e.id === id).responsibleFor[0];
  const animalFoundObj = animals.find(e => e.id === animalID);
  const olderAnimal = animalFoundObj.residents.reduce(findOldest);
  const { name, sex, age } = olderAnimal;

  return [name, sex, age];
}

// Função distribúida pelos alunos para resolver o problema do número.
function roundNum(num, length) {
  const number = Math.round(num * (10 ** length)) / (10 ** length);
  return number;
}

function increasePrices(percentage) {
  const { Adult: Aprice, Child: Cprice, Senior: Sprice } = prices;

  const newPrices = {
    Adult: roundNum(Aprice + (Aprice * (percentage / 100)), 2),
    Senior: roundNum(Sprice + (Sprice * (percentage / 100)), 2),
    Child: roundNum(Cprice + (Cprice * (percentage / 100)), 2),
  };

  Object.assign(prices, newPrices);
}

// ANCHOR employeeCoverage Functions

const findAnimalsUnderResponse = (funcionario) => {
  const animalsUnderResponseInterno = [];

  funcionario.responsibleFor.forEach((animalID) => {
    animalsUnderResponseInterno.push((animals.find(animal => animal.id === animalID).name));
  });
  return animalsUnderResponseInterno;
};


//  Main call
function employeeCoverage(idOrName) {
  const obj = {};
  let filteredEmployees = employees;

  if (idOrName) {
    filteredEmployees = employees.filter(emp => (
      emp.id === idOrName || emp.firstName === idOrName || emp.lastName === idOrName
    ));
  }

  filteredEmployees.forEach((employee) => {
    const animalsUnderResponseOfFiltEmployess = findAnimalsUnderResponse(employee);
    obj[`${employee.firstName} ${employee.lastName}`] = animalsUnderResponseOfFiltEmployess;
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
