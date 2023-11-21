import { useEffect, useState } from 'react';
import useMarvelServices from '../../services/MarvelServices';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import { Link } from 'react-router-dom';

import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';

const setContent = (process,Component,newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner/>;
        break;
        case 'loading': 
            return newItemLoading ? <Component/> : <Spinner/>;
        break;
        case 'confirmed':
            return <Component/>;
        break;
        case 'error':
            return <ErrorMessage/>;
        break;

    
        default:
            throw new Error('Unexprected process state');
    }
}

const ComicsList = () => {
    const [list,setList] = useState([]);
    const  [newItemLoading,setNewItemLoading] =  useState(false);
    const  [offset,setOffset] =  useState(0);
    const  [charended,setCharended]  =  useState(false);

    const {load,error,getAllComics,process,setProcess } = useMarvelServices();
    useEffect(() => {
        onRequest(offset,true);
    },[]);

    const onRequest = (offset,initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllComics(offset)
        .then(onCharListLoaded)
        .then(() => setProcess('confirmed'));
    }

    const onCharListLoaded = (newList) => {
        let ended = false;
        if(newList.length < 8){
            ended = true;
        }
        setList([...list, ...newList]);
        setNewItemLoading(false);
        setOffset(offset + 8);
        setCharended(ended);
    }

    function renderItems(arr){
        console.log(arr)
        const items = arr.map((item,i) => {
            return (
                <li className="comics__item" key={item.id}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.prices}$</div>
                    </Link>
                </li>
            )
        })
        return (
           
                <ul className="comics__grid">
                    {items}
                </ul>
                
        )
    }
  
    return (
        <div className="comics__list">
            {setContent(process,() => renderItems(list),newItemLoading)}
            <button className="button button__main button__long"
             disabled={newItemLoading}
             style={{'display': charended ? 'none' : 'block'}}
             onClick={() => onRequest(offset)}>
                    <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;

// const ComicsList = () => {

//     const [comicsList, setComicsList] = useState([]);
//     const [newItemLoading, setnewItemLoading] = useState(false);
//     const [offset, setOffset] = useState(0);
//     const [comicsEnded, setComicsEnded] = useState(false);

//     const {loading, error, getAllComics} = useMarvelService();

//     useEffect(() => {
//         onRequest(offset, true);
//     }, [])

//     const onRequest = (offset, initial) => {
//         initial ? setnewItemLoading(false) : setnewItemLoading(true);
//         getAllComics(offset)
//             .then(onComicsListLoaded)
//     }

//     const onComicsListLoaded = (newComicsList) => {
//         let ended = false;
//         if (newComicsList.length < 8) {
//             ended = true;
//         }
//         setComicsList([...comicsList, ...newComicsList]);
//         setnewItemLoading(false);
//         setOffset(offset + 8);
//         setComicsEnded(ended);
//     }

//     function renderItems (arr) {
//         const items = arr.map((item, i) => {
//             return (
//                 <li className="comics__item" key={i}>
//                     <a href="#">
//                         <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
//                         <div className="comics__item-name">{item.title}</div>
//                         <div className="comics__item-price">{item.price}</div>
//                     </a>
//                 </li>
//             )
//         })

//         return (
//             <ul className="comics__grid">
//                 {items}
//             </ul>
//         )
//     }

//     const items = renderItems(comicsList);

//     const errorMessage = error ? <ErrorMessage/> : null;
//     const spinner = loading && !newItemLoading ? <Spinner/> : null;

//     return (
//         <div className="comics__list">
//             {errorMessage}
//             {spinner}
//             {items}
//             <button 
//                 disabled={newItemLoading} 
//                 style={{'display' : comicsEnded ? 'none' : 'block'}}
//                 className="button button__main button__long"
//                 onClick={() => onRequest(offset)}>
//                 <div className="inner">load more</div>
//             </button>
//         </div>
//     )
// }

// export default ComicsList;