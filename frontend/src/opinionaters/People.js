export default class People {
  id;
  fullName;
  twitterHandle;
  rssFeedUrl;
  website;

  constructor(id, fullName, twitterHandle, rssFeedUrl = null, website = null) {
    this.id = id;
    this.fullName = fullName;
    this.twitterHandle = twitterHandle;
    this.rssFeedUrl = rssFeedUrl;
    this.website = website;
  }
}
