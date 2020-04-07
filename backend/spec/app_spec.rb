ENV['APP_ENV'] = 'test'

require 'spec_helper'
require_relative '../app/app' # <-- your sinatra app
require 'rspec'
require 'rack/test'

RSpec.describe 'The HelloWorld App' do
  def app
    App
  end

  before(:each) do
    allow(FeedParser).to receive(:parse_feed).and_call_original
    allow(FeedParser).to receive(:fill_entry).and_call_original
    allow(FeedParser).to receive(:fill_feed).and_call_original
    allow(FeedParser).to receive(:read).with('https://blog.cleancoder.com/atom.xml').and_return('<?xml version="1.0" encoding="utf-8"?>'\
'<feed xmlns="http://www.w3.org/2005/Atom"><title><![CDATA[The Clean Code Blog]]>'\
'</title><link href="http://blog.cleancoder.com/atom.xml" rel="self"/><link href="http://blog.cleancoder.com/"/>'\
'<updated>2020-04-07T00:03:07+00:00</updated><id>http://blog.cleancoder.com/</id><author><name><![CDATA[Uncle Bob Martin]]></name>'\
'</author><entry><title type="html"><![CDATA[A Little Clojure]]></title><link href="http://blog.cleancoder.com/uncle-bob/2020/04/06'\
'/ALittleClojure.html"/><updated>2020-04-06T00:00:00+00:00</updated><id>http://blog.cleancoder.com/uncle-bob/2020/04/06/'\
'ALittleClojure</id><content type="html"><![CDATA[<p>So let’s learn just a little bit of clojure.</p>]]></content></entry></feed>')
  end

  it 'says hello' do
    browser = Rack::Test::Session.new(Rack::MockSession.new(App))
    browser.get '/?rss-feed-url=https://blog.cleancoder.com/atom.xml'

    expect(browser.last_response).to be_ok
    expect(browser.last_response.body).to eq('{"title":"The Clean Code Blog","updated":"2020-04-07T00:03:07+00:00","entries":[{"title":'\
'"A Little Clojure","link":"http://blog.cleancoder.com/uncle-bob/2020/04/06/ALittleClojure.html","updated":"2020-04-06T00:00:00+00:00",'\
'"content":"&lt;p&gt;So let&#x2019;s learn just a little bit of clojure.&lt;/p&gt;"}]}')
  end
end