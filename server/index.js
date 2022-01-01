const path = require('path');
const express = require('express');
const app = express();

app.use(express.static(path.join('build')));
app.use(express.static('public'));

app.use('*', (req, res, next) => {
  res.sendFile(path.join('build', 'index.html'));
});

const PORT = process.env.NODE_ENV == 'production' ? process.env.PORT : 5000;

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
