import React from "react";
import RssParser from "../rss-parser/RssParser";
import FeedItem from "../feed-item/FeedItem";

export default class FeedOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sourceUrl: props.sourceUrl,
      feed: {
        title: null,
        items: []
      }
    };
    this._parser = new RssParser();
  }

  componentDidMount() {
    this._parser.parse(this.state.sourceUrl).subscribe(feed => {
      this.setState({
        feed: feed
      });
    });
  }

  render() {
    return (
      <div>
        <h2 className="title">{this.state.feed.title}</h2>
        {this.state.feed.items.map(item => (
          <FeedItem key={item.id.toString()} item={item} />
        ))}
      </div>
    );
  }
}
