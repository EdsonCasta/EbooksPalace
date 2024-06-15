const app = require('./src/app');
const { conn } = require('./src/db');
const saveBooks = require('./src/utils/saveBooks');

const PORT = 3001;

conn.sync({ force: true })
    .then(() => saveBooks())
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        })
    }).catch(error => console.error(error))
