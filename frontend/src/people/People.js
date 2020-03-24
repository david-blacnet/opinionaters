import * as PropTypes from "prop-types";

export default class People {
  constructor(id, fullName, twitterHandle, rssFeedUrl = null, website = null) {
    this.id = id;
    this.fullName = fullName;
    this.twitterHandle = twitterHandle;
    this.rssFeedUrl = rssFeedUrl;
    this.website = website;
  }
}

People.propTypes = {
  id: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  twitterHandle: PropTypes.string.isRequired,
  rssFeedUrl: PropTypes.string,
  website: PropTypes.string
};
