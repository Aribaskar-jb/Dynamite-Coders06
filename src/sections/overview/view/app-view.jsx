/* eslint-disable */
import { faker } from '@faker-js/faker';

import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

import AppTasks from '../app-tasks';
import AppNewsUpdate from '../app-news-update';
import AppOrderTimeline from '../app-order-timeline';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppTrafficBySite from '../app-traffic-by-site';
import AppCurrentSubject from '../app-current-subject';
import AppConversionRates from '../app-conversion-rates';

// ----------------------------------------------------------------------
export default function AppView() {
  const [data, setData] = useState([]);
  const [draft, setDraft] = useState([]);
  const [waterTemperature, setWaterTemperature] = useState([]);
  const [timeDuration, setTimeDuration] = useState([]);
  const [seaCondition, setSeaCondition] = useState(0);
  const [fuelConsumptionRate,setFuelConsumptionRate]=useState([])
  async function fetchData() {
    // alert("E")
    try {
      const response = await fetch('/tabular-actgan-657984b9ef00156082ab51f4-data_preview.csv');
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder('utf-8');
      const csvString = decoder.decode(result.value);
      // console.log(response)
      const rows = csvString.split('\n').map((row) => row.split(','));
      // console.log(rows)
      return rows.slice(1);
    } catch (error) {
      console.error('Error fetching or parsing data:', error);
      return null;
    }
  }

  useEffect(() => {
    let intervalId;

    async function fetchDataAndUpdate() {
      const rowsData = await fetchData();
      if (rowsData) {
        let index = 0;
        intervalId = setInterval(() => {
          if (index < rowsData.length) {
            const sailingSpeed = parseFloat(rowsData[index][1]);
            setDraft((prevData) => [...prevData, rowsData[index][2]]);
            setWaterTemperature((prevData) => [...prevData, rowsData[index][6]]);
            setData((prevData) => [...prevData, sailingSpeed]);
            setFuelConsumptionRate((prevData) => [...prevData, rowsData[index][7]]);
            setTimeDuration((prevData) => [
              ...prevData,
              { label: rowsData[index][8], value: parseFloat(rowsData[index][8]) }, // Modify this line based on your label and value data in rowsData
            ]);
            if (rowsData[index][5] === 'Moderate') {
              setSeaCondition(5);
            } else if (rowsData[index][5] === 'Rough') {
              setSeaCondition(10);
            } else {
              setSeaCondition(0);
            }
            // setSeaCondition(rowsData[index][5])
            index += 1;
          } else {
            clearInterval(intervalId);
          }
        }, 1500); // Adjust the interval duration as needed
      }
    }

    fetchDataAndUpdate();

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);
  useEffect(() => {
    if (data.length === 11) {
      setData([]);
      setDraft([]);
      setWaterTemperature([]);
      setTimeDuration([]);
      setFuelConsumptionRate([])
      // Set data to an empty array when its length reaches 10
    }
  }, [data, draft]);
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        {/* <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Weekly Sales"
            total={714000}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="New Users"
            total={1352831}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Item Orders"
            total={1723315}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Bug Reports"
            total={234}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid> */}

        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Website Visits"
            subheader="(+43%) than last year"
            chart={{
              labels: [
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ],
              series: [
                {
                  name: 'Sailing_Speed',
                  type: 'column',
                  fill: 'solid',
                  data,
                },
                {
                  name: 'Draft',
                  type: 'area',
                  fill: 'gradient',
                  data: draft,
                },
                {
                  name: 'Water_Temperature',
                  type: 'line',
                  fill: 'solid',
                  data: waterTemperature,
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            seaCondition={seaCondition}
            title="Sea Condition"
            chart={{
              series: [
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Time Duration"
            subheader="(+43%) than last year"
            chart={{
              series: timeDuration,
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4} >
          {/* <AppCurrentSubject
            title="Current Subject"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          /> */}
          <AppWebsiteVisits
            title="Website Visits"
            subheader="(+43%) than last year"
            chart={{
              labels: [
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ],
              series: [
                {
                  name: 'Sailing_Speed',
                  type: 'column',
                  fill: 'solid',
                  data:fuelConsumptionRate,
                },
                
              ],
            }}
          />
        </Grid>

        {/* <Grid xs={12} md={6} lg={8}>
          <AppNewsUpdate
            title="News Update"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: faker.person.jobTitle(),
              description: faker.commerce.productDescription(),
              image: `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: faker.date.recent(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="Order Timeline"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                '1983, orders, $4220',
                '12 Invoices have been paid',
                'Order #37745 from September',
                'New order placed #XF-2356',
                'New order placed #XF-2346',
              ][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppTrafficBySite
            title="Traffic by Site"
            list={[
              {
                name: 'FaceBook',
                value: 323234,
                icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />,
              },
              {
                name: 'Google',
                value: 341212,
                icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />,
              },
              {
                name: 'Linkedin',
                value: 411213,
                icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,
              },
              {
                name: 'Twitter',
                value: 443232,
                icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />,
              },
            ]}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="Tasks"
            list={[
              { id: '1', name: 'Create FireStone Logo' },
              { id: '2', name: 'Add SCSS and JS files if required' },
              { id: '3', name: 'Stakeholder Meeting' },
              { id: '4', name: 'Scoping & Estimations' },
              { id: '5', name: 'Sprint Showcase' },
            ]}
          />
        </Grid> */}
      </Grid>
    </Container>
  );
}
