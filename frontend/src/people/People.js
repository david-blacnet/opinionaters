import * as PropTypes from "prop-types";
import * as script from "scriptjs";

const People = (id, fullName, twitterHandle, rssFeedUrl, website) => {
  const renderTweets = (className, width = 760) => {
    const handle = twitterHandle.substring(1);
    if (document.getElementsByClassName(className)[0].innerHTML !== "") {
      document.getElementsByClassName(className)[0].innerHTML = "";
    }

    script("https://platform.twitter.com/widgets.js", () => {
      if (window.twttr) {
        window.twttr.widgets.createTimeline(
          {
            sourceType: "profile",
            screenName: handle
          },
          document.getElementsByClassName(className)[0],
          {
            width
          }
        );
      }
    });
  };

  return {
    id,
    fullName,
    twitterHandle,
    rssFeedUrl,
    website,
    renderTweets
  };
};

export default People;

People.propTypes = {
  id: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  twitterHandle: PropTypes.string.isRequired,
  rssFeedUrl: PropTypes.string,
  website: PropTypes.string
};
