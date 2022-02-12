// import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'
import NevBar from './Components/NevBar'
import News from './Components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  // in class base componenet always keep in mind that always use this.variablename to access the variable value
  PageSize = 20;
  apiKey = process.env.REACT_APP_NEWS_API
  state = {
    progress : 0
  }
  setProgress = (progress) =>{
    this.setState({progress:progress})
  }

  render() {
    return (
      <div>
        <Router>
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
            height={3}
          />
          <NevBar />
          {/* <News setProgress={this.setProgress} apiKey={this.apiKey} pagesize={PageSize} country="IN" category="sports" /> */}
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pagesize={this.PageSize} country="IN" category="general" badgeColor="secondary" />}></Route>
            <Route exact path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="business" pagesize={this.PageSize} country="IN" category="business" badgeColor="primary" />}></Route>
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pagesize={this.PageSize} country="IN" category="entertainment" badgeColor="warning " />}></Route>
            <Route exact path="/general" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pagesize={this.PageSize} country="IN" category="general" badgeColor="secondary" />}></Route>
            <Route exact path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pagesize={this.PageSize} country="IN" category="health" badgeColor="danger" />}></Route>
            <Route exact path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pagesize={this.PageSize} country="IN" category="science" badgeColor="info" />}></Route>
            <Route exact path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pagesize={this.PageSize} country="IN" category="sports" badgeColor="success" />}></Route>
            <Route exact path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pagesize={this.PageSize} country="IN" category="technology" badgeColor="primary" />}></Route>
          </Routes>
        </Router>
      </div>
    )
  }
}

