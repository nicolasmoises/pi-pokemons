const axios = require('axios')

const getInfoApi = async () => {
    try {
        const pokemonsRequest = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=60');
        // console.log(pokemonsRequest)
        //me devuelve los pokemons traidos con un name y una url de cada pokemon
        const pokemonsSubrequest = pokemonsRequest.data.results.map(obj => axios.get(obj.url));
        // console.log(pokemonsSubrequest)
        //hago el axios pero a la sub url TERMINAR DE VER COMO FUNCIONA EL data.results.map
        const infoUrlPokemons = await Promise.all(pokemonsSubrequest);
        //llama a todas las sub url, solicitudes simultaneas 
        let pokemons = infoUrlPokemons.map(obj => obj.data);
        // console.log('pokemons', pokemons)
        //obtengo la data de cada pokemon por su suburl
        let informacionPokemons = pokemons.map(pokemon => {
            return {
                id: pokemon.id,
                name: pokemon.name,
                height: pokemon.height,
                weight: pokemon.weight,
                health: pokemon.stats[0].base_stat,
                speed: pokemon.stats[5].base_stat,
                defense: pokemon.stats[2].base_stat,
                attack: pokemon.stats[1].base_stat,
                image: pokemon.sprites.front_default
            }
        })
        // console.log('esto es info de pokemons', informacionPokemons)
        return informacionPokemons

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getInfoApi
}