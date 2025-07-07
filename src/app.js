const express = require('express');
const bodyParser = require('body-parser');
const basicAuth = require('express-basic-auth');
const dotenv = require('dotenv');
const formRoutes = require('./routes/form');
const ticketRoutes = require('./routes/tickets');

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use('/', formRoutes);
app.use('/tickets', basicAuth({
  users: { [process.env.ADMIN_USER]: process.env.ADMIN_PASSWORD },
  challenge: true,
}), ticketRoutes);

if (require.main === module){
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

}

module.exports = app;
