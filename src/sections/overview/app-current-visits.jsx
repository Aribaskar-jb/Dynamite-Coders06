
/* eslint-disable */
import PropTypes from 'prop-types';

import ReactSpeedometer from 'react-d3-speedometer';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { styled, useTheme } from '@mui/material/styles';

import { fNumber } from 'src/utils/format-number';

import Chart, { useChart } from 'src/components/chart';

// ----------------------------------------------------------------------
const CHART_HEIGHT = 400;

const LEGEND_HEIGHT = 72;

const StyledChart = styled(Chart)(({ theme }) => ({
  height: CHART_HEIGHT,
  '& .apexcharts-canvas, .apexcharts-inner, svg, foreignObject': {
    height: `100% !important`,
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    borderTop: `dashed 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

export default function AppCurrentVisits({ seaCondition, title, subheader, chart, ...other }) {
  const theme = useTheme();

  const { colors, series, options } = chart;

  return (
    <Card {...other} sx={{ height: '95%'}}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 5 }} />

      {/* <StyledChart
        dir="ltr"
        type="pie"
        series={chartSeries}
        options={chartOptions}
        width="100%"
        height={280}
      /> */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30%' }}>
        <ReactSpeedometer
          maxValue={10}
          value={seaCondition}
          needleColor="red"
          width={350} // Set the width of the speedometer
          height={400}
          segmentColors={['firebrick', 'tomato', 'gold', 'limegreen']}
          // segments={10}
          // endColor="blue"
        />
      </div>
    </Card>
  );
}

AppCurrentVisits.propTypes = {
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
};
