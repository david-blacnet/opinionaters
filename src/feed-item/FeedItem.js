import React from "react";
import Typography from "@material-ui/core/Typography";
import { Box, Link } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

export default function FeedItem(props) {
  const { item } = props;

  return (
    <Paper elevation="3">
      <Box p={3} mb={5}>
        <Typography>
          <Link href={item.link} variant="h6">
            {item.title}
          </Link>
        </Typography>
        <Typography variant="body1">
          <span dangerouslySetInnerHTML={{ __html: item.content }} />
        </Typography>
      </Box>
    </Paper>
  );
}
