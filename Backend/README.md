# Literary Analysis API - Backend

Express.js REST API backend for the Literary Analysis AI application. Handles user authentication, passage analysis using Google Gemini AI, and analysis history management.

## Features

- **REST API** - Clean, RESTful API endpoints
- **JWT Authentication** - Secure user authentication and authorization
- **Google Gemini Integration** - AI-powered literary passage analysis
- **MongoDB Database** - Persistent storage for users and analyses
- **Error Handling** - Comprehensive error handling and validation
- **CORS Enabled** - Allows cross-origin requests from frontend
- **Environment Configuration** - Secure API keys via environment variables

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Google Generative AI SDK** - Gemini AI integration
- **jsonwebtoken** - JWT authentication
- **bcryptjs** - Password hashing
- **dotenv** - Environment variables
- **axios** - HTTP client
- **cors** - Cross-Origin Resource Sharing

## Installation

1. **Install dependencies**
```bash
npm install
```

2. **Create `.env` file**
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/interpre
JWT_SECRET=your_super_secret_jwt_key_12345
GEMINI_API_KEY=your_google_gemini_api_key
FRONTEND_URL=http://localhost:5173
HF_API_TOKEN=optional_huggingface_token
```

3. **Start MongoDB**
```bash
mongod
```

4. **Run the server**
```bash
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Authentication

**Register User**
```
POST /api/auth/signup
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "secure_password"
}
```

**Login User**
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "secure_password"
}
```

Returns JWT token and user info.

### Analysis

**Analyze Passage**
```
POST /api/analysis/analyze
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "passage": "Literary text to analyze...",
  "title": "Optional Title",
  "author": "Optional Author",
  "analysisId": null (optional - for updating existing),
  "userQuestion": null
}
```

Response:
```json
{
  "success": true,
  "analysisId": "507f1f77bcf86cd799439011",
  "analysis": {
    "meanings": "...",
    "literaryDevices": "...",
    "themes": "...",
    "symbolism": "...",
    "historicalContext": "...",
    "summary": "..."
  }
}
```

**Get Analysis History**
```
GET /api/analysis/history
Authorization: Bearer <JWT_TOKEN>
```

Returns array of user's past analyses.

**Get Single Analysis**
```
GET /api/analysis/:id
Authorization: Bearer <JWT_TOKEN>
```

**Delete Analysis**
```
DELETE /api/analysis/:id
Authorization: Bearer <JWT_TOKEN>
```

## Authentication

All protected routes require JWT token in Authorization header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## AI Analysis

The backend uses Google Gemini 1.5 Flash model to analyze passages:

1. **Meanings & Vocabulary** - Key words and their significance
2. **Literary Devices** - Metaphors, simile, personification, etc.
3. **Themes** - Main and secondary themes
4. **Symbolism** - Symbolic elements and their meanings
5. **Historical Context** - Cultural and literary context
6. **Summary** - Concise summary of the passage

Each analysis is passage-specific and varies based on content.

## Project Structure

```
Backend/
├── controllers/
│   ├── authController.js      # Authentication logic
│   └── literatureController.js # Analysis logic
├── models/
│   ├── User.js               # User schema
│   └── Session.js            # Analysis schema
├── routes/
│   ├── authRoutes.js         # Auth endpoints
│   └── analysisRoutes.js     # Analysis endpoints
├── middlewares/
│   ├── authMiddlewares.js    # JWT verification
│   └── uploadMiddlewares.js  # File upload handling
├── config/
│   └── db.js                 # MongoDB connection
├── utils/
│   └── prompts.js            # AI prompts
├── .env                      # Environment variables
├── server.js                 # Entry point
└── package.json
```

## Running in Production

1. **Update environment variables**
```env
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com
```

2. **Deploy to service**
   - Heroku
   - Railway
   - Render
   - AWS EC2
   - DigitalOcean

3. **Example: Deploy to Railway**
```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

## Testing

Test endpoints using:
- **Postman** - Visual API testing
- **cURL** - Command line
- **Thunder Client** - VS Code extension

Example cURL:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'
```

## Configuration Options

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| NODE_ENV | Environment | development |
| MONGO_URI | MongoDB connection | localhost:27017 |
| JWT_SECRET | JWT signing secret | required |
| GEMINI_API_KEY | Google Gemini API | required |
| FRONTEND_URL | Frontend origin | http://localhost:5173 |

## Database Schema

**User**
```javascript
{
  username: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

**Analysis**
```javascript
{
  user: ObjectId,
  passage: String,
  title: String,
  author: String,
  aiAnalysis: {
    meanings: String,
    literaryDevices: String,
    themes: String,
    symbolism: String,
    historicalContext: String,
    summary: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

## Troubleshooting

**MongoDB Connection Error**
- Verify MongoDB is running: `mongod`
- Verify MONGO_URI in .env

**Gemini API Error**
- Verify GEMINI_API_KEY is valid
- Check API rate limits (60 requests/min free tier)
- Falls back to local analysis if API fails

**CORS Error**
- Verify FRONTEND_URL matches frontend origin
- Verify CORS middleware configuration

**Port Already in Use**
- Change PORT in .env
- Or terminate process: `lsof -i :5000`

## Resources

- [Express.js Docs](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Google Gemini API](https://ai.google.dev/)
- [JWT.io](https://jwt.io/)
- [Mongoose Docs](https://mongoosejs.com/)

## Contributing

Issues and pull requests are welcome.

## License

MIT License - See LICENSE file for details

---

Built for literary analysis applications.
