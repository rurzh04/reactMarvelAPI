import { useParams } from 'react-router-dom';

import MarvelServices from '../../services/MarvelServices';

import './singleCharacterLayout.scss';
import { useEffect, useState } from 'react';
import { clear } from '@testing-library/user-event/dist/clear';
import ErrorMessage from '../errorMessage/ErrorMessage';
const SingleCharacterLayout = () => {
    const [data,setData] = useState([]);
    const {comicId} = useParams();
    const {name, description, thumbnail} = data;

    const {load,error,getCharacters,clearError } = MarvelServices();

    useEffect(() => {
        charUpdate(comicId)
    }, [])

    const charUpdate = (id) => {
        clearError();
        getCharacters(id).then((data) => setData(data))
    }
   
    const errorMessage = error ? <ErrorMessage/> : null;
    // const {name, description, thumbnail} = data;

    return (
        <>
        {errorMessage}
        <div className="single-comic">
            <img src={thumbnail} alt={name} className="single-comic__char-img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
        </div>
        </>
    )
}

export default SingleCharacterLayout;