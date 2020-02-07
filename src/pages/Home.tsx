import React from 'react';
import history from '../history';
import { Router } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../style/style.css';
import MainBox from '../components/MainBox';

export default class Home extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Navbar />
        {/*TODO: Add a quick access buttons here*/}
        <div className="header">
          <h1>Oxaca</h1>
          <p>Why be sad in a world that has tacos?</p>
        </div>

        <div className="row">
          <div className="side">
            <h2>About Us</h2>
            <h5>Address: </h5>
            <p>............</p>
            <h5>Telephone:</h5>
            <p>............</p>
            <h5>Description</h5>
            <p>............</p>
            <p>............</p>
            <p>............</p>
            <p>............</p>
          </div>
          <div className="main">
            <h2>The Unique Mexician Street Food</h2>
            <h5>...name for the food...</h5>
            <div className="img">
              <img
                src="https://cdn.pixabay.com/photo/2015/11/02/20/27/taco-1018962_960_720.jpg"
                height="200px"
              ></img>
            </div>
            <p>...description for food...</p>
            <p>..........................</p>
            <p>..........................</p>
            <p>..........................</p>
            <p>..........................</p>
            <br></br>
            <h5>...name for the food...</h5>
            <div className="img">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/1/17/Huggy_Buggy_bread_pudding.JPG"
                height="200px"
              ></img>
              <p>...description for food...</p>
              <p>..........................</p>
              <p>..........................</p>
              <p>..........................</p>
              <p>..........................</p>
              <br></br>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}
