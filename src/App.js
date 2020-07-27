import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import MovieBoard from './components/MovieBoard';

import InputRange from 'react-input-range';
import "react-input-range/lib/css/index.css"

import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap'
import './App.css';

let n = 1;
let clone = [];

const apikey = "58ec1e16f6aa82d80c0564f35db2ba39";
function App() {
  let [movieList, setMovieList] = useState([]);
  let [loading, setLoading] = useState(false);
  let [valueMin,setValueMin]=useState(1970);
  let [valueMax,setValueMax]=useState(2020);
  let [defaultList,setDefaultList]=useState([]);
  const loadMore = async () => {
    setLoading(true);
    n++;
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${n}`;

    let result = await fetch(url);
    let data = await result.json();

    clone = clone.concat(data.results);
    setMovieList(clone)
    setLoading(false);
    setDefaultList(clone);
  }
  const callMovie = async () => {
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
    let result = await fetch(url);
    let data = await result.json();

    setMovieList(data.results);
    setDefaultList(movieList);
    console.log(data.results);

  }
  const handleScroll = () => {
    if (loading) return;
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
      loadMore();
    };
  };

  const search = async () => {
    let d = document.getElementById("input").value;
    if (d !== "") {
      let url = `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&language=en-US&page=1&include_adult=false&query=${d}`;


      let result = await fetch(url);
      let data = await result.json();
      setMovieList(data.results);
    }
  }
  const filterYear = async () => {
    console.log(defaultList);
    setMovieList(defaultList);
    let filterYears=[];
     let a = movieList;

     for ( let i =0;i<a.length;i++){
       let year=parseInt(a[i].release_date.slice(0,4));
       
       if (year<=valueMax && year>=valueMin){
         filterYears.push(a[i]);
       }
     }
     setMovieList(filterYears);
  }
  useEffect(() => {
    callMovie()
    window.addEventListener('scroll', () => handleScroll());
  }, []);
  useEffect(() => {
    clone = movieList;
  }, [movieList]);
 
  const SortLeastToMost = () => {
    clone = movieList.slice();

    for (let i = 0; i < clone.length - 1; i++) {
      for (let j = i + 1; j < clone.length; j++) {
        if (clone[i].popularity > clone[j].popularity) {
          let c = clone[i];
          clone[i] = clone[j];
          clone[j] = c;
        }
      }


    }
    movieList = clone;
    setMovieList(clone);
  };
  const SortMostToLeast = () => {
    clone = movieList.slice();
    for (let i = 0; i < clone.length - 1; i++) {
      for (let j = i + 1; j < clone.length; j++) {
        if (clone[i].popularity < clone[j].popularity) {
          let c = clone[i];
          clone[i] = clone[j];
          clone[j] = c;
        }
      }
    }
    // movieList=clone;
    setMovieList(clone);

  }
  const FilterTrending = async () => {
    let url = `https://api.themoviedb.org/3/trending/all/day?api_key=${apikey}`;

    let result = await fetch(url);
    let data = await result.json();
    setMovieList(data.results);
  }
  if (movieList == null) {
    return (<div>
      <h2>loading</h2>;
    </div>);
  }
  return (
    <div >
      <div className="css-scroll-class" >
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top" >
          <Navbar.Brand href="#home" onClick={()=>callMovie()}>Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
              <NavDropdown title="Sort" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1" onClick={SortLeastToMost}>Least Popular To Most Popular  </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2" onClick={SortMostToLeast}>Most Popular To Least Popular</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3" onClick={FilterTrending}>Trending</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
              <div className="range">
                <InputRange
                  maxValue={2019}
                  minValue={1970}
                  value={{min:valueMin,max:valueMax}}
                  onChange={(value)=>{setValueMin(value.min);setValueMax(value.max);filterYear();}}
                />
              </div>
            </Nav>
            <form>
              <label>
                <input type="text" name="name" id="input" className="input-search" />
              </label>
              <Button variant="dark" onClick={search} className="btn-search">Search</Button>

            </form>
          </Navbar.Collapse>
        </Navbar>
      </div>
      
        
     
      <MovieBoard movieList={movieList} />
    </div>
  );
}

export default App;
