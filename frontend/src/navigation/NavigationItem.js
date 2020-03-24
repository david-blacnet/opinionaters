import React from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const NavigationItem = React.forwardRef((props, ref) => {
  const { item } = props;

  const renderLink = React.useMemo(() => {
    const link = React.forwardRef((itemProps, itemRef) => (
      <RouterLink to={item.to} ref={itemRef} {...itemProps} />
    ));
    link.displayName = "RouterLink";

    return link;
  }, [item.to]);

  return (
    <li id={`navigation-item-${item.id}`} ref={ref}>
      <ListItem button component={renderLink}>
        <ListItemText primary={item.label} />
      </ListItem>
    </li>
  );
});
NavigationItem.displayName = "NavigationItem";

export default NavigationItem;

NavigationItem.propTypes = {
  item: PropTypes.exact({
    id: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })
};
