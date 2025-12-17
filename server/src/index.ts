import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Task Management API' });
});

app.use('/tasks', taskRoutes);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
