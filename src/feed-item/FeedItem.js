import React from "react";

export default class FeedItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.item.title,
      content: props.item.content,
      link: props.item.link
    };
  }

  render() {
    return (
      <div>
        <span className="title">{this.state.title}</span>
        <span
          className="content"
          dangerouslySetInnerHTML={{ __html: this.state.content }}
        />
        <span className="link">{this.state.link}</span>
      </div>
    );
  }
}
