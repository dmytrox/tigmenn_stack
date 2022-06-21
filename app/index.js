'use strict'

const { Client } = require('@elastic/elasticsearch')

require("dotenv").config();


const elasticUrl = process.env.ELASTIC_URL || "http://localhost:9200";

const client = new Client({
  node: elasticUrl
})

const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose
  .connect(
    'mongodb://mongo:27017/docker-node-mongo',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const Item = require('./models/Item');

app.get('/', (req, res) => {
  Item.find()
    .then(items => res.render('index', { items }))
    .catch(err => res.status(404).json({ msg: 'No items found' }));
});

app.post('/createload', async (req, res) => {
  let counter = 0;
  
  while (counter => 1000) {
    const newItem = new Item({
      tag: (Math.random() + 1).toString(36).substring(7)
    });

    newItem.save();
    counter++;
  
    // Let's start by indexing some data
    await client.index({
      index: 'game-of-thrones',
      document: {
        character: 'Ned Stark',
        quote: 'Winter is coming.'
      }
    });

    await client.index({
      index: 'game-of-thrones',
      document: {
        character: 'Daenerys Targaryen',
        quote: 'I am the blood of the dragon.'
      }
    });

    await client.index({
      index: 'game-of-thrones',
      document: {
        character: 'Tyrion Lannister',
        quote: 'A mind needs books like a sword needs a whetstone.'
      }
    });

    // here we are forcing an index refresh, otherwise we will not
    // get any result in the consequent search
    await client.indices.refresh({ index: 'game-of-thrones' });

    // Let's search!
    const result = await client.search({
      index: 'game-of-thrones',
      query: {
        match: { quote: 'winter' }
      }
    });

    console.log(result.hits.hits);
    counter++;
  }
  
});

const port = 4000;

app.listen(port, () => console.log('Server running...'));
