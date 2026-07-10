const express = require('express');
const app = express();
app.use(express.static('public', { acceptRanges: true }));
app.listen(3001);
