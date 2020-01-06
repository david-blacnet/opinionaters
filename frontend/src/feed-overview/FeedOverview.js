import React, { useEffect, useRef, useState } from "react";
import RssParser from "../my-rss-parser/RssParser";
import FeedItem from "../feed-item/FeedItem";
import Typography from "@material-ui/core/Typography";

export default function FeedOverview(props) {
  const [feed, setFeed] = useState({
    title: null,
    items: []
  });
  const sourceUrl = props.sourceUrl;
  const _parser = new RssParser();
  const feedSubscription = useRef(null);

  useEffect(() => {
    feedSubscription.current = _parser.parse(sourceUrl).subscribe(newFeed => {
      setFeed(newFeed);
    });

    return () => {
      feedSubscription.current.unsubscribe();
    };
  }, []);

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        {feed.title}
      </Typography>
      {feed.items.map(item => (
        <FeedItem key={item.id.toString()} item={item} />
      ))}
    </div>
  );
}
