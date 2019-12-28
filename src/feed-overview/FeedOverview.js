import React, { useEffect, useRef, useState } from "react";
import RssParser from "../my-rss-parser/RssParser";
import FeedItem from "../feed-item/FeedItem";

export default function FeedOverview(props) {
  const [feed, setFeed] = useState({
    title: null,
    items: []
  });
  const sourceUrl = props.sourceUrl;
  const _parser = new RssParser();
  const feedSubscription = useRef(null);

  useEffect(() => {
    feedSubscription.current = _parser.parse(sourceUrl).subscribe(item => {
      setFeed(item);
    });

    return () => {
      feedSubscription.current.unsubscribe();
    };
  });

  return (
    <div>
      <h2 className="title">{feed.title}</h2>
      {feed.items.map(item => (
        <FeedItem key={item.id.toString()} item={item} />
      ))}
    </div>
  );
}
