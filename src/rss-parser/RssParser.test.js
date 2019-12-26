import {RssParser} from "./RssParser";
import Parser from "rss-parser";
import {of} from "rxjs";

jest.mock('rss-parser');

test('RssParser should pass call to rss-parser', () => {
  const rssParser = new RssParser();
  expect(Parser).toHaveBeenCalled();
  const mockInstance = Parser.mock.instances[0];
  const mockInstanceCall = mockInstance.parseURL;
  mockInstanceCall.mockReturnValue(of({
    feedUrl: 'test-url',
    title: 'Test',
    items: [
      {
        title: 'Item 1',
        content: 'Content 1',
        link: 'link-url',
        pubDate: 'Thu, 12 Nov 2015 21:16:39 +0000'
      },
    ]
  }));
  rssParser.parse('test-url').subscribe(feed => {
    expect(feed.sourceUrl).toEqual('test-url');
    expect(feed.title).toEqual('Test');
    expect(feed.items.length).toBe(1);
    expect(feed.items[0].title).toEqual('Item 1');
    expect(feed.items[0].content).toEqual('Content 1');
    expect(feed.items[0].link).toEqual('link-url');
    expect(feed.items[0].publishDate).toEqual('Thu, 12 Nov 2015 21:16:39 +0000');
  });
  expect(mockInstanceCall.mock.calls[0][0]).toEqual('test-url');
});