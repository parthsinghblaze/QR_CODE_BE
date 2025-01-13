// Dotenv
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });


// Cluster
import cluster from 'cluster';
import os from 'os';

// Express
import express from 'express';

// Mongoose
import {connectToDatabase} from './config/mongo';

connectToDatabase().then(data => console.log(data));

// Mids
import cors from 'cors';
import morgan from 'morgan';

// Routes
import routes from './routes';
import errorHandler from "./middleware/errorHandler";


// Express
const app = express();


// Mids
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
// Use routes
app.use(routes);

app.use(errorHandler);
app.listen(process.env.HTTP_PORT, () => {
    console.log(`Server running on ${process.env.HTTP_PORT}`);
});

// if (cluster.isMaster) {
//     const numCPUs = os.cpus().length;
//     for (let i = 0; i < numCPUs; i++) {
//         cluster.fork()
//     }
// } else {
//     app.listen(process.env.HTTP_PORT || 3333);
// }