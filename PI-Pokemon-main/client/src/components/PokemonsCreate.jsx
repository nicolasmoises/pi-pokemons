import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {postPokemons, getTypes, getPokemons} from '../actions'
import '../css/PokemonCreated.css'

function validadora(input) {
    let error = {}
    if(!input.name || input.name.length<3 )  {
        error.name= 'igrese un nombre del pokemon'
    }else if(!input.image) {
        error.image= 'ingrese una url de imagen'
    } else if(input.types.length === 0 ){
        error.types = 'ingrese un tipo de pokemon'
    } else if(input.health.trim() === '' || input.health <1 || input.health > 100) {
        error.health= 'ingrese el health adecuado'
    } else if (input.attack.trim() === '' || input.attack <1 || input.attack > 100) {
        error.attack = 'ingrese el attack adecaudo'
    } else if (input.defense.trim() === '' || input.defense <1 || input.defense > 100) {
        error.defense = 'ingrese el defense adecaudo'
    } else if (input.speed.trim() === '' || input.speed <1 || input.speed > 100) {
        error.speed = 'ingrese el speed adecaudo'
    }  else if (input.height.trim() === '' || input.height <1 || input.height > 100) {
        error.height = 'ingrese el height adecaudo'
    } else if (input.height.trim() === '' || input.height <1 || input.height > 1000) {
        error.height = 'ingrese el height adecaudo'
    }  else if (input.weight.trim() === '' || input.weight <1 || input.weight > 1000) {
        error.weight = 'ingrese el weight adecaudo'
    }
    
    
    return error

}

export default function PokemonsCreate (){
    const dispatch = useDispatch()
    const types = useSelector((state) => state.types)
    console.log(types)
    const pokemons = useSelector((state) => state.pokemons)
    console.log('esto es pokemons', pokemons)
    const navegate = useNavigate()

    const [errors, setErrors] = useState({})
    const [input,setInput] = useState({
        image: '',
        name: '',
        types: [],
        // id: '',
        health: '',
        attack: '',
        defense: '',
        speed: '',
        height:'',
        weight:''

    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(
            validadora({
                ...input,
                [e.target.name]: e.target.value
            })
        )
        
        console.log(input)
    }

    function handleSelect (e) {
        setInput({
            ...input,
            types: input.types.includes(e.target.value)?
            input.types :
            [...input.types, e.target.value]
        })

    }

    function handleDelete (e) {
        setInput({
            ...input,
            types: input.types.filter(type => type !== e )
        })

    }

    function handleSubmit (e){
        e.preventDefault()
        if(input.name.trim() === '') {
            return alert('Ingrese un nombre')
        } else if (
             pokemons.find(e => e.name.toLowerCase().trim() === input.name.toLowerCase().trim())
            
        )
        {
        
            return alert(`El pokemon ${input.name} ya existe`)
        } else if (input.image.trim() === '') {
            return alert('Ingrese una image')
        } else if(input.health.trim() === '' || input.health <1 || input.health > 100)  {
            return alert ('coloca un puntaje del 1 al 100')
        } else if(input.attack.trim() === '' || input.attack <1 || input.attack > 100)  {
            return alert ('coloca un puntaje del 1 al 100')
        } else if(input.defense.trim() === '' || input.defense <1 || input.defense > 100)  {
            return alert ('coloca un puntaje del 1 al 100')
        } else if(input.speed.trim() === '' || input.speed <1 || input.speed > 100)  {
            return alert ('coloca un puntaje del 1 al 100')
        } else if(input.height.trim() === '' || input.height <1 || input.height > 1000)  {
            return alert ('coloca un puntaje del 1 al 1000')
        } else if(input.weight.trim() === '' || input.weight <1 || input.weight > 1000)  {
            return alert ('coloca un puntaje del 1 al 1000')
        }else if(input.types.length === 0)  {
            return alert ('Coloca 1 o mas tipos')
        }
        
        else {

            // console.log(input)
            dispatch(postPokemons(input))
            alert('pokemon creado!!')
            setInput({
                image: '',
                name: '',
                types: [],
                // id: '',
                health: '',
                attack: '',
                defense: '',
                speed: '',
                height:'',
                weight:''
            })
            navegate('/home')
        }


        
    }

    useEffect(() => {
        dispatch(getTypes())
        dispatch(getPokemons())
    },[dispatch])

    return (
        <div className='fondoC'>
            <div className='contenedorC'>

            <h1 className='h1C'>Crea tu Pokemon!!</h1>
            <br />
            <form  id='form' onSubmit={e =>handleSubmit(e)} >
                <div className='itemN'>

                    <label className='labelN'> Nombre del pokemon: </label>
                    <br />
                    <input type="text"
                    value={input.name}
                    name='name'
                    onChange={e => handleChange(e)}
                    className = 'inputN'

                    /> 

                    {/* <h3 >{input.name? false : 'se necesita nombre'}</h3> */}
                    {
                        errors.name && (
                            <p>{errors.name}</p>
                        )
                    }
                   
                </div>
                <div className='itemN'>
                    <label className='labelN'>Url imagen: </label>
                    <br />
                    <input type="text" 
                    value={input.image}
                    name='image'
                    onChange={e =>handleChange(e)}
                    className= 'inputN'
                    />
                      {
                          errors.image && (
                              <p>{errors.image}</p>
                              )
                            }
                </div>
                <div className='itemN'>
                    <select className='inputN' onChange={e => handleSelect(e)}>
                        <option disabled > Seleccionar tipos: </option>
                        {
                            types?.map((g) => (
                                <option value={g.name} key={g.id}> {g.name}</option>
                                ))
                            }
                    </select>
                    <ul className="ul">
              <li className="listaGp">
                {input.types.map((e) => (
                  <div className="divGp" key={e}>
                    {e + " "}
                    <button type="button" onClick={() => handleDelete(e)}>
                      X
                    </button>
                  </div>
                ))}
              </li>
            </ul>

            {/* <h3>{input.types false : 'se necesita un tipo'}</h3> */}
            {
                errors.types && (
                    <p>{errors.types}</p>
                )
            }
            
                </div>
                <div className='itemN'>
                    <label className='labelN'>health: </label>
                    <br />
                    <input type="number" 
                    value={input.health}
                    name='health'
                    onChange={e =>handleChange(e)}
                    className='inputN'
                    />
                    {
                        errors.health && (
                            <p>{errors.health}</p>
                            )

                    }
                </div>
                <div className='itemN'>
                    <label className='labelN'>attack: </label>
                    <br />
                    <input type="number" 
                    value={input.attack}
                    name='attack'
                    onChange={e =>handleChange(e)}
                    className='inputN'
                    /> 
                    {
                        errors.attack && (
                            <p>{errors.attack}</p>
                        )
                        
                        }
                </div>
                <div className='itemN'>
                    <label className='labelN'>speed: </label>
                    <br />
                    <input type="number" 
                    value={input.speed}
                    name='speed'
                    onChange={e =>handleChange(e)}
                    className= 'inputN'
                    />
                    {
                        errors.speed && (
                            <p>{errors.speed}</p>
                        )
                        
                        }
                </div>
                <div className='itemN'>
                    <label className='labelN'>defense: </label>
                    <br />
                    <input type="number" 
                    value={input.defense}
                    name='defense'
                    onChange={e =>handleChange(e)}
                    className= 'inputN'
                    />

{
                        errors.defense && (
                            <p>{errors.defense}</p>
                        )
                        
                        }
                </div>
                <div className='itemN'>
                    <label className='labelN' >height: </label>
                    <br />
                    <input type="number" 
                    value={input.height}
                    name='height'
                    onChange={e =>handleChange(e)}
                    className='inputN'
                    />
                    {
                        errors.height && (
                            <p>{errors.height}</p>
                        )
                        
                        }
                </div>
                <div className='itemN'>
                    <label className='labelN' >weight: </label>
                    <br />
                    <input type="number" 
                    value={input.weight}
                    name='weight'
                    onChange={e =>handleChange(e)}
                    className='inputN'
                    />
                    {
                        errors.weigth && (
                            <p>{errors.weight}</p>
                        )
                        
                        }
                    <h3>{input.weight ? false : 'se necesita un weight'}</h3>
                
                </div>
                <button className='botonN'  type='submit'>Crear pokemon</button>
                <br />
            
            </form>
            <br />
             <Link to='/home'><button className='botonV' >Volver a Home</button></Link>
            </div>
        </div>
    )
}