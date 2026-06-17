# ResuCraft: Precision Resume Builder ️

ResuCraft is a powerful, full-stack resume builder designed for professionals who need pixel-perfect, multi-page PDF resumes. It features a custom rendering engine that ensures your resume looks exactly as intended across all platforms.

## Key Features

- **Pixel-Perfect PDF Export**: Custom document rendering and pagination engine for A4-sized resumes.
- **AI-Powered Import**: Extract information from existing resumes using OpenAI (optional).
- **Multiple Layouts**: Choose from three professional design templates.
- **Dynamic Content Management**: Easily add, remove, and reorder sections.
- **Privacy First**: Your data stays yours, with local-first editing and secure cloud storage options.

## Tech Stack

- **Frontend**: React (Vite), React-PDF/Renderer, Axios
- **Backend**: Node.js, Express, MongoDB (Mongoose)
- **AI Integration**: OpenAI API (for resume parsing and rewriting)
- **Styling**: Vanilla CSS

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)
- OpenAI API Key (optional, for AI features)

### Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:mohammad-sami-dev/resucraft.git
   cd resucraft
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   OPENAI_API_KEY=your_openai_key
   AI_DEV_MODE=false
   ```

   Create a `src/.env` file for the frontend:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

### Running the App

1. Start the backend:
   ```bash
   npm run server
   ```

2. Start the frontend:
   ```bash
   npm run dev
   ```

## License

This project is licensed under the MIT License.
