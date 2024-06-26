const app = require('./src/app');
const { conn } = require('./src/db');
const saveBooks = require('./src/utils/saveBooks');

const PORT = 3001;

conn.sync({ force: true })
    .then(() => {
        console.log('Database synced successfully.');
    })
    .catch(error => {
        console.error('Error syncing database:', error);
    });

