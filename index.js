import express from 'express';
import 'dotenv/config';
import authRouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser';


const app = express();
app.use(express.json()); // Le decimos a express que las respuestas vengan en JSON.
app.use(cookieParser())

// Rutas de Login
app.use('/api/v1/auth', authRouter)

app.use(express.static("public"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("🔥🔥🔥  http://localhost:" + PORT));

