const { app } = require('./app');

const PORT = 3001;

app.listen(PORT, () => console.log(`Servidor aberto na porta ${ PORT }`));
