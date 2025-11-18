# PerfectFit AI – Smart Bra & Panty Selector for Women

**PerfectFit AI** is the #1 smart bra & panty selector for women. Choose your body type, breast shape, hip shape, outfit, and personal preferences—then get AI-powered recommendations with real product links. Accurate, beautiful, and designed to make women feel confident.

## 🎯 Features

- **AI-Powered Recommendations**: Uses Groq AI (Llama 3.3 70B) to provide personalized bra and panty recommendations
- **Smart Product Search**: Integrates with Serper.dev to find real products from online stores
- **Beautiful UI**: Modern, feminine design with pink gradient theme
- **Multi-Step Forms**: Intuitive step-by-step selection process
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

## 🚀 Tech Stack

### Frontend
- React + Vite
- TailwindCSS + DaisyUI
- React Router DOM
- Axios

### Backend
- Node.js + Express
- Groq AI SDK (Llama 3.3 70B)
- Serper.dev Shopping API
- CORS enabled

## 📁 Project Structure

```
PerfectFit/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── HeroSection.jsx
│   │   │   ├── OptionCard.jsx
│   │   │   ├── Stepper.jsx
│   │   │   ├── PinkButton.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── BraForm.jsx
│   │   │   ├── PantyForm.jsx
│   │   │   └── Results.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── style.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── routes/
│   │   ├── bra.js
│   │   └── panty.js
│   ├── server.js
│   └── package.json
├── public/
│   ├── boobstype/
│   └── asstypes/
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Groq API Key
- Serper.dev API Key

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
GROQ_API_KEY=your_groq_api_key_here
SERPER_API_KEY=your_serper_api_key_here
PORT=5000
```

4. Start the backend server:
```bash
npm start
# or for development with auto-reload:
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## 🌐 Deployment

### Frontend (Netlify)

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Deploy the `dist` folder to Netlify
3. **IMPORTANT**: Set environment variable in Netlify dashboard:
   - Go to Site settings > Environment variables
   - Add: `VITE_API_URL` = `https://your-render-backend-url.onrender.com`
   - Replace `your-render-backend-url` with your actual Render backend URL
4. Redeploy after setting the environment variable

### Backend (Render)

1. Connect your GitHub repository to Render
2. Set the following:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
3. Add environment variables in Render dashboard:
   - `GROQ_API_KEY`
   - `SERPER_API_KEY`
   - `PORT` (optional, defaults to 5000)

## 📝 API Endpoints

### POST `/api/recommend/bra`
Recommends bras based on user preferences.

**Request Body:**
```json
{
  "type": "bra",
  "ageRange": "25-30",
  "bodyType": "Curvy",
  "braSize": "34C",
  "breastType": "Round",
  "dressType": "T-shirt",
  "occasion": "Office",
  "appearancePreference": "Natural",
  "sexualExperience": "No",
  "colorPreference": "Nude",
  "wantsColor": true
}
```

**Response:**
```json
{
  "aiSummary": "Detailed AI analysis...",
  "recommendedStyles": "Recommended styles and features...",
  "products": [
    {
      "title": "Product Name",
      "price": "$29.99",
      "image": "image_url",
      "link": "product_url",
      "rating": "4.5",
      "store": "Store Name"
    }
  ]
}
```

### POST `/api/recommend/panty`
Recommends panties based on user preferences.

**Request Body:**
```json
{
  "type": "panty",
  "ageRange": "25-30",
  "bodyType": "Curvy",
  "hipSize": "36",
  "pantySize": "M",
  "buttType": "O/Round-Shaped",
  "pantyStyle": "Hipster",
  "purpose": "Daily wear",
  "colorPreference": "Black",
  "wantsColor": true
}
```

**Response:** Same format as bra endpoint.

## 🎨 Color Palette

- **Primary**: #ff88c6 (blush pink)
- **Secondary**: #ff5faa (hot pink)
- **Accent**: #ffe5f3
- **Text Dark**: #5b2d42
- **Text Light**: white

## 📄 License

ISC

## 👥 Author

Built with ❤️ for women's comfort and confidence.

---

**Tagline**: Find your perfect fit with AI-powered comfort, confidence & beauty.

