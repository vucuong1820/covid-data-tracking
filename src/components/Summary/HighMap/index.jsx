import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { cloneDeep } from "lodash";
import highchartsMap from "highcharts/modules/map";

highchartsMap(Highcharts);

HighMap.propTypes = {
  mapData: PropTypes.object,
};

const initOptions = {
  chart: {
    height: 500,
  },

  title: {
    text: null,
  },

  mapNavigation: {
    enabled: true,
  },
  colorAxis: {
    min: 0,
    stops: [
      [0, "#EFEFFF"],
      [0.67, "#4444FF"],
      [1, "#000022"],
    ],
  },

  legend: {
    layout: "vertical",
    align: "right",
    verticalAlign: "bottom",
  },

  series: [
    {
      mapData: {},
      name: "Số ca nhiễm (giá trị minh họa)",
      joinBy: ["hc-key", "key"],
    },
  ],
};

function HighMap({ mapData }) {
  const [options, setOptions] = useState({});
  const chartRef = useRef(null);
  const [configLoaded, setConfigLoaded] = useState(false);
  useEffect(() => {
    if (mapData && Object.keys(mapData).length) {
      const fakeData = mapData?.features.map((feature, index) => ({
        key: feature.properties["hc-key"],
        value: index,
      }));
      setOptions({
        ...initOptions,
        series: [
          {
            ...initOptions.series[0],
            mapData,
            data: fakeData,
          },
        ],
      });
      if (!configLoaded) setConfigLoaded(true);
    }
  }, [mapData, configLoaded]);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      chartRef.current.chart.series[0].update({
        mapData,
      });
    }
  }, [mapData]);
  if (!configLoaded) return null;
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={cloneDeep(options)}
      constructorType="mapChart"
      ref={chartRef}
    />
  );
}

export default React.memo(HighMap);
