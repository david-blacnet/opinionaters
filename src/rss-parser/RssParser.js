import Parser from "rss-parser";
import {from} from 'rxjs';
import {map} from "rxjs/operators";

export class RssParser {

  parser;

  constructor() {
    this.parser = new Parser();
  }

  parse(url) {
    return from(this.parser.parseURL(url)).pipe(
      map(feed => ({
        sourceUrl: feed.feedUrl,
        title: feed.title,
        items: feed.items.map(item => ({
          id: item.id,
          title: item.title,
          content: item.content,
          link: item.link,
          publishDate: item.pubDate
        }))
      }))
    );
  }
}