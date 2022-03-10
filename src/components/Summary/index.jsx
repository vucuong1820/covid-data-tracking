import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import LineChart from "./LineChart";
import HighMap from "./HighMap";

Summary.propTypes = {
  report: PropTypes.array,
  selectedCountryId: PropTypes.string,
};

function Summary({ report = [], selectedCountryId = "" }) {
  const [mapData, setMapData] = useState({});
  useEffect(() => {
    if (selectedCountryId) {
      import(
        `@highcharts/map-collection/countries/${selectedCountryId.toLowerCase()}/${selectedCountryId.toLowerCase()}-all.geo.json`
      ).then((res) => setMapData(res));
    }
  }, [selectedCountryId]);
  return (
    <Grid container spacing={3} style={{paddingTop: '8px'}}>
      <Grid item sm={8} xs={12}>
        <LineChart data={report} />
      </Grid>

      <Grid item sm={4} xs={12}>
        <HighMap mapData={mapData} />
      </Grid>
    </Grid>
  );
}

export default Summary;
