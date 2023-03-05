const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  cep: String,
  logradouro: String,
  bairro: String,
  localidade: String,
  uf: String,
});

//Modelagem de Usuário
const personSchema = new mongoose.Schema({
  name: String,
  address: {
    type: addressSchema,
    //uma pessoa só pode ser criada se um endereço válido for fornecido.
    required: true,
  },
});



const Person = mongoose.model('Person', personSchema);

module.exports = Person;
  