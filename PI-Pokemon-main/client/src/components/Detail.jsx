import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector  } from 'react-redux';
import { getDetail } from '../actions';
import { useEffect } from 'react';
import '../css/Detail.css'

export default function Detail () {
 
    const dispatch = useDispatch()
    const {id} = useParams()

    useEffect(() => {
        dispatch(getDetail(id))
    },[dispatch,id])

    const myPokemon = useSelector((state) => state.detail)
    console.log('esto es myPokemon', myPokemon)

    return (
        <div className='fondoD'>
            {
                myPokemon.length > 0?
                <div className='cardDetail'>
                    <h1 className='tituloD'>{myPokemon[0].name}</h1>
                    <h3 className='tiposD'> Tipos: {myPokemon[0].types?.join(', ')}</h3>
                    <br />
                    <img src={myPokemon[0].image} alt="imagen not found" />
                    <h4 className='pDetail'>health: {myPokemon[0].health}</h4>
                    <h4 className='pDetail'>speed: {myPokemon[0].speed}</h4>
                    <h4 className='pDetail'>attack: {myPokemon[0].attack}</h4>
                    <h4 className='pDetail'>defense: {myPokemon[0].defense}</h4>
                    <h4 className='pDetail'>height: {myPokemon[0].height}</h4>
                    <h4 className='pDetail'>weight: {myPokemon[0].weight}</h4>
                    <h4 className='pDetail'>ID: {myPokemon[0].id}</h4>
                </div> :
                <div>
                    <h1>Loading...</h1>
                </div>
            }
            <Link to='/home'>
                <button className='botonD'>Volver</button>
            </Link>
        </div>
    )
}