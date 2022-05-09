const initialState = {
    pokemons: [],
    types: [],
    allPokemons :[],
    allTypes:[],
    detail:[]
}

function rootReducer (state= initialState, action) {
    switch(action.type) {
        case 'GET_POKEMONS':
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            }
        case 'GET_TYPES':
            return {
                ...state,
                types: action.payload,
                // allTypes: action.payload
            }
        case 'FILTER_BY_TYPES': {
            const allPokemons = state.allPokemons
            const typesFilter = allPokemons.filter(t => {
                if(t.types) {
                    const types = t.types.map(el => el)
                    return types.includes(action.payload)
                }
            })
            return {
                ...state,
                pokemons: action.payload === 'pordefecto' ? allPokemons : typesFilter
            }

        }
        case 'FILTER_CREATED': {
            const allPokemons = state.allPokemons
            const createdFilter= action.payload === 'creados'? state.allPokemons.filter(el => el.createInDb) : allPokemons.filter(el => !el.createInDb)

            return {
                ...state,
                pokemons: action.payload === 'all' ? state.allPokemons : createdFilter
            }
        }
        case 'ORDER_BY_NAME': {
            const sortName = action.payload === 'asc'?
            state.pokemons.sort(function(a,b){
                if(a.name > b.name) {
                    return 1
                }
                if(b.name > a.name) {
                    return -1
                }
                return 0
            }) :
            state.pokemons.sort(function(a,b){
                if(a.name > b.name) {
                    return -1
                }
                if(b.name > a.name) {
                    return 1
                }
                return 0
            })
            return {
                ...state,
                pokemons: sortName
            }

        }

        case 'FILTER_FUERZA': {
            const sortFuerza = action.payload === 'menorFuerza'?
            state.pokemons.sort(function(a,b){
                if(a.attack > b.attack) {
                    return 1
                }
                if(b.attack > a.attack) {
                    return -1
                }
                return 0
            }) :
            state.pokemons.sort(function(a,b){
                if(a.attack > b.attack) {
                    return -1
                }
                if(b.attack > a.attack) {
                    return 1
                }
                return 0
            })
            return {
                ...state,
                pokemons: sortFuerza
            }
        }
        case 'GET_NAME_POKEMOS': 
        return {
            ...state,
            pokemons: action.payload
        }
        case 'POST_POKEMONS': {
            return{
                ...state,
                pokemons:action.payload
            }
        }
        case 'GET_DETAILS': {
            return {
                ...state,
                detail:action.payload

            }
        }


            default: return state
        }
        

}

export default rootReducer