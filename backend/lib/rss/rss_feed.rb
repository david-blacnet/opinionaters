# frozen_string_literal: true

# RSSFeed
class RSSFeed
  attr_accessor :title
  attr_accessor :updated
  attr_accessor :entries

  def self.builder
    RSSFeedBuilder.new
  end

  def to_json(*_args)
    hash = {}
    instance_variables.each do |var|
      hash[var.to_s[1..-1]] = instance_variable_get var
    end
    hash.to_json
  end

end

# RSSFeedBuilder
class RSSFeedBuilder
  def initialize
    @rss_feed = RSSFeed.new
  end

  def build
    @rss_feed
  end

  def title(title)
    @rss_feed.title = title
    self
  end

  def updated(updated)
    @rss_feed.updated = updated
    self
  end

  def entries(entries)
    @rss_feed.entries = entries
    self
  end
end