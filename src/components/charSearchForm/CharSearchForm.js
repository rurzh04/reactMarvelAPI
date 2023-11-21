import { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form'
import { Link,NavLink } from 'react-router-dom';
import MarvelServices from '../../services/MarvelServices';

import './charSearchForm.scss';




 const CharSearchForm = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    
    const [search,setSearch] = useState(null);
    const [name,setName] = useState();
    const {getCharacterByName,clearError }  = MarvelServices();


    const updateSearch = (name) => {
        clearError();
        getCharacterByName(name).then(searchDate)
    }

    const searchDate = (date) => {
        setSearch(date)
    }
   
    const onSubmit = ({charName}) => updateSearch(charName);

    console.log(search)

    return (
        <div className="char__search-form">
             <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                    <div className="char__search-wrapper">
                        <input  
                            id="charName" 
                            name='charName' 
                            type='text' 
                            placeholder="Enter name"
                            {...register("charName", { required: true })} 
                              aria-invalid={errors.charName ? "true" : "false"}
                            />
                        <button 
                            type='submit' 
                            className="button button__main"
                            >
                            <div className="inner">find</div>
                        </button>
                       
                    </div>
                    {errors.charName?.type === 'required' && <div  className="char__search-error">This field is required</div>}
                    {!search ? null :  search.length > 0  ? (
                        
                          <div className="char__search-wrapper">
                          <div className="char__search-success">{`There is! Visit ${search[0].name} page?`}</div>
                          <Link to={`/characters/${search[0].id}`} className="button button__secondary">
                              <div className="inner">To page</div>
                          </Link>
                         </div> 
                    ) : (
                        <div className="char__search-error">
                        The character was not found. Check the name and try again
                       </div>
                    ) }
                </form>
        </div>
    )
 }

 export default CharSearchForm

