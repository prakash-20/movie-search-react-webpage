import React, { useState, useEffect } from "react";
import "./App.css";
import arrowicon from "./assets/icons/arrow-back.png";
import closeicon from "./assets/icons/close-icon.png";
import searchicon from "./assets/icons/search-icon.png";
import clearicon from "./assets/icons/clear-icon.png";
import reloadicon from "./assets/icons/reload-icon.png";
import Searchresult from "./searchresult";
import Axios from "axios";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [list, setList] = useState("");
  const [recentsearch, setRecentSearch] = useState([
    { list: "Master" },
    { list: "Man" },
    { list: "Fast" },
    { list: "Zombie" },
  ]);
  const [recentsearchitems, setReacentsearchItems] = useState([]);
  const [isAlphabet, setIsAlphabet] = useState(true);
  const [isSearch, setIsSearch] = useState(false);
  const [isError, setIsError] = useState(false);
  const [movies, setMovies] = useState([]);

  var res = "False";
  const getinfo = async (searchkey) => {
    const url = `https://www.omdbapi.com/?s=${searchkey}&apikey=4a3b711b`;
    console.log(url);
    var result = await Axios.get(url);
    res = result.data.Response;
    if (res === "False") {
      setIsError(false);
      console.log(result);
      console.log(res);
    } else {
      setMovies(result.data.Search);
      console.log(result);
      console.log(res);
      console.log(movies);
      setIsError(true);
    }
  };
  useEffect(() => {
    console.log(res);
    if (res === "False") setIsError(false);
    else setIsError(true);
  }, [res]);

  const recenthandler = (e) => {
    if (e.target.outerText) {
      let listchange = e.target.outerText;
      console.log(listchange);
      setList(listchange);
      console.log(e.target.outerText);
      console.log(list.length);
      console.log(movies);
      getinfo(listchange);
      setList("");
      showsearch();
    }
  };

  useEffect(() => {
    if (recentsearch.length >= 4) {
      let temp_ = recentsearch.slice(-4);
      setReacentsearchItems(temp_);
    } else {
      let temp__ = [...recentsearch];
      setReacentsearchItems(temp__);
    }
  }, [recentsearch]);
  const searchhandler = async () => {
    if (list) {
      document.getElementById("backicon").style.pointerEvents = "visible";
      console.log(recentsearch);
      console.log(recentsearchitems);
      const data = { list };
      setRecentSearch([...recentsearch, data]);
      getinfo(list);
      setList("");
      console.log(recentsearch);
      console.log(recentsearchitems);
      showsearch();
    } else alert("Enter movie name to search!");
  };
  const keyboardhandler = (e) => {
    console.log(e);
    if (e.target.value === "clearall") {
      setList("");
    } else if (e.target.alt === "clearicon") {
      let clearbtn = list.substring(0, list.length - 1);
      console.log(clearbtn);
      setList(clearbtn);
    } else {
      let temp = list + e.target.value;
      setList(temp);
    }
  };
  const shownumbers = () => {
    if (isAlphabet) {
      document.getElementById("show-numbers").style.display = "flex";
      document.getElementById("show-alpabets").style.display = "none";
      setIsAlphabet(false);
    } else {
      document.getElementById("show-numbers").style.display = "none";
      document.getElementById("show-alpabets").style.display = "flex";
      setIsAlphabet(true);
    }
  };
  const showsearch = () => {
    // console.log(isSearch);
    if (isSearch) {
      document.getElementById("show-search").style.display = "block";
      document.getElementById("show-searchresult").style.display = "none";
      document.getElementById("backicon").style.pointerEvents = "none";

      setMovies([]);
      setIsSearch(false);
    } else {
      document.getElementById("show-search").style.display = "none";
      document.getElementById("show-searchresult").style.display = "flex";
      document.getElementById("backicon").style.pointerEvents = "visible";
      setIsSearch(true);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log("Enter key pressed");
      searchhandler();
    }
  };
  return (
    <div className="maincontainer">
      <div className="nav-backclose">
        <span className="round-box" id="arrowicon">
          <img
            id="backicon"
            src={arrowicon}
            alt="arrowicon"
            onClick={showsearch}
            style={{ cursor: "pointer", pointerEvents: "none" }}
          />
        </span>
        <span
          className="round-box"
          id="closeicon"
          style={{ cursor: "pointer" }}
        >
          <img src={closeicon} alt="close-icon" style={{ float: "right" }} />
        </span>
      </div>
      <div className="subcontainer1" id="show-search">
        <div className="search-box">
          <div className="search-input">
            <span className="searchicon">
              <img src={searchicon} alt="search-icon" />
            </span>
            <br />
            <input
              type="text"
              className="inputsearch"
              placeholder="Search"
              onKeyDown={handleKeyDown}
              value={list}
              onChange={(e) => setList(e.target.value)}
            />
          </div>
        </div>
        <br />
        <br />
        <div className="subcontainer2">
          <div className="searchitems">
            <h3>Recent Search Items</h3>

            {recentsearchitems.map((item) => {
              return (
                <div className="search-item" key={uuidv4()}>
                  <span
                    key={uuidv4()}
                    value={item.list}
                    onClick={recenthandler}
                    style={{ cursor: "pointer" }}
                  >
                    <img key={uuidv4()} src={reloadicon} alt="reloadicon" />
                    {item.list}
                  </span>
                </div>
              );
            })}
          </div>
          <div
            className="key-board-box"
            id="show-numbers"
            style={{ display: "none" }}
          >
            <div className="key-board-row">
              <span className="key btn-responsive">
                <button value="1" onClick={keyboardhandler}>
                  1
                </button>
              </span>
              <span className="key btn-responsive">
                <button value="2" onClick={keyboardhandler}>
                  2
                </button>
              </span>
              <span className="key btn-responsive">
                <button value="3" onClick={keyboardhandler}>
                  3
                </button>
              </span>
              <span className="key btn-responsive">
                <button value="&" onClick={keyboardhandler}>
                  &
                </button>
              </span>
              <span className="key btn-responsive">
                <button value="#" onClick={keyboardhandler}>
                  #
                </button>
              </span>
              <span className="key btn-responsive">
                <button value="(" onClick={keyboardhandler}>
                  (
                </button>
              </span>
              <span className="key btn-responsive">
                <button value=")" onClick={keyboardhandler}>
                  )
                </button>
              </span>
              <span className="arrow-change">
                <button>
                  <img
                    className="clearicon"
                    src={clearicon}
                    value="clear"
                    onClick={keyboardhandler}
                    alt="clearicon"
                  />
                </button>
              </span>
            </div>

            <div className="key-board-row">
              <span className="key btn-responsive">
                <button value="4" onClick={keyboardhandler}>
                  4
                </button>
              </span>
              <span className="key btn-responsive">
                <button value="5" onClick={keyboardhandler}>
                  5
                </button>
              </span>
              <span className="key btn-responsive">
                <button value="6" onClick={keyboardhandler}>
                  6
                </button>
              </span>
              <span className="key btn-responsive">
                <button value="@" onClick={keyboardhandler}>
                  @
                </button>
              </span>
              <span className="key btn-responsive">
                <button value="!" onClick={keyboardhandler}>
                  !
                </button>
              </span>
              <span className="key btn-responsive">
                <button value="?" onClick={keyboardhandler}>
                  ?
                </button>
              </span>
              <span className="key btn-responsive">
                <button value=":" onClick={keyboardhandler}>
                  :
                </button>
              </span>
              <span className="arrow-change show-alpabets btn-responsive">
                <button value="abc" onClick={shownumbers}>
                  &ABC
                </button>
              </span>
            </div>

            <div className="key-board-row">
              <span className="key btn-responsive">
                <button value="7" onClick={keyboardhandler}>
                  7
                </button>
              </span>
              <span className="key btn-responsive">
                <button value="8" onClick={keyboardhandler}>
                  8
                </button>
              </span>
              <span className="key btn-responsive">
                <button value="9" onClick={keyboardhandler}>
                  9
                </button>
              </span>
              <span className="key btn-responsive">
                <button value="0" onClick={keyboardhandler}>
                  0
                </button>
              </span>
              <span className="key btn-responsive">
                <button value="." onClick={keyboardhandler}>
                  .
                </button>
              </span>
              <span className="key btn-responsive">
                <button value="_" onClick={keyboardhandler}>
                  _
                </button>
              </span>
              <span className="key btn-responsive">
                <button value='"' onClick={keyboardhandler}>
                  "
                </button>
              </span>
            </div>

            <div className="key-board-row">
              <span className="space-clear btn-responsive">
                <button
                  value=" "
                  onClick={keyboardhandler}
                  style={{ cursor: "pointer" }}
                >
                  SPACE
                </button>
              </span>
              <span className="space-clear btn-responsive">
                <button
                  value="clearall"
                  onClick={keyboardhandler}
                  style={{ cursor: "pointer" }}
                >
                  CLEAR
                </button>
              </span>
              <span className="search-btn btn-responsive">
                <button style={{ cursor: "pointer" }} onClick={searchhandler}>
                  SEARCH
                </button>
              </span>
            </div>
          </div>

          <div className="key-board-box" id="show-alpabets">
            <div className="key-board-row">
              <span className="key btn-responsive">
                <button value="A" onClick={keyboardhandler}>
                  A
                </button>
              </span>
              <span className="key btn-responsive">
                <button value="B" onClick={keyboardhandler}>
                  B
                </button>
              </span>
              <span className="key btn-responsive">
                <button value="C" onClick={keyboardhandler}>
                  C
                </button>
              </span>
              <span className="key btn-responsive">
                <button value="D" onClick={keyboardhandler}>
                  D
                </button>
              </span>
              <span className="key btn-responsive">
                <button value="E" onClick={keyboardhandler}>
                  E
                </button>
              </span>
              <span className="key btn-responsive">
                <button value="F" onClick={keyboardhandler}>
                  F
                </button>
              </span>
              <span className="key btn-responsive">
                <button value="G" onClick={keyboardhandler}>
                  G
                </button>
              </span>
              <span className="arrow-change">
                <button value="clear">
                  <img
                    className="clearicon"
                    src={clearicon}
                    value="clear"
                    onClick={keyboardhandler}
                    alt="clearicon"
                  />
                </button>
              </span>
            </div>

            <div className="key-board-row">
              <span className="key btn-responsive">
                <button value="H" onClick={keyboardhandler}>
                  H
                </button>
              </span>
              <span className="key btn-responsive">
                <button value="I" onClick={keyboardhandler}>
                  I
                </button>
              </span>
              <span className="key btn-responsive">
                <button value="J" onClick={keyboardhandler}>
                  J
                </button>
              </span>
              <span className="key btn-responsive">
                <button value="K" onClick={keyboardhandler}>
                  K
                </button>
              </span>
              <span className="key btn-responsive">
                <button value="L" onClick={keyboardhandler}>
                  L
                </button>
              </span>
              <span className="key btn-responsive">
                <button value="M" onClick={keyboardhandler}>
                  M
                </button>
              </span>
              <span className="key btn-responsive">
                <button value="N" onClick={keyboardhandler}>
                  N
                </button>
              </span>
              <span className="arrow-change shownumbers">
                <button value="123" onClick={shownumbers}>
                  123
                </button>
              </span>
            </div>

            <div className="key-board-row">
              <span className="key btn-responsive">
                <button value="O" onClick={keyboardhandler}>
                  O
                </button>
              </span>
              <span className="key btn-responsive">
                <button value="P" onClick={keyboardhandler}>
                  P
                </button>
              </span>
              <span className="key btn-responsive">
                <button value="Q" onClick={keyboardhandler}>
                  Q
                </button>
              </span>
              <span className="key btn-responsive">
                <button value="R" onClick={keyboardhandler}>
                  R
                </button>
              </span>
              <span className="key btn-responsive">
                <button value="S" onClick={keyboardhandler}>
                  S
                </button>
              </span>
              <span className="key btn-responsive">
                <button value="T" onClick={keyboardhandler}>
                  T
                </button>
              </span>
              <span className="key btn-responsive">
                <button value="U" onClick={keyboardhandler}>
                  U
                </button>
              </span>
            </div>

            <div className="key-board-row">
              <span className="key btn-responsive">
                <button value="V" onClick={keyboardhandler}>
                  V
                </button>
              </span>
              <span className="key btn-responsive">
                <button value="W" onClick={keyboardhandler}>
                  W
                </button>
              </span>
              <span className="key btn-responsive">
                <button value="X" onClick={keyboardhandler}>
                  X
                </button>
              </span>
              <span className="key btn-responsive">
                <button value="Y" onClick={keyboardhandler}>
                  Y
                </button>
              </span>
              <span className="key btn-responsive">
                <button value="Z" onClick={keyboardhandler}>
                  Z
                </button>
              </span>
              <span className="key btn-responsive">
                <button value="-" onClick={keyboardhandler}>
                  -
                </button>
              </span>
              <span className="key btn-responsive">
                <button value="'" onClick={keyboardhandler}>
                  '
                </button>
              </span>
            </div>

            <div className="key-board-row">
              <span className="space-clear btn-responsive">
                <button
                  value=" "
                  onClick={keyboardhandler}
                  style={{ cursor: "pointer" }}
                >
                  SPACE
                </button>
              </span>
              <span className="space-clear" style={{ cursor: "pointer" }}>
                <button
                  style={{ cursor: "pointer" }}
                  value="clearall"
                  onClick={keyboardhandler}
                >
                  CLEAR
                </button>
              </span>
              <span className="search-btn" style={{ cursor: "pointer" }}>
                <button style={{ cursor: "pointer" }} onClick={searchhandler}>
                  SEARCH
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        className="subcontainer3"
        id="show-searchresult"
        style={{ display: "none" }}
      >
        <div className="search__result">
          {isError === true &&
            movies !== [] &&
            movies.map((movie) => {
              return <Searchresult movie={movie} />;
            })}
          {isError === false && (
            <div className="backbtn" style={{ fontSize: "800", color: "#fff" }}>
              No Results Found!
              <button onClick={showsearch}>BACK</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
