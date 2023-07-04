require('dotenv').config();
const express = require('express');
const { useTreblle } = require('treblle');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');


const port = process.env.PORT || 8080;
const app = express();

useTreblle(app, {
  apiKey: process.env.TREBLLE_YOUR_API_KEY,
  projectId: process.env.TREBLLE_PROJECT_ID,
});

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};



app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression()); // Enable response compression
app.use((req, res, next) => {
  req.headers.accept = 'application/json';
  next();
});
// Set the X-Content-Type-Options header
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('X-Frame-Options', 'deny'); // or 'sameorigin'
  res.setHeader('Content-Security-Policy', 'default-src \'self\'');
  next();
});

// Middleware to check Content-Security-Policy header
app.use((req, res, next) => {
  const contentSecurityPolicyHeader = res.getHeader('Content-Security-Policy');
  if (!contentSecurityPolicyHeader) {
    return res.status(500).json({
      error: 'Content-Security-Policy header is missing.',
    });
  }
  next();
});

// Middleware to check Accept header
app.use((req, res, next) => {
  const acceptHeader = req.headers.accept;
  if (!acceptHeader || !acceptHeader.includes('application/json')) {
    return res.status(400).json({
      error: 'Invalid Accept header. Only application/json is supported.',
    });
  }
  next();
});

// v1
const RouterV1 = require('./src/v1/router/router');
app.use(RouterV1);

app.get('/test', (req, res) => {
  res.json({
    success: true,
    data: 'here',
  });
});

app.use((req, res, next) => {
  next({
    status: 404,
    message: 'Not Found',
  });
});

app.use((err, req, res, next) => {
  if (err.status === 404) {
    return res.status(404).json({
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

  next(err);
});

// Connect to Database and start the server
const dbService = require('./src/database/connection');

const start = async () => {
  try {
    await dbService.serverConnection();
    console.log('Connection to DB Successful...');
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.error(error.message);
  }
};

start();
