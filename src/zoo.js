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

function animalsByIds(a, b) {
  const arrFiltered = data.animals.filter(selected => selected.id === a || selected.id === b);
  return arrFiltered;
}

function animalsOlderThan(animal, age) {
  const test = data.animals.filter(selected => selected.name === animal);
  const isOlder = test[0].residents.every(animaL => animaL.age >= age);
  return isOlder;
}

function employeeByName(name) {
  const info = data.employees;
  const arr = info.filter(a => a.firstName === name || a.lastName === name);
  return arr[0] !== undefined ? arr[0] : {};
}

function createEmployee(personalInfo, associatedWith) {
  const obj = { ...personalInfo, ...associatedWith };
  return obj;
}

function isManager(id) {
  const test = data.employees.some(a => a.managers.includes(id) === true);
  return test;
}

function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = [],
) {
  const obj = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(obj);
}

function animalCount(species) {
  const animalsCount = {};
  const animalD = data.animals;
  if (species === undefined) {
    for (let i = 0; i < data.animals.length; i += 1) {
      animalsCount[animalD[i].name] = animalD[i].residents.length;
    }
    return animalsCount;
  }
  const test = data.animals.filter(selected => selected.name === species);
  return test[0].residents.length;
}

function entryCalculator(entrants) {
  let totalPrice = 0;
  if (entrants === undefined || entrants === {}) return totalPrice;
  const adultPrice = data.prices.Adult;
  const seniorPrice = data.prices.Senior;
  const childPrice = data.prices.Child;
  if (entrants.Adult !== undefined) totalPrice += entrants.Adult * adultPrice;
  if (entrants.Senior !== undefined) {
    totalPrice += entrants.Senior * seniorPrice;
  }
  if (entrants.Child !== undefined) totalPrice += entrants.Child * childPrice;
  return totalPrice;
}

function animalMap(options = { includeNames: false, sorted: false, sex: ['male', 'female'] }) {
  const obj = { NE: [], NW: [], SE: [], SW: [] };
  const allRegions = Object.keys(obj);
  allRegions.forEach((region) => {
    const eachRegion = data.animals.filter(animal => animal.location === region);
    if (options.includeNames !== true) {
      obj[region] = eachRegion.map(animal => animal.name);
    }
    if (options.includeNames === true) {
      eachRegion.forEach((animal) => {
        const generalAnimal = animal.name;
        let names = animal.residents.map(nomes => nomes.name);
        if (options.sex === 'female') {
          const femeas = animal.residents.filter(sexo => sexo.sex === 'female');
          names = femeas.map(nome => nome.name);
        }

        if (options.sorted === true) names.sort();
        obj[region].push({ [generalAnimal]: names });
      });
    }
  });

  return obj;
}

function schedule(dayName) {
  const scheduled = {};
  const allSchedule = Object.keys(data.hours);
  allSchedule.forEach((day) => {
    if (day === 'Monday') {
      scheduled[day] = 'CLOSED';
    } else {
      scheduled[day] = `Open from ${data.hours[day].open}am until ${
        data.hours[day].close - 12
      }pm`;
    }
  });
  if (dayName !== undefined) return { [dayName]: scheduled[dayName] };
  return scheduled;
}

function oldestFromFirstSpecies(id) {
  const animalID = data.employees.filter(employee => employee.id === id)[0].responsibleFor[0];
  const animalResidents = data.animals.filter(animal => animal.id === animalID)[0].residents;
  const oldestAge = animalResidents[0].age;
  let oldest = [];
  animalResidents.forEach((age) => {
    if (age.age >= oldestAge) {
      oldest = [];
      oldest.push(age.name);
      oldest.push(age.sex);
      oldest.push(age.age);
    }
  });
  return oldest;
}

function increasePrices(percentage) {
  const adult = data.prices.Adult;
  const senior = data.prices.Senior;
  const child = data.prices.Child;
  data.prices.Adult = ((Math.ceil((adult + (adult * (percentage / 100))) * 100)) / 100);
  data.prices.Senior = ((Math.ceil((senior + (senior * (percentage / 100))) * 100)) / 100);
  data.prices.Child = ((Math.ceil((child + (child * (percentage / 100))) * 100)) / 100);
  return data.prices;
}

function employeeCoverage(id) {
  const obj = {};
  const findAnimal = idN => data.animals.find(animal => animal.id === idN);
  function finder(i) {
    const tester = i;
    if (i.firstName === id || i.lastName === id || i.id === id) {
      return tester;
    }
    return 0;
  }
  if (id === undefined) {
    data.employees.forEach((employee) => {
      obj[`${employee.firstName} ${employee.lastName}`] = [];
      const position = obj[`${employee.firstName} ${employee.lastName}`];
      employee.responsibleFor.forEach(animalR => position.push(findAnimal(animalR).name));
    });
  } else {
    const resultado = data.employees.find(a => finder(a));
    obj[`${resultado.firstName} ${resultado.lastName}`] = [];
    const position = obj[`${resultado.firstName} ${resultado.lastName}`];
    resultado.responsibleFor.forEach(animalRT => position.push(findAnimal(animalRT).name));
  }
  return obj;
}

employeeCoverage('Stephanie');
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
