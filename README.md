
# 💸 SmartSpender – Personal Finance Tracker with AI Insights

SmartSpender is a full-stack MERN application that helps users track their income and expenses, analyze spending habits, and get smart AI-powered financial suggestions. It includes a user-friendly dashboard, detailed graphs, and intelligent budgeting advice.

![SmartSpender Banner](https://via.placeholder.com/1000x300?text=SmartSpender+Finance+Dashboard)

---

## 🚀 Features

- 📊 **Expense & Income Tracking**
- 🔐 **User Authentication (JWT)**
- 💡 **AI-Powered Spending Analysis** (Gemini API)
- 🧠 Smart budget advice based on habits
- 📆 Filter by date, category, and type
- 📈 Visualizations with Recharts
- 📨 Email alerts for budget limits (optional)

---

## 🧱 Tech Stack

| Layer        | Technology                      |
|--------------|----------------------------------|
| Frontend     | React (Vite) + Tailwind CSS / MUI |
| Backend      | Node.js + Express.js             |
| Database     | MongoDB + Mongoose               |
| Authentication | JWT / Google OAuth             |
| Charts       | Recharts / Chart.js              |
| AI Engine    | Gemini API             |
| Hosting      | Vercel (frontend) + Render/Cyclic (backend) |

---

## 📸 Screenshots

> *(Add actual screenshots once available)*

| Dashboard | Transaction Form | AI Insights |
|----------|------------------|-------------|
| ![](https://via.placeholder.com/300x200) | ![](https://via.placeholder.com/300x200) | ![](https://via.placeholder.com/300x200) |

---

## 🛠️ Setup Instructions

### 📁 Clone Repository
```bash
git clone https://github.com/yourusername/smartspender.git
cd smartspender
```

### 🔧 Install Dependencies

#### Backend
```bash
cd server
npm install
```

#### Frontend
```bash
cd ../client
npm install
```

### 🔐 Set Environment Variables

Create `.env` in both `client/` and `server/` directories.

#### Example for `server/.env`:
```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

---

## 🧠 AI Integration

- Gemini/OpenAI API is used to analyze your transaction data
- Gives budgeting advice, overspending alerts, and category-level suggestions
- Future plan: integrate voice chat and natural language queries

---

## 📅 Upcoming Features

- PDF export of monthly reports
- Progressive Web App (PWA) support
- Shared budgets with family/friends
- Currency selector (INR, USD, etc.)
- Push/email notifications

---

## ✨ Demo

[🌐 Live Demo](https://your-deployed-link.com)  
[📽️ Demo Video](https://your-demo-video-link.com)

---

## 🧑‍💻 Author

**Vishal Kumar**  
🚀 Full-Stack Developer | MERN + AI Enthusiast  
[Portfolio Website](https://yourportfolio.com) • [LinkedIn](https://linkedin.com/in/yourprofile) • [GitHub](https://github.com/yourusername)

---

## ⭐️ Show Your Support

If you like this project:

- Give it a ⭐️ on GitHub  
- Share it with friends  
- Use it in your resume!

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
