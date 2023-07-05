require('dotenv').config();
const express = require('express');
const { useTreblle } = require('treblle');
const compression = require('compression');
const https = require('https');
const fs = require('fs');
const cors = require('cors');

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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use((req, res, next) => {
  req.headers.accept = 'application/json';
  next();
});

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('X-Frame-Options', 'deny');
  res.setHeader('Content-Security-Policy', 'default-src \'self\'');
  next();
});

app.use((req, res, next) => {
  const contentSecurityPolicyHeader = res.getHeader('Content-Security-Policy');
  if (!contentSecurityPolicyHeader) {
    return res.status(500).json({
      error: 'Content-Security-Policy header is missing.',
    });
  }
  next();
});

app.use((req, res, next) => {
  const acceptHeader = req.headers.accept;
  if (!acceptHeader || !acceptHeader.includes('application/json')) {
    return res.status(400).json({
      error: 'Invalid Accept header. Only application/json is supported.',
    });
  }
  next();
});

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
  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({ status: statusCode, message });
});

const dbService = require('./src/database/connection');

const start = async () => {
  try {
    await dbService.serverConnection();
    console.log('Connection to DB Successful...');

    // Create an HTTP/2 server with SSL/TLS certificates
    const options = {
      key: fs.readFileSync('./src/v1/utility/private.key'),
      cert: fs.readFileSync('./src/v1/utility/certificate.crt'),
    };

    const server = https.createServer(options, app);

    server.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1); // Exit the application if database connection fails
  }
};

start();
