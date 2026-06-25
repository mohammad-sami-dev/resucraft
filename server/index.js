import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
 
dotenv.config();

import authRoutes from './routes/Auth.js'
import cvRoutes from './routes/Cv.js'
import parseResumeRoute from "./routes/parseResumeRoute.js"
import metricsRoute from "./routes/metricsRoute.js"
import feedbackRoute from "./routes/feedbackRoute.js";


 
const app =  express();
const PORT = process.env.PORT || 5000;




app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      process.env.CLIENT_URL || "http://localhost:5173",
      "https://ResuCraft.netlify.app",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

app.use((req, res, next) => {
  console.log("Incoming:", req.method, req.url);
  next();
});
// Routes

app.use('/api/auth', authRoutes);
app.use('/api/cv', cvRoutes);
app.use("/api/ai", parseResumeRoute);
app.use("/api/metrics",metricsRoute);
app.use("/api/feedback", feedbackRoute);


app.get('/', (req, res) => {
    res.send('CV builder Backend is live');
});

// MongoDB  connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}) 
.then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.error(err));
