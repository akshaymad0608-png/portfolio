import express from 'express';
const app = express();
app.get('*all', (req, res) => res.send('matched ' + req.params.all));
app.listen(3001, () => {
  console.log('started');
});
