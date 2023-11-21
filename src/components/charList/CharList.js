import { useEffect,useState,useRef } from 'react';
import useMarvelServices from '../../services/MarvelServices';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import PropTypes from 'prop-types';
// import setContent from '../../utils/setContent'; 
import './charList.scss';


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

const CharList = (props) =>  {

    const [list,setList] =  useState([]);
    const  [newItemLoading,setNewItemLoading] =  useState(false);
    const  [offset,setOffset] =  useState(210);
    const  [charended,setCharended]  =  useState(false);

  const  {load,error,getAllCharacters,process,setProcess} = useMarvelServices();
  
  useEffect(() => {
    onRequest(offset,true);
   },[])

    const onRequest = (offset,initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true) 
    getAllCharacters(offset)
    .then(onCharListLoaded).then('confirmed')
   }


  const onCharListLoaded = (newList) => {

    let ended = false;

    if(newList.length < 9){
        ended = true
    }
    setList(list => [...list,...newList]);
    setNewItemLoading(newItemLoading => false);
    setOffset(offset => offset + 9);
    setCharended(charended => ended)
   }


      const itemRefs = useRef([]);



       const focusOnItem = (id) => {
            itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
            itemRefs.current[id].classList.add('char__item_selected');
            itemRefs.current[id].focus();

        }

      function renderItems (res){
            
            const items =  res.map((item,i) =>{
                const {name, thumbnail} = item;
                let imgStyle = {'objectFit':'cover'};
                if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
                    imgStyle = {'objectFit': 'unset'}
                }
                return (
                    <li className="char__item"
                    ref={(el) => itemRefs.current[i] = el}
                     key={item.id}
                     onClick={() => {
                        props.onCharSelected(item.id);
                        focusOnItem(i);
                    }}>
                        <img src={thumbnail} alt={name} style={imgStyle} />
                        <div className="char__name">{name}</div>
                    </li>  
                )
        })
        return (
        <ul className="char__grid">
             {items}
        </ul>
        )
        }
        return (
            <div className="char__list">
                {setContent(process,() => renderItems(list),newItemLoading)}
                <button className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': charended ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    
}
CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}
export default CharList;

