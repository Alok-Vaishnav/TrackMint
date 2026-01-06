require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

// ============================================
// ENVIRONMENT VALIDATION - Fail fast on startup
// ============================================
if (!process.env.MONGO_URI) {
  console.error('❌ ERROR: MONGO_URI environment variable is not set');
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error('❌ ERROR: JWT_SECRET environment variable is not set');
  process.exit(1);
}

// Warn if using default JWT secret (should not happen in production)
if (process.env.JWT_SECRET === 'your_super_secret_jwt_key_change_this') {
  console.warn('⚠️  WARNING: Using default JWT_SECRET. Change this in production!');
}

// Import routes
const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ============================================
// HTTPS Enforcement - Production only
// ============================================
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      return res.redirect(301, `https://${req.header('host')}${req.url}`);
    }
    next();
  });
}

// CORS configuration - allow local frontend and optional FRONTEND_URL when set
const allowedOrigins = ['http://localhost:3000'];
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);

// ============================================
// RATE LIMITING - Protect auth endpoints
// ============================================
const rateLimit = require('express-rate-limit');

// Rate limiter for login attempts (5 attempts per 15 minutes)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: 'Too many login attempts. Please try again later.',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  skip: (req) => process.env.NODE_ENV !== 'production', // Skip rate limiting in development
});

// Rate limiter for register attempts (10 attempts per hour)
const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 10 requests per windowMs
  message: 'Too many registration attempts. Please try again later.',
  skip: (req) => process.env.NODE_ENV !== 'production', // Skip rate limiting in development
});

// Routes
app.use('/api/auth/login', loginLimiter, authRoutes);
app.use('/api/auth/register', registerLimiter, authRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ message: 'Backend is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📦 Environment: ${process.env.NODE_ENV || 'development'}`);
});
