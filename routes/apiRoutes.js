const router = require('express').Router()
const Person = require('../model/User')
const axios = require('axios');

async function getAddressFromViaCEP(cep) {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    const addressData = response.data;
  
    if (addressData.erro) {
      throw new Error('Endereço não encontrado');
    }

    const address = {
      cep: addressData.cep,
      logradouro: addressData.logradouro,
      bairro: addressData.bairro,
      localidade: addressData.localidade,
      uf: addressData.uf,
    };
  
    return address;
}

router.post('/', async (req, res) => {
  const { name, address: { cep } } = req.body;

  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    const addressData = response.data;

    if (addressData.erro) {
      throw new Error('Endereço não encontrado');
    }

    const address = {
      cep: addressData.cep,
      logradouro: addressData.logradouro,
      bairro: addressData.bairro,
      localidade: addressData.localidade,
      uf: addressData.uf,
    };

    const person = new Person({
      name,
      address,
    });

    await person.save();

    res.send('Person created successfully');
  }
   catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/', async (req, res) => {
    try {
        const user = await Person.find()
        res.status(200).json(user)
    } catch (error) {
        res.sendFile(__dirname+'view/index.html')
        res.status(500).json({error: error})
    }
  })

router.get('/:id', async(req, res) => {
  //Extraindo o parametro id, pois não vem no body da requisição
  const id = req.params.id
  try {
      const person = await Person.findOne({_id: id})
  
       if(!person){
          res.status(424).json({message: "Pessoa não encontrada"})
           return;
      }
  
    res.status(200).json(person)
  } catch (error) {
      res.status(500).json({error: error})
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params; // Obtém o ID a partir da URL
    const { name, address: { cep } } = req.body; // Obtém os dados atualizados da requisição
  
    try {
      const person = await Person.findById(id); 
  
      if (!person) {
        return res.status(404).send('Person not found');
      }
  
      const updatedAddress = await getAddressFromViaCEP(cep); 
      person.name = name;
      person.address = updatedAddress;
  
      await person.save();
  
      res.send(person); // Retorna a pessoa atualizada como resposta
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
});

router.delete('/:id', async(req, res) => {
  const { id } = req.params;

  const { name, address, } = req.body;

  const person = await Person.findById(id);

  if(!person){
      res.status(424).json({message: "Pessoa não encontrada"})
      return;
  }

  try {
      // A variavel "_id" representa o id no mongodb
      await Person.deleteOne({_id: id})
      res.status(200).json({messag: "Usuário deletado com sucesso"})

  } catch (error) {
      res.status(500).json({error: error})
  }

})

module.exports = router