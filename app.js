require('dotenv').config()
let express = require('express');
const { useTreblle } = require('treblle')
let bodyParser = require('body-parser')
let cors = require('cors')

const port = process.env.PORT || 8080;

let app = express();

useTreblle(app, {
  apiKey: process.env.TREBLLE_YOUR_API_KEY,
  projectId: process.env.TREBLLE_PROJECT_ID,
})

let corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}


app.use(cors(corsOptions));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

//v1
const RouterV1 = require('./src/v1/router/router')

app.use(RouterV1);

app.get('/test', (req, res) => {
  res.json({
    success: true,
    data: "here"
  })
})

app.use((req, res, next) => {
  next({
    status: 404,
    message: 'Not Found',
  });
});

app.use((err, req, res, next) => {
  if (err.status === 404) {
    return res.status(400).json({
      status: 404,
      message: 'Not Found',
    });
  }

  if (err.status === 500) {
    return res.status(500).json({
      status: 500,
      message: 'Internal Server Error',
    });
  }
  //next();
});

// connect to Database and after start the server 
const dbService = require("./src/database/connection");
const start = async () => {
  try {
    await dbService.serverConnection().then(() => console.log('Connection to DB Successful...')).catch((error) => console.error(error));
    server.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.error(error.message);
  }
}

start();

module.exports = server;