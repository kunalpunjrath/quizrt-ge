const morgan = require('morgan');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
// TODO: Configure docker for mongo
//const mongoConn = require('./mongoConnection')();
const _port = process.env.PORT || 3000;

function Config(app) {
    morgan.token('time', (req, res) => new Date().toISOString());
    app.use(morgan('[:time] :remote-addr :method :url :status :res[content-length] :response-time ms'));
    
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    
    app.use(require('./api/v1'));
    
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    
    app.listen(_port, () => {
        console.log('App is listening to request on port:', _port);
    });
}

module.exports = Config;