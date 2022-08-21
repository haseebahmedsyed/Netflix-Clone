import React, { useEffect, useState } from 'react'
import { instance } from '../Requests/axioss'
import './Banner.css'

function Banner({ fetchURL }) {
    let url = 'https://image.tmdb.org/t/p/original'
    const [movie, setMovie] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const resp = await instance.get(fetchURL);
            setMovie(resp.data.results[Math.floor(Math.random() * resp.data.results.length)])
            // console.log(movie)
        }
        fetchData()
    }, [fetchURL])


    return (
        <>
        <header className='banner' style={{ backgroundImage: `url(${url}${movie.backdrop_path})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>

            <div className="banner_content">
                <h1 className="banner_heading" >
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>

                <div className="banner_buttons mx-3" style={{paddingLeft : '200px'}}>
                    <button type="button" class="btn btn-outline-success mx-3" style={{fontSize: '23px' , fontWeight:'500' , fontStyle:'italic' ,border:'3px solid black',color : 'white', borderRadius : '5px'}}>Play</button>
                    <button type="button " class="btn btn-outline-success mx-3" style={{fontSize: '23px' , fontWeight:'500' , fontStyle:'italic' , border:'3px solid black',color : 'white', borderRadius : '5px'}}>My List</button>
                </div>

                <div className="banner_desc my-4" >
                    {movie.overview}
                </div>
            </div>

        <div className="ending"/>
        </header>
        </>

    )
}

export default Banner
