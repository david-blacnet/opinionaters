# frozen_string_literal: true

require 'json'
require 'nokogiri'
require 'rss'
require 'sinatra/base'
require 'sinatra/reloader'
require 'open-uri'

# App
class App < Sinatra::Base
  get '/' do
    FeedParser.parse_feed(params['rss-feed-url']).to_json
  end
end

# FeedParser
class FeedParser

  def self.parse_feed(url)
    rss_feed = RSSFeed.new

    feed = RSS::Parser.parse(read(url))
    rss_feed.title = Nokogiri::XML::DocumentFragment.parse(feed.title).xpath('title/text()')
    rss_feed.updated = Nokogiri::XML::DocumentFragment.parse(feed.updated).xpath('updated/text()')
    rss_feed.entries = []
    feed.items.each { |item| rss_feed.entries.push(fill_entry(item)) }

    rss_feed
  end

  def self.fill_entry(item)
    rss_entry = RSSEntry.new
    doc = Nokogiri::XML::Document.parse(item.to_s)
    rss_entry.title = doc.xpath('entry/title/text()')
    rss_entry.link = doc.xpath('entry/link/@href')
    rss_entry.updated = doc.xpath('entry/updated/text()')
    rss_entry.content = doc.xpath('entry/content/text()')

    rss_entry
  end

  def self.read(url)
    URI.open(url).read
  end

end

# RSSEntry
class RSSEntry
  attr_accessor :id
  attr_accessor :title
  attr_accessor :content
  attr_accessor :link
  attr_accessor :updated

  def to_json(*_args)
    hash = {}
    instance_variables.each do |var|
      hash[var.to_s[1..-1]] = instance_variable_get var
    end
    hash.to_json
  end

end

# RSSFeed
class RSSFeed
  attr_accessor :title
  attr_accessor :updated
  attr_accessor :entries

  def to_json(*_args)
    hash = {}
    instance_variables.each do |var|
      hash[var.to_s[1..-1]] = instance_variable_get var
    end
    hash.to_json
  end

end