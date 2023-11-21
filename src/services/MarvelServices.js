import { useHttp } from "../hooks/http.hook";

const MarvelServices = () => {
    const {request,clearError,process,setProcess} = useHttp()
   const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
   const _apiKey = 'apikey=b626cff431ac7b4c59bd4a6d5e622135';
   const _baseOffset = 210;
  
   const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter)
    
    }
   const getCharacters = async (id) => {
        const char = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(char.data.results[0])
    }
    const _getMeSlice = (res) => {
        if(res.length === 0){
            return 'don`t description';
        }else if(res.length >= 200){
            return <a href='!#'>{res.slice(0,200)}...</a>
        }
        return res;
    }
   const  _transformCharacter = (res) => {
        return {
        id: res.id,
        name: res.name,
        description:_getMeSlice(res.description),
        thumbnail:res.thumbnail.path + '.' + res.thumbnail.extension,
        homepage:res.urls[0].url,
        wiki:res.urls[1].url,
        comics:res.comics.items,
        }
    }
    ///comics
    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics)
    }
    const getComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics/${offset}?${_apiKey}`);
        return res.data.results.map(_transformComics)
    }
    const  _transformComics = (res) => {
        return {
        id: res.id,
        title: res.title,
        description: res.description || "There is no description",
        pageCount: res.pageCount
				? `${res.pageCount} p.`
				: "No information about the number of pages",
        thumbnail:res.thumbnail.path + '.' + res.thumbnail.extension,
        language: res.textObjects[0]?.language || "en-us",
        prices: res.prices[0].price ? res.prices[0].price : "not available",
        }
    }
    const getCharacterByName = async (name) => {
		const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
		return res.data.results.map(_transformCharacter);
	};

    return {process,setProcess,getAllCharacters,getCharacters,clearError,getAllComics,getComics,getCharacterByName }
}


export default MarvelServices;
