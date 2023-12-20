/* eslint-disable */
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

export default function PinnedSubheaderList(props) {
  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
        '& ul': { padding: 0 },
      }}
      subheader={<li />}
    >
      {props.data.map((item, index) => (
        <li key={`item-${index}`}>
          <ul>
            {index !== 0 && <ListSubheader>{`${item.contributing_featur}`}</ListSubheader>}
            {Object.keys(item).length > 0 && (
              <ListItem>
                <ListItemText primary={`Prediction: ${item.prediction}`} />
                {/* <ListItemText primary={`contributing_feature: ${item.contributing_featur}`} /> */}
              </ListItem>
            )}
          </ul>
        </li>
      ))}
    </List>
  );
}
