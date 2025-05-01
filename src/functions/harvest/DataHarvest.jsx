import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { format } from 'date-fns';
import { Col, Row } from 'react-bootstrap';
import CircularProgress from '../../components/CircularProgress';

const DataHarvest = ({ data }) => {
  const [series, setSeries] = useState([]);
  const [categories, setCategories] = useState([]);

  const chart_options = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Received data through time',
    },
    xAxis: {
      categories: [],
      title: {
        text: 'Time',
      },
    },
    yAxis: [
      {
        title: {
          text: 'Temperature (*C)',
        },
        opposite: false,
        min: 0,
        max: 50,
      },
      {
        title: {
          text: 'Humidity (%)',
        },
        opposite: false,
        min: 0,
        max: 100,
      },
      {
        title: {
          text: 'Light (%)',
        },
        opposite: false,
        min: 0,
        max: 100,
      },
    ],
    tooltip: {
      shared: true,
    },
    series: [],
  };

  useEffect(() => {
    /// Format data
    const series = [
      {
        name: 'Temperature',
        yAxis: 0,
        data: [],
        color: 'red',
      },
      {
        name: 'Humidity',
        yAxis: 1,
        data: [],
        color: 'blue',
      },
      {
        name: 'Light',
        yAxis: 2,
        data: [],
        color: 'green',
      },
    ];

    const categories = [];

    for (let i = data.length - 1; i >= 0; i--) {
      const value = data[i];
      const createdAt = new Date(value.createdAt);
      series[0].data.push(value.temperature);
      series[1].data.push(value.humidity);
      series[2].data.push(value.light);
      categories.push(format(createdAt, 'HH:mm:ss'));
    }

    setSeries(series);
    setCategories(categories);
  }, [data]);

  chart_options.xAxis.categories = categories;
  chart_options.series = series;

  return (
    <>
      <h4 className="text-center">Latest</h4>
      <Row>
        <Col xs={4}>
          <CircularProgress
            value={data.length > 0 ? data[0].temperature : 0}
            text={`${data.length > 0 ? data[0].temperature : 0}*C`}
            min={0}
            max={50}
            label={'Temperature'}
            color="red"
          />
        </Col>
        <Col xs={4}>
          <CircularProgress
            value={data.length > 0 ? data[0].humidity : 0}
            text={`${data.length > 0 ? data[0].humidity : 0}%`}
            label={'Humidity'}
            color="blue"
          />
        </Col>
        <Col xs={4}>
          <CircularProgress
            value={data.length > 0 ? data[0].light : 0}
            text={`${data.length > 0 ? data[0].light : 0}%`}
            label={'Light'}
            color="green"
          />
        </Col>
      </Row>
      <h4 className="text-center">History</h4>
      <div style={{ padding: '5px' }}>
        <HighchartsReact highcharts={Highcharts} options={chart_options} />
      </div>
    </>
  );
};

export default DataHarvest;
