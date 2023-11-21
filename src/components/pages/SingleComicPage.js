import { useState,useEffect } from 'react';
import useMarvelServices from '../../services/MarvelServices';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './SingleComicPage.scss';
import xMen from '../../resources/img/x-men.png';
import { Link, useParams } from 'react-router-dom';


const SingleComicPage = () => {
    const {comicId} = useParams();
    const [comic,setComic] = useState(null);
    const {load,error,getComics,clearError } = useMarvelServices();
    useEffect(() => {
        updateChar(); 
    }, [comicId])

    const  updateChar = () => {
        clearError();
        getComics(comicId).then(onComicLoaded);
    }
    const  onComicLoaded = (comic) => {
        setComic(comic);
    }
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = load ? <Spinner/> : null;

    const content = !(load || error || !comic) ? <View comic={comic}/> : null;
    return (
        <>
        {errorMessage}
        {spinner}
        {content}

        </>
    
    )
}

const View = ({comic}) => {
    const {title,description,pageCount,thumbnail,language,prices} = comic[0];
    return (
        <div className="single-comic">
        <img src={thumbnail} alt="x-men" className="single-comic__img"/>
        <div className="single-comic__info">
            <h2 className="single-comic__name">{title}</h2>
            <p className="single-comic__descr">{description}</p>
            <p className="single-comic__descr">{pageCount}</p>
            <p className="single-comic__descr">{language}</p>
            <div className="single-comic__price">{prices}</div>
        </div>
        <Link to="/comics" className="single-comic__back">Back to all</Link>
    </div>
    )
}

export default SingleComicPage;