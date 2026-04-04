import express from 'express';
import cors from 'cors';
import { authRoutes } from './routes/auth.routes.js';
import { recordRoutes } from './routes/recore.routes.js';
import { dashboardRoutes } from './routes/dashboard.routes.js'; 
import { userRoutes } from './routes/user.routes.js';


export const app = express();
const corsOptions = {
  origin: process.env.CORS_ORIGIN ,
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(express.json());
app.use(cors(corsOptions));

//define Routes here

app.use("/api/auth", authRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/users", userRoutes);
// Health check route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Finance Data Processing and Analysis API',
    version: '1.0.0'
  });
});
// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
     console.error(err.stack);
  } else {
     console.error("Error:", err.message);
  }
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});