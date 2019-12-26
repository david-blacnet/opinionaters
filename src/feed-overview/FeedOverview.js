import React from 'react';
import {RssParser} from "../rss-parser/RssParser";

export class FeedOverview extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sourceUrl: props.sourceUrl,
      feed: {
        title: null
      }
    };
    this._parser = new RssParser();
  }

  componentDidMount() {
    this._parser.parse(this.state.sourceUrl).subscribe(feed =>
      this.setState({
        feed: feed
      })
    );
  }

  render() {
    return (
      <div>
        <h2 className='title'>{this.state.feed.title}</h2>
      </div>
    );
  }
}
