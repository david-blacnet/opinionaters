# frozen_string_literal: true

require 'json'
require 'nokogiri'
require 'rss'
require 'sinatra/base'
require 'sinatra/reloader'
require 'open-uri'

require_relative '../lib/rss/rss_entry'
require_relative '../lib/rss/rss_feed'

# App
class App < Sinatra::Base
  get '/' do
    FeedParser.parse_feed(params['rss-feed-url']).to_json
  end
end

# FeedParser
module FeedParser

  module_function

  def parse_feed(url)
    feed = RSS::Parser.parse(read(url))

    title = Nokogiri::XML::DocumentFragment.parse(feed.title).xpath('title/text()')
    updated = Nokogiri::XML::DocumentFragment.parse(feed.updated).xpath('updated/text()')
    entries = []
    feed.items.each { |item| entries.push(fill_entry(item)) }

    RSSFeed.builder
           .title(title)
           .updated(updated)
           .entries(entries)
           .build
  end

  def fill_entry(item)
    doc = Nokogiri::XML::Document.parse(item.to_s)

    RSSEntry.builder
            .title(doc.xpath('entry/title/text()'))
            .link(doc.xpath('entry/link/@href'))
            .updated(doc.xpath('entry/updated/text()'))
            .content(doc.xpath('entry/content/text()'))
            .build
  end

  def read(url)
    URI.open(url).read
  end

end
