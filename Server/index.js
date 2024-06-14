const app = require('./src/app');
const { conn } = require('./src/db')

const PORT = 3001;

app.listen(PORT, () => {
  conn.sync({ force: false });
  console.log(`Listening on port ${PORT}`);
});