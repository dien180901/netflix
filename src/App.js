import React,{useEffect,useState} from 'react';
import './App.css';
import MovieBoard from './components/MovieBoard';

const apikey = process.env.REACT_APP_APIKEY;
function App() {
  let [movieList,setMovieList]=useState(null);
  const callMovie = async()=>{
    let url=`https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
    let result= await fetch(url);
    let data =await result.json();
    setMovieList(data.results);
    console.log(data);
    }
  useEffect(()=>{
    callMovie()
  },[]);
  if (movieList==null){
    return(<div>
      <h2>loading</h2>;
    </div>);
  }
  return (
    // <div>
      <MovieBoard movieList={movieList}/>
    // </div>
  );
}

export default App;
