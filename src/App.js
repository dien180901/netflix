import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import MovieBoard from './components/MovieBoard';
import $ from 'jquery';
import InputRange from 'react-input-range';
import "react-input-range/lib/css/index.css"

import { Navbar, Nav, NavDropdown, Button, Form, FormControl } from 'react-bootstrap'
import './App.css';

let n = 1;
let clone = [];

const apikey = "58ec1e16f6aa82d80c0564f35db2ba39";
function App() {
  let [movieList, setMovieList] = useState([]);
  let [loading, setLoading] = useState(false);
  let [valueMin, setValueMin] = useState(1970);
  let [valueMax, setValueMax] = useState(2020);
  let [defaultList, setDefaultList] = useState([]);
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
    let filterYears = [];
    let a = movieList;

    for (let i = 0; i < a.length; i++) {
      let year = parseInt(a[i].release_date.slice(0, 4));

      if (year <= valueMax && year >= valueMin) {
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
  $('.navTrigger').click(function () {
    $(this).toggleClass('active');
    console.log("Clicked menu");
    $("#mainListDiv").toggleClass("show_list");
    $("#mainListDiv").fadeIn();

  });
  $(window).scroll(function () {
    if ($(document).scrollTop() > 50) {
      $(".nav").addClass("affix");
      console.log("OK");
    } else {
      $(".nav").removeClass("affix");

    }
  });

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
      {/* <div className="css-scroll-class" >
        
      </div> */}
      <div>
        <nav className="nav">
          <div className="dm-container">
            <div className="logo">
              <a href="#"><img src="images/netflix-logo.jpg" className="dm-logo" /></a>
            </div>
            <div className="dm-navListContainer">
              <div id="mainListDiv" className="main_list">
                <ul className="dm-navlinks">
                  <li><a href="#">Home</a></li>
                  <li><a href="#">TV Shows</a></li>
                  <li><a href="#">Movies</a></li>
                  <li><a href="#">Latest</a></li>
                  <li><a href="#">My List</a></li>
                </ul>
              </div>
              <div id="mainListDiv" className="main_list">
                <ul className="navlinks">
                  <div className="search-box">
                  <input className="search-txt" type="text" name="" placeholder="Type to search"/>
                  <a className="icon" href="#" ><i className="fas fa-search fa-lg dm-icon"></i></a>
                </div>
                  
                  <li><a href="#">Portfolio</a></li>
                  <li><a href="#">Services</a></li>
                  <li><a href="#">Contact</a></li>
                </ul>
              </div>
            </div>

            <span className="navTrigger">
              <i></i>
              <i></i>
              <i></i>
            </span>
          </div>
        </nav>
      </div>


      {/* <MovieBoard movieList={movieList} /> */}
    </div>
  );
}

export default App;
