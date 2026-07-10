const express = require('express');
const app = express();
app.get('*all', (req, res) => {
  res.send('matched *all: ' + req.params.all);
});
app.listen(3002, () => console.log('Listening on 3002'));
