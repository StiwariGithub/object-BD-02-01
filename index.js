const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;
let person = {
  firstname: 'pankaj',
  lastname: 'pand',
  gender: 'Male',
  age: 30,
  isMembership: true,
};

app.get('/person', (req, res) => {
  res.json(person); // used json as need to send the object not string
});

function getPersonFirstNameAndGender(person) {
  let personDetail = {
    firstName: person.firstname,
    gender: person.gender,
  };
  return personDetail;
}
app.get('/personDetails', (req, res) => {
  res.json(getPersonFirstNameAndGender(person));
});

function getPersonUpdatedObject(person, ageByToIncrease) {
  console.debug(ageByToIncrease);
  person.age = person.age + parseFloat(ageByToIncrease);
  return person;
}
app.get('/person/updateAge', (req, res) => {
  let ageBy = req.query.ageToIncreament;
  let updatedPerson = getPersonUpdatedObject(person, ageBy);
  res.json(updatedPerson);
});
function getFullName(person) {
  let fullname = person.firstname + person.lastname;
  return fullname;
}
function getFullNameAndMembership(person) {
  return {
    fullname: getFullName(person),
    isMembership: person.isMembership,
  };
}
app.get('/fullName-membership', (req, res) => {
  let fullNameAndMembership = getFullNameAndMembership(person);
  return res.json(fullNameAndMembership);
});

function getFinalPrice(totalPrice, ishMember) {
  let finalTotal;
  if (ishMember === true) {
    return totalPrice - totalPrice * 0.1;
  } else {
    return totalPrice;
  }
}
app.get('/discountOnTotal', (req, res) => {
  let totalPrice = parseFloat(req.query.total);
  let totalAfterDiscount = getFinalPrice(totalPrice, person.isMembership);

  return res.json({ totalAfterDiscount: totalAfterDiscount });
});
function discountOnCartToral(totalPrice, isMember) {
  let finalTotalPrice;
  if (totalPrice > 500 && isMember) {
    return totalPrice;
  } else {
    return totalPrice + 99;
  }
}
app.get('/discount-cartTotal', (req, res) => {
  let totalPrice = parseFloat(req.query.total);
  return res.json(discountOnCartToral(totalPrice, person.isMembership));
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
