import axios from 'axios';

export function getPokemons () {
    return  function(dispatch) {
        return axios.get('http://localhost:3001/pokemons')
        .then((response) => {
             dispatch ({
              type: 'GET_POKEMONS',
              payload: response.data  
            })
        })
    }
}

export function getTypes () {
    return async function(dispatch) {
        let json = await axios('http://localhost:3001/types')
        return dispatch ({
            type: 'GET_TYPES',
            payload: json.data
        })
    }
}

export function filterPokemonsByTypes (payload) {
    return {
        type: 'FILTER_BY_TYPES',
        payload
    }

}

export function filterCreated(payload) {
    return {
        type: 'FILTER_CREATED',
        payload
    }
}

export function  orderByName (payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }

}

export function filterFuerza (payload) {
    return {
        type: 'FILTER_FUERZA',
        payload
    }

}

export function getNamePokemos (payload) {
    return async function(dispatch) {
        try {
            let json = await axios.get('http://localhost:3001/pokemons?name=' + payload)
            return dispatch ({
                type: 'GET_NAME_POKEMOS',
                payload:json.data
            })
        } catch (error) {
            console.log(error)
        } return dispatch ({
            type: 'GET_NAME_POKEMOS',
            payload:[]
        })
    }
}

export function postPokemons (payload) {
    return async function (dispatch) {
        const json = await axios.post('http://localhost:3001/pokemon',payload)
        console.log(json)
        return json
    }
}

export function getDetail (id) {
    return  function(dispatch){
        try {
            return axios.get('http://localhost:3001/pokemons/' + id)
            .then((response) => {
                return dispatch({
                    type: 'GET_DETAILS',
                    payload: response.data
                })

            })
        } catch (error) {
            console.log(error)
        }
    }
}
