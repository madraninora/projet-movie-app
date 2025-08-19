import React,{useEffect, useState} from "react";
import { FaSearch } from "react-icons/fa";
import Card from "./Card";
let API_key ="api_key=c82ab0405fb981cfd52454edfc40eb87";
let base_url = "https://api.themoviedb.org/3";
let url = "https://api.themoviedb.org/3/movie/popular?api_key=c82ab0405fb981cfd52454edfc40eb87";
let arr = ["Popular","Theatre","Kids","Drama","Comedie"];

const Main = () => {
    const [movieData,setData]=useState([]);
    const [url_set,setUrl]=useState(url);
    const [search,setSearch]=useState();

    useEffect(()=>{
        fetch(url_set).then(res=>res.json()).then(data=>{
            // console.log(data.results);
            setData(data.results);
        });

    },[url_set])

    const getData=(movieType)=>{
        if(movieType=="Popular") {
            url="https://api.themoviedb.org/3/movie/popular?api_key=c82ab0405fb981cfd52454edfc40eb87";
        }
        if(movieType=="Theatre") {
            url="https://api.themoviedb.org/3/movie/now_playing?api_key=c82ab0405fb981cfd52454edfc40eb87";
        }
        if(movieType=="Kids") {
            url="https://api.themoviedb.org/3/discover/movie?api_key=c82ab0405fb981cfd52454edfc40eb87&with_genres=10751";
        }
        if(movieType=="Drama") {
            url="https://api.themoviedb.org/3/discover/movie?api_key=c82ab0405fb981cfd52454edfc40eb87&with_genres=18";
        }
        if(movieType=="Comedie") {
            url="https://api.themoviedb.org/3/discover/movie?api_key=c82ab0405fb981cfd52454edfc40eb87&with_genres=35";
        }
        setUrl(url);

    }
        const searchMovie = (evt) => {
            if (evt.key === "Enter") {
                const searchUrl = "https://api.themoviedb.org/3/search/movie?api_key=c82ab0405fb981cfd52454edfc40eb87&query=" + search;
                setUrl(searchUrl);
                setSearch("");
            }
        }
    return (
        <>
           <div className="header">
            <nav>
                <ul>
                    {
                        arr.map((value)=>{
                            return(
                                <li><a href="#" name={value} onClick={(e)=>{getData(e.target.name)}}> {value} </a></li>
                            )
                        })
                    }
                </ul>
            </nav>
            <form>
                <div className="search-btn">
                    <input type="text" placeholder="Enter Movie Name" 
                     className="inputText" onChange={(e)=>{setSearch(e.target.value)}} 
                     value={search} onKeyDown={searchMovie}>
                    </input>
                    <button><FaSearch /></button>

                </div>
            </form>
           </div>
           <div className="container">
            {
                (movieData.length === 0) ? <p className="notfound">Not Found</p> : movieData.map((res, pos) => {
                    return (
                        <Card info={res} key={pos} />
                    )
                })
            }
           </div>
        </>
    )
}

export default Main;