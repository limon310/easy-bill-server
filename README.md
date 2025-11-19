# 💳 Pay Bill Management System

A full-stack web application designed to simplify utility bill management.  
Users can view, pay, download, and track bills efficiently — all in one place.

---

## 🚀 Features

- 🔐 **User Authentication**
  - Register, login, and manage your account securely.
- 📄 **Bill Management**
  - Add, view, update, and delete bills easily.
- 💰 **Bill Payment System**
  - Pay bills online and track total paid amount.
- 📊 **Total Paid Tracking**
  - User can see how many bill he successfully paid payment.
- 🔍 **Search & Filter**
  - Search bills by category with dropdown filtering.
- 🧾 **PDF Export**
  - Generate and download your payment history in PDF format.
- ⚡ **Real-time Updates**
  - UI updates instantly without page reload.
- 🌈 **Responsive UI**
  - Clean and modern interface built with Tailwind CSS and React.

---

## 🛠️ Tech Stack

**Frontend:**
- React.js
- React Router
- Tailwind CSS
- Lucide Icons
- SweetAlert2
- React Toastify
- framer motion
-lottie react
- jsPDF + jsPDF AutoTable

**Backend:**
- Node.js
- Express.js
- MongoDB 

---

💡 Future Improvements

✅ Add payment gateway integration

✅ Add admin dashboard

✅ Add monthly reports & analytics

✅ Improve UI animations


👨‍💻 Author

Md Limon Islam
📧 Email: [mdlimonislam134@gmail.com]
💼 GitHub: https://github.com/your-username

Live Link: [https://easy-bill-9d276.web.app/]

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
## client side--
git clone https://github.com/limon310/easy-bill-client

## server side--
git clone https://github.com/limon310/easy-bill-server

2️⃣ Install Dependencies
For server:
cd server
npm install

For client:
cd client
npm install

3️⃣ Set Environment Variables

Create a .env file inside the server folder and add:

PORT= process.env.PORT || 3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

4️⃣ Run the Application
Start backend server:
npm run dev

Start frontend:
npm start


Then open your browser and go to:
👉 http://localhost:5173

🪪 License

This project is licensed under the MIT License – feel free to use and modify it.

