// import logo from './logo.svg';
import "./App.css";
import React, { useState } from "react";
import NevBar from "./Components/NevBar";
import News from "./Components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  // in class base componenet always keep in mind that always use variablename to access the variable value
  const PageSize = 20;
  const apiKey = process.env.REACT_APP_NEWS_API;

  const [progress, setProgress] = useState(0);

  return (
    <div>
      <Router>
        <LoadingBar color="#f11946" progress={progress} height={3} />
        <NevBar />
        {/* <News setProgress={setProgress} apiKey={apiKey} pagesize={PageSize} country="IN" category="sports" /> */}
        <Routes>
          <Route
            exact
            path="/"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="general"
                pagesize={PageSize}
                country="IN"
                category="general"
                badgeColor="secondary"
              />
            }
          ></Route>
          <Route
            exact
            path="/business"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="business"
                pagesize={PageSize}
                country="IN"
                category="business"
                badgeColor="primary"
              />
            }
          ></Route>
          <Route
            exact
            path="/entertainment"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="entertainment"
                pagesize={PageSize}
                country="IN"
                category="entertainment"
                badgeColor="warning "
              />
            }
          ></Route>
          <Route
            exact
            path="/general"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="general"
                pagesize={PageSize}
                country="IN"
                category="general"
                badgeColor="secondary"
              />
            }
          ></Route>
          <Route
            exact
            path="/health"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="health"
                pagesize={PageSize}
                country="IN"
                category="health"
                badgeColor="danger"
              />
            }
          ></Route>
          <Route
            exact
            path="/science"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="science"
                pagesize={PageSize}
                country="IN"
                category="science"
                badgeColor="info"
              />
            }
          ></Route>
          <Route
            exact
            path="/sports"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="sports"
                pagesize={PageSize}
                country="IN"
                category="sports"
                badgeColor="success"
              />
            }
          ></Route>
          <Route
            exact
            path="/technology"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="technology"
                pagesize={PageSize}
                country="IN"
                category="technology"
                badgeColor="primary"
              />
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App
