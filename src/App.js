import React from 'react';
import logo from './logo.svg';
import './App.css';
import {RssParser} from "./rss-parser/RssParser";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {content: null};
  }

  componentDidMount() {
    let parser = new RssParser();
    parser.parse("https://blog.cleancoder.com/atom.xml").subscribe(feed => {
      console.log(feed);
      this.setState({
        content: feed
      });
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          {this.state.content != null && this.state.content.title}
        </header>
      </div>
    );
  }
}

export default App;
