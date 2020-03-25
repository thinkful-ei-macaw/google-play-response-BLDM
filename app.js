/* eslint-disable no-console */
'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const playstore = require('./playstore.js');

const app = express();

app.use(cors());
app.use(morgan('dev'));

app.get('/apps', (req, res) => {
  let { sort, genres } = req.query;
  let results = [...playstore];
  sort = sort && sort[0].toUpperCase() + sort.slice(1);

  if (sort) {
    if (!['Rating', 'App'].includes(sort)) {
      return res.status(400).send('Must sort by rating or app!');
    }
    results.sort((a, b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    });
  }
  if(genres){
    if(!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)){
      return res.status(400).send('Invalid app genre.');
    }
    results = results.filter(result =>{
      if(result.genres.includes(genres)){
        return result;
      }
    });
  }

  res.json(results);
  
});

app.listen('8080', () => console.info('localhost 8080 is live'));