const axios = require('axios')

const getInfoApi = async () => {
    try {
        const pokemonsRequest = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=120');
        const pokemonsSubrequest = pokemonsRequest.data.results.map(obj => axios.get(obj.url));
        const infoUrlPokemons = await Promise.all(pokemonsSubrequest);
        let pokemons = infoUrlPokemons.map(obj => obj.data);
        // console.log('pokemons', pokemons)
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
                image: pokemon.sprites.front_default,
                types: pokemon.types.map((e) => e.type.name)
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