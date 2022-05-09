import React from 'react';
import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getPokemons, getTypes, filterPokemonsByTypes,filterCreated,orderByName,filterFuerza} from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar';
import loadingBar from '../css/pokemon_gif_9.gif'
import '../css/Home.css'

export default function Home () {
    const dispatch = useDispatch()
    const allPokemons= useSelector((state) => state.pokemons)
    // console.log(allPokemons)
    const types = useSelector((state) => state.types)
    const [orden,setOrden]= useState('')

    const  [currentPage, setCurrentPage] = useState(1)
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12)
    const indexOfLastPokemons = currentPage * pokemonsPerPage // 12
    const indexOfFirstPokemons = indexOfLastPokemons - pokemonsPerPage // 0
    const currentPokemons = allPokemons.slice(indexOfFirstPokemons, indexOfLastPokemons)
    console.log(currentPokemons)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const [loading,setLoading]= useState(true)
    const [error, setError] = useState(false)



    useEffect(()=> {
        dispatch(getPokemons())
        .then((reponse) => {
            setLoading(false)
        })
        .catch((error) => setError(error.message))
        dispatch(getTypes())
    }, [dispatch])

    function handleClick(e) {
        e.preventDefault()
        dispatch(getPokemons())
        setCurrentPage(1)
    }
    function handleFilterTypes (e) {
        dispatch(filterPokemonsByTypes(e.target.value))
        setCurrentPage(1)
    }

    function handleFilterCreated (e) {
        dispatch(filterCreated(e.target.value))
        setCurrentPage(1)
    }
    function handleSort(e) {
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }
    function handleSortFuerza(e) {
        e.preventDefault()
        dispatch(filterFuerza(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }

    if(error){
        return (
            <div>
                <h1>{error}</h1>
            </div>
        );
    }

    if(loading) {
        return (
            <div className='contendor1'>
                <img src={loadingBar} alt='loading..' />
                <br />
                <h1 className='loading'>Cargando espere...</h1>
            </div>
        )
    }


    return(
        <div className='contendor1'>
            <h1 className='titulo'>Pokemons</h1>
            <div className='contenedor1'>

            <SearchBar/>
            <button onClick={e=> handleClick(e)} className='botonCargar'>Volver a cargar los pokemons</button>
            </div>
            <div >
                <div >

                <select onClick={e=> handleSort(e)} className='selector'>
                    <option value="asc">Ascendente</option>
                    <option value='desc'>Descendente</option>
                </select>
            <select onChange={el => handleFilterCreated(el)} className='selector'>
                <option value="all">Todos los pokemons</option>
                <option value="api">Existentes</option>
                <option value="creados">Creados</option>
            </select>
            <select onChange={el => handleFilterTypes(el) } className='selector'>
                <option value="pordefecto">Tipos</option>
                {
                    types?.map(t => {
                        return (
                            <option key={t.id} value={t.name}>{t.name}</option>
                            )
                        })
                        
                    }
            </select>
            <select onChange={el => handleSortFuerza(el)} className='selector'>
                <option value="fuerza">Fuerza</option>
                <option value="mayorFuerza">Mayor fuerza</option>
                <option value="menorFuerza">Menor fuerza</option>
            </select>
                </div>
            <div>

            <Paginado
            pokemonsPerPage={pokemonsPerPage}
            allPokemons = {allPokemons.length}
            paginado = {paginado}     
            />
            </div>
           
            </div>
            <div className='cardsContenedor'>
          {currentPokemons.length > 0 ? (
              currentPokemons.map((e) => {
                  return (
                      <div key={e.id}>
                  <Link to={"/home/" + e.id}>
                  <Card name={e.name} image={e.image} types={e.types} />
                  </Link>
                </div>
              );
            })
            ) : (
                <div className='error'>
              <h1>ERROR, No hay datos</h1>
            </div>
          )}
        </div>
        <div>

        <Paginado
            pokemonsPerPage={pokemonsPerPage}
            allPokemons = {allPokemons.length}
            paginado = {paginado}      
            />
        </div>


        <Link to='/pokemon'><button className='botonCreated'> <span>Crear nuevo pokemon </span></button></Link>

        </div>
    )
}