import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import HighlightCard from "./HighlightCard";

Highlight.propTypes = {
  report: PropTypes.object,
};

function Highlight({ report = {} }) {
  const summary = [
    {
      title: "Số ca nhiễm",
      count: report?.cases,
      type: "confirmed",
    },
    {
      title: "Số ca khỏi",
      count: report?.recovered,
      type: "recovered",
    },
    {
      title: "Số ca tử vong",
      count: report?.deaths,
      type: "death",
    },
  ];
  return (
    <Grid container spacing={3}>
      {summary.map((item) => (
        <Grid key={item.type} item sm={4} xs={12}>
          <HighlightCard title={item.title} count={item.count} type={item.type} />
        </Grid>
      ))}

    </Grid>
  );
}

export default Highlight;
