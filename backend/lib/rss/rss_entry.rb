# frozen_string_literal: true

# RSSEntry
class RSSEntry
  attr_accessor :id
  attr_accessor :title
  attr_accessor :content
  attr_accessor :link
  attr_accessor :updated

  def self.builder
    RSSEntryBuilder.new
  end

  def to_json(*_args)
    hash = {}
    instance_variables.each do |var|
      hash[var.to_s[1..-1]] = instance_variable_get var
    end
    hash.to_json
  end

end

# RSSEntryBuilder
class RSSEntryBuilder
  def initialize
    @rss_entry = RSSEntry.new
  end

  def build
    @rss_entry
  end

  def id(id)
    @rss_entry.id = id
    self
  end

  def title(title)
    @rss_entry.title = title
    self
  end

  def content(content)
    @rss_entry.content = content
    self
  end

  def link(link)
    @rss_entry.link = link
    self
  end

  def updated(updated)
    @rss_entry.updated = updated
    self
  end

end