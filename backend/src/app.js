const express = require('express');
const cors = require('cors');
const bfhlRoutes = require('./routes/bfhlRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/bfhl', bfhlRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;