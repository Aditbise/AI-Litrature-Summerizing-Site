# Literary Analysis AI

An intelligent web application that uses Google Gemini AI to analyze literary passages and provide comprehensive, detailed insights into meanings, literary devices, themes, symbolism, historical context, and more.

## Features

- **AI-Powered Analysis**: Generates intelligent, passage-specific literary analysis
- **Chat-Like Interface**: Conversational user interface for literature analysis
- **Analysis History**: Maintains records of all user analyses for future reference
- **Regenerate Analyses**: Provides alternative perspectives on passages
- **Comprehensive Insights**: Six detailed analysis categories:
  - Meanings & Vocabulary
  - Literary Devices
  - Themes
  - Symbolism
  - Historical Context
  - Summary
- **User Authentication**: Secure JWT-based login system
- **Theme**: Professional interface with smooth animations
- **Responsive Design**: Optimized for desktop and tablet devices

## Tech Stack

**Frontend:**
- React 18
- Vite (build tool)
- Tailwind CSS (styling)
- Framer Motion (animations)
- React Router (navigation)
- React Hot Toast (notifications)
- Axios (HTTP client)

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- Google Generative AI SDK (Gemini)
- JWT Authentication
- Dotenv (configuration)

## Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- Google Gemini API Key

### Installation

1. **Clone the repository**
```bash
git clone <repo-url>
cd interpre-main
```

2. **Backend Setup**
```bash
cd Backend
npm install
```

Create `.env` file in Backend folder:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/interpre
JWT_SECRET=your_secret_key_here
GEMINI_API_KEY=your_gemini_api_key
FRONTEND_URL=http://localhost:5173
```

3. **Frontend Setup**
```bash
cd Frontend
npm install
```

4. **Start MongoDB**
```bash
mongod
```

5. **Run the application**

Terminal 1 (Backend):
```bash
cd Backend
npm start
```

Terminal 2 (Frontend):
```bash
cd Frontend
npm run dev
```

6. **Access application**
```
http://localhost:5173
```

## 📖 Usage

1. **Sign Up/Login** - Create or access account
2. **Paste a Passage** - Input literary text (maximum 5000 characters)
3. **Analyze** - Initiate AI-powered analysis
4. **Explore Results** - Review analysis across six categories
5. **Regenerate** - Generate alternative perspective on passage
6. **Save & Review** - Automatic storage of analyses to history

## API Endpoints

**Authentication:**
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

**Analysis:**
- `POST /api/analysis/analyze` - Analyze a passage
- `GET /api/analysis/history` - Get user's analysis history
- `GET /api/analysis/:id` - Get single analysis
- `DELETE /api/analysis/:id` - Delete analysis

## Configuration

### Environment Variables

**Backend (.env)**
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/interpre
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
FRONTEND_URL=http://localhost:5173
```

**Frontend (.env.local)**
```env
VITE_API_URL=http://localhost:5000/api
```

## Future Enhancements

- [ ] PDF export of analyses
- [ ] Share analyses via unique links
- [ ] Compare two passages side-by-side
- [ ] Bulk passage analysis
- [ ] Different analysis modes (quick, detailed, academic)
- [ ] Community analyses and comments
- [ ] Mobile app (React Native)
- [ ] Dark/Light theme toggle
- [ ] Multi-language support

## Project Structure

```
interpre-main/
├── Backend/
│   ├── controllers/        # Business logic
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── middlewares/       # Auth, upload middlewares
│   ├── utils/             # Helper functions
│   ├── config/            # Database config
│   └── server.js          # Entry point
├── Frontend/
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React context
│   │   └── utils/         # Helper functions
│   └── index.html         # HTML entry
└── README.md
```

## Contributing

Contributions are welcome. Users may fork, improve, and submit pull requests.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Acknowledgments

- Google Generative AI (Gemini) for AI capabilities
- MongoDB for database services
- React and Vite communities
- Tailwind CSS for styling framework

---

Analysis application for literary passages.
