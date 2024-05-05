import express from 'express';
import 'dotenv/config';
import authRouter from './routes/auth.route.js'

const app = express();
app.use(express.json()); // Le decimos a express que las respuestas vengan en JSON.

app.use('/api/v1/auth', authRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("🔥🔥🔥  http://localhost:" + PORT));

