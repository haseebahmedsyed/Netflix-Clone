import movieTrailer from 'movie-trailer';
import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube';
import { instance } from '../Requests/axioss'
import './Row.css';

function Row({ title, fetchURL, isLarge}) {
    let url = 'https://image.tmdb.org/t/p/original/'

    const [movies, setMovies] = useState([])
    const [trailerUrl , setTrailerUrl] = useState('');


    useEffect(() => {
        const getFetchResp = async () => {
            const response = await instance.get(fetchURL)
            setMovies(response.data.results);

        }
        getFetchResp()
    }, [fetchURL])

    const handleOnClick = (movie)=>{
        if (trailerUrl){
            setTrailerUrl('')
        }else{
            movieTrailer(movie?.name || movie?.title || movie?.original_title )
            .then(url=>{

                //https:www.youtube.com/watch?v=xyz
                // new URL(url).search will give value "?v=xyz"
                // new URLSearchParams gives get method "get('v')" that will give value "v=xyz"
                const urlParams =new URLSearchParams(new URL(url).search)
                setTrailerUrl(urlParams.get("v"))
            })
            .catch(error=>
                console.log(error.message))
        }
    }

    const opts = {
        height: '500',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };

    return (
        <div className='mx-5' style={{width : '100%'}}>
            <div className='my-3' ><h2 style={{color: 'white'}}>{title}</h2></div>
            <div className={isLarge? "row_posters_large mx-2" : "row_posters mx-2"}>
                {movies.map((element) => {
                    return (

                        <img onClick={()=>{handleOnClick(element)}} key={element.id} className={isLarge? "row_poster_large mx-2" : "row_poster mx-2"} src={`${url}${isLarge ? element.poster_path : element.backdrop_path}`} alt={element.original_title} />

                    )

                })}
            </div>
            <div>
                 {/* <YouTube videoId={trailerUrl} opts={opts}/> */}
                 {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
            </div>
        </div>
    )
}

export default Row
