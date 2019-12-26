import React from 'react';
import './App.css';
import {FeedOverview} from "./feed-overview/FeedOverview";

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <FeedOverview sourceUrl="https://blog.cleancoder.com/atom.xml" />
      </div>
    );
  }
}

export default App;
