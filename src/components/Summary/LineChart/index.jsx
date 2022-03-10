import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import dayjs from 'dayjs'
import customParseFormat  from 'dayjs/plugin/advancedFormat'
import { Button, ButtonGroup } from "@material-ui/core";

dayjs.extend(customParseFormat)

LineChart.propTypes = {
  data: PropTypes.array,
};

const generateOptions = (data = []) => {
  const categories = data.map(item => dayjs(item.Date).format("DD/MM/YYYY"));
  console.log()
  return {
    chart: {
      height: 500,
    },

    title: {
      text: "Tổng ca nhiễm",
    },
    xAxis: {
      categories: categories,
      crosshair: true,
    },
    color: ["#F3585B"],
    yAxis: {
      min: 0,
      title: {
        text: null,
      },
    },

    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y} ca</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },

    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },

    series: [
      {
        name: "Tổng ca nhiễm",
        data: data?.map(item => item.Confirmed),
      },
    ],
  };
};

function LineChart({ data = [] }) {
  const [options, setOptions] = useState({});
  const [reportTime, setReportTime] = useState('all')
  useEffect(() => {
    let customData = []

    switch (reportTime) {
      case 'all':
        customData = data;
        break;
      case '30':
        customData = data.slice(data.length -30)
        break;
      case '7':
        customData = data.slice(data.length -7)
        break;
      default:
        customData = data
        break;
    }
    setOptions(generateOptions(customData));

  }, [data, reportTime]);

  return (
    <div>
      <ButtonGroup size="small" style={{ display: 'flex', justifyContent: 'flex-end'}}>
        <Button color={reportTime === 'all' ? 'secondary' : ''} onClick={() => setReportTime('all')}>Tất cả</Button>
        <Button color={reportTime === '30' ? 'secondary' : ''} onClick={() => setReportTime('30')}>30 ngày</Button>
        <Button color={reportTime === '7' ? 'secondary' : ''} onClick={() => setReportTime('7')}>7 ngày</Button>
      </ButtonGroup>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default React.memo(LineChart);
