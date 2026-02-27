# Literature Analyzer

A comprehensive AI-powered literature analysis platform built with React and Node.js. This application provides users with detailed analysis of English literature passages including examination of meanings, literary devices, themes, symbolism, and historical context.

## Features

### Core Functionality
- **AI-Powered Analysis**: Provides comprehensive AI analysis of literature passages including detailed explanations of meanings, literary devices, themes, and symbolism
- **Custom Questions**: Processes specific questions about passages and provides contextual answers
- **Analysis History**: Maintains records of all previous analyses for reference purposes
- **Personal Notes**: Allows users to add custom notes to analyses for study purposes
- **Deep Insights**: Examines vocabulary, literary devices, themes, symbolism, and historical context of literary works

### User Experience
- **Modern UI**: Responsive interface with smooth animations using Framer Motion for enhanced visual feedback
- **Secure Authentication**: JWT-based authentication system with bcrypt password hashing for user data protection
- **Responsive Design**: Optimized for all devices and screen sizes including mobile, tablet, and desktop
- **User-Friendly**: Intuitive text input interface with instant AI analysis and real-time feedback

## Project Structure

```
interpre/
├── Backend/                 # Node.js/Express backend
│   ├── config/
│   │   └── db.js          # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js         # Authentication logic
│   │   └── literatureController.js   # Literature analysis & API
│   ├── middlewares/
│   │   ├── authMiddlewares.js   # JWT authentication middleware
│   │   └── uploadMiddlewares.js # File upload handling
│   ├── models/
│   │   ├── User.js         # User data model
│   │   └── Session.js      # Analysis data model (renamed from Session)
│   ├── routes/
│   │   ├── authRoutes.js         # Authentication endpoints
│   │   └── analysisRoutes.js     # Literature analysis endpoints
│   ├── uploads/            # File upload directory
│   ├── utils/
│   │   └── prompts.js      # AI prompt templates for literature
│   ├── package.json        # Backend dependencies
│   ├── .env               # Environment variables (create this)
│   └── server.js          # Main server file
│
├── Frontend/              # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── assets/
│   │   │   ├── landingpage.png      # Hero section image
│   │   │   └── react.svg
│   │   ├── components/
│   │   │   ├── Cards/               
│   │   │   │   ├── ProfileInfoCard.jsx
│   │   │   │   └── HistoryCard.jsx
│   │   │   ├── Literature/          # Literature-specific components
│   │   │   │   ├── PassageInput.jsx  # Passage input form
│   │   │   │   ├── AnalysisDisplay.jsx # Analysis results display
│   │   │   │   └── HistoryCard.jsx
│   │   │   ├── Inputs/              # Form input components
│   │   │   ├── Loader/              # Loading components
│   │   │   ├── layouts/             # Layout components
│   │   │   ├── DeleteAlertContent.jsx
│   │   │   ├── Drawer.jsx
│   │   │   └── Modal.jsx
│   │   ├── context/
│   │   │   └── userContext.jsx      # User state management
│   │   ├── pages/
│   │   │   ├── Auth/                # Login/Signup pages
│   │   │   ├── Literature/          # Literature analysis pages
│   │   │   │   ├── AnalysisPage.jsx # Main analysis interface
│   │   │   │   └── HistoryPage.jsx  # View past analyses
│   │   │   └── LandingPage.jsx      # Main landing page
│   │   ├── utils/
│   │   │   ├── apiPaths.js          # API endpoint constants
│   │   │   ├── axiosInstance.js     # Axios configuration
│   │   │   ├── data.js              # Static data and configurations
│   │   │   ├── helper.js            # Utility functions
│   │   │   └── uploadImage.js       # Image upload utilities
│   │   ├── App.jsx                  # Main app component
│   │   ├── index.css               # Global styles
│   │   └── main.jsx                # App entry point
│   ├── package.json                # Frontend dependencies
│   ├── vite.config.js             # Vite configuration
│   └── README.md                  # Frontend-specific README
│
└── .gitignore                     # Git ignore rules
```

## Technology Stack

### Frontend
- **React 19** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **React Router DOM 7** - Client-side routing
- **Framer Motion** - Smooth animations and transitions
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Icons** - Icon library (Lucide React icons)
- **Axios** - HTTP client for API requests
- **React Hot Toast** - Toast notifications
- **Moment.js** - Date/time handling
- **React Markdown** - Markdown rendering
- **React Syntax Highlighter** - Code syntax highlighting

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload middleware
- **CORS** - Cross-Origin Resource Sharing
- **Google GenAI** - Google AI integration
- **OpenAI** - OpenAI API integration
- **Axios** - HTTP client
- **dotenv** - Environment variable management

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd interpre
   ```

2. **Backend Setup**
   ```bash
   cd Backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd Frontend
   npm install
   ```

### Environment Configuration

1. **Backend Environment Variables**
   Create a `.env` file in the `Backend` directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/literature-analyzer
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   GOOGLE_GENAI_KEY=your_google_ai_key_here (optional)
   OPENAI_API_KEY=your_openai_key_here (optional)
   ```

   **Note**: Currently using mock AI analysis. To enable real AI:
   - Add Google Generative AI or OpenAI API keys
   - Update `literatureController.js` to use real AI services

2. **Frontend Configuration**
   The frontend is configured to work with the backend API. Update `src/utils/apiPaths.js` if your backend runs on a different port.

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd Backend
   npm run dev  # For development with nodemon
   # or
   npm start    # For production
   ```

2. **Start the Frontend Development Server**
   ```bash
   cd Frontend
   npm run dev
   ```

3. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## How to Use

### 1. Landing Page
- Display of application features
- Access point to main functionality

### 2. Authentication
- **Sign Up**: Account creation with email and password
- **Sign In**: Access to existing accounts
- **Password Security**: Passwords are securely hashed using bcrypt

### 3. Analysis Page (`/analyze`)
- **Paste Text**: Input of literature passages up to 5000 characters
- **Add Metadata** (Optional): Entry of book title and author name
- **Ask Questions** (Optional): Specification of questions regarding the passage
- **Analyze**: Initiates AI-powered analysis

### 4. Analysis Results
The AI provides analysis across 6 dimensions:
- **Meanings & Vocabulary**: Word meanings and author's word choices
- **Literary Devices**: Metaphors, similes, personification, imagery, etc.
- **Themes**: Main themes and central ideas
- **Symbolism**: Symbols and their deeper meanings
- **Historical Context**: Historical and cultural background
- **Summary**: Overall interpretation of the passage

### 5. History Page (`/history`)
- **View Past Analyses**: Access to all previous passage analyses
- **Search & Filter**: Ability to locate analyses by title or content
- **View Details**: Access to complete analysis details
- **Add Notes**: Addition of personal notes to analyses
- **Delete**: Removal of analyses as needed
- **Download**: Export of analysis as text file

### 6. Session Management
- **Auto-Save**: Automatic storage of all analyses to user accounts
- **Review History**: Access to previous sessions
- **Personal Notes**: Storage of custom observations and thoughts

## Key Components

### Frontend Pages
- **LandingPage.jsx**: Main landing page with features and call-to-action
- **AnalysisPage.jsx**: Main interface for pasting passages and getting analysis
- **HistoryPage.jsx**: View all saved analyses with search/filter
- **Login.jsx & SignUp.jsx**: Authentication forms

### Frontend Components (Literature-specific)
- **PassageInput.jsx**: Form for pasting passages with metadata inputs
- **AnalysisDisplay.jsx**: Tabbed interface showing all 6 analysis dimensions
- **HistoryCard.jsx**: Card component displaying past analyses in a grid

### Backend Controllers
- **authController.js**: User registration, login, JWT token generation
- **literatureController.js**: AI passage analysis, history management, notes

### Database Models
- **User.js**: Stores user profile (name, email, hashed password, profile image)
- **Session.js** (Analysis): Stores passages, AI analysis, user notes

### API Endpoints

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

#### Literature Analysis
- `POST /api/analysis/analyze` - Analyze a passage (requires auth)
- `GET /api/analysis/history` - Get all user's analyses (requires auth)
- `GET /api/analysis/:id` - Get specific analysis (requires auth)
- `PUT /api/analysis/:id/notes` - Add/update notes (requires auth)
- `DELETE /api/analysis/:id` - Delete an analysis (requires auth)

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for secure password storage
- **CORS Protection**: Configured CORS for API security
- **Environment Variables**: Sensitive data stored in environment variables
- **Input Validation**: Server-side validation for passage length (max 5000 chars)
- **User-Specific Data**: All analyses tied to authenticated users

## How AI Analysis Works

### Current Implementation
- Using **mock data generator** for demonstration
- Returns realistic analysis across all 6 dimensions
- No API calls required (good for testing)

### To Enable Real AI:
1. **Google Generative AI** (Recommended)
   ```bash
   npm install @google/generative-ai
   ```
   - Add API key to `.env`
   - Update `literatureController.js` line ~47

2. **OpenAI GPT**
   ```bash
   npm install openai
   ```
   - Add API key to `.env`
   - Update `literatureController.js` to use OpenAI client

## Data Flow

```
User Login → JWT Token Issued
    ↓
User Pastes Passage → Frontend sends to Backend
    ↓
Backend validates passage (auth required)
    ↓
AI Service analyzes passage
    ↓
Analysis saved to MongoDB (tied to user)
    ↓
Results displayed in UI with tabbed interface
    ↓
User can add notes, delete, or view history
```

## Design Features

### Animations
- **Framer Motion**: Smooth page transitions and component animations
- **Hover Effects**: Interactive buttons and cards
- **Loading States**: Skeleton loaders and spinners
- **Floating Elements**: Subtle floating animations on the hero section

### UI/UX
- **Responsive Design**: Mobile-first responsive layout
- **Modern Aesthetics**: Clean, professional design
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Performance**: Optimized images and lazy loading


## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the ISC License - see the package.json files for details.

## Author

**Aditya Bisht**
- Converted from Interview Prep AI to Literature Analyzer
- Built using React, Node.js, and AI technologies

## Upcoming Features

- [ ] Real AI integration (Google GenAI / OpenAI)
- [ ] PDF and document upload
- [ ] Multiple language support
- [ ] Advanced search and filtering
- [ ] Export analyses in multiple formats
- [ ] Sharing and collaboration features
- [ ] Literary device glossary
- [ ] Historical period reference guide

## Resume
- Develops innovative algorithms for text summarization.
- Collaborates with cross-functional teams for app development.
- Expert in Python, JavaScript, and machine learning frameworks.
- Successfully launched an AI-driven literature summarizing tool.

Tech: Python, JavaScript, TensorFlow, Flask, Git, Markdown

**Start analyzing literature with AI today!** 
