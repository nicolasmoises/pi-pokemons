const { Router } = require('express');
const axios = require('axios')
const {getAllInfo} = require('./getAllInfo');
const {getInfoApi} = require('./getInfoApi')
const {Pokemon,Type} = require('../db')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/pokemons', async (req,res) => {
  try {
    let {name} = req.query
  let pokemons = await getAllInfo()
  // console.log('esto es infototal',pokemons)
  if(name) {
    let pokemon =  pokemons.filter(e => e.name.toLowerCase() === name.toLocaleLowerCase())
    pokemon.length ? 
    res.send(pokemon) :
    res.status(404).send('no existe el nombre solicitado')
  }
  else {
    res.status(200).send(pokemons)
  }
} catch (error) {
  console.log(error)
}
})

router.get('/pokemons/:id', async (req,res) => {
  try {
    let {id} = req.params;
    let pokemons = await getAllInfo();
    if(id) {
      let pokemonId = await pokemons.filter(el => el.id == id)
      pokemonId.length ? 
      res.send(pokemonId) :
      res.send('no mi ray esa id no es, ta loquito vo')
    }
  } catch (error) {
    console.log(error)
  }
})

router.get('/types', async (req,res) => {
  try {
    let api = await axios.get('https://pokeapi.co/api/v2/type')
    // console.log(api)
    let types = api.data.results.map(e => e.name)
    // console.log(types)
    types.forEach(el => {
      if(el !== undefined) {
        Type.findOrCreate ({
          where: {name:el}
        })
      }
    });
    const typesAll = await Type.findAll()
    // console.log('esto es alltypes', typesAll)
    res.send(typesAll)
    
  } catch (error) {
    console.log(error)
  }
})

router.post('/pokemon', async (req,res) => {
  try {
    let {name,image, types, id,attack,defense,speed,weight,health, createInDb}  = req.body
    let createPokemon = await Pokemon.create({
      name,
      image,
      id,
      attack,
      defense,
      speed,
      weight,
      health,
      createInDb
    })
    // console.log('esto es createType', createPokemon)
    let typesDb = await Type.findAll({
      where: {name:types}
    }) 
    // console.log('esto es typesDb', typesDb)
    createPokemon.addTypes(typesDb)
    // console.log(createPokemon)
    res.send('el pokemon fue creado con exito mi rey')
  } catch (error) {
    console.error(error)
  }

})

router.get('/pokemon', async(req,res) => {
  try {
    let pokemon = await Pokemon.findAll()
    pokemon?
    res.send(pokemon) :
    res.status(404).send('emm ñiopp')
    
  } catch (error) {
    console.log(error)
  }
})
  


module.exports = router;
