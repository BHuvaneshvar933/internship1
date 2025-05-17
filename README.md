# SoftSell - Software License Resale Platform

SoftSell is a modern, single-page marketing website built using React and Tailwind CSS for a fictional startup that helps businesses recover value from unused software licenses. The platform is fully responsive, cleanly designed, and includes animations, dark/light mode support, and an optional AI-powered chatbot.

---

## 🚀 Features

- **Modern UI/UX**: Clean and responsive layout with coherent colors and fonts
- **Dark/Light Mode**: Toggle support with persistent theme
- **Framer Motion Animations**: Smooth transitions and effects
- **AI-Powered Chat Assistant**: Answer FAQs via OpenAI (optional integration)
- **Frontend Form Validation**: For accurate and clean user input
- **No Backend**: Static site with dummy data

---

## 🧩 Website Sections

1. **Hero Section**: Bold headline, subheading, and "Get a Quote" CTA
2. **How It Works**: Step-by-step flow – Upload License → Get Valuation → Get Paid
3. **Why Choose Us**: Trust-building tiles highlighting platform benefits
4. **Testimonials**: Two dummy customer reviews with names and roles
5. **Contact Form**: Name, Email, Company, License Type (dropdown), and Message – all validated

---

## 🛠️ Technologies Used

| Technology        | Purpose                        |
| ----------------- | ------------------------------ |
| React + Vite      | Core frontend framework        |
| Tailwind CSS v3.4 | Styling (via CDN – no PostCSS) |
| Framer Motion     | Animation and transitions      |
| OpenAI API        | Chatbot assistant (optional)   |

---

## 📦 Getting Started

### Prerequisites

- Node.js v14+
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/BHuvaneshvar933/internship1.git
cd internship1

# Install dependencies
npm install
# or
yarn

# (Optional) Add OpenAI key
echo "VITE_OPENAI_API_KEY=your_openai_api_key" > .env

# Run the development server
npm run dev
# or
yarn dev
```

Visit `http://localhost:5173` to view the site.

---

## 🚀 Deployment

```bash
npm run build
# or
yarn build
```

### Hosting Options

- **Vercel**: Seamless React app hosting
- **Netlify**: One-click deployment and form support
- **GitHub Pages**: Manual deployment via `gh-pages` branch

---

## 🗂️ Project Structure

```plaintext
src/
├── assets/         # Static assets like images
├── components/     # React components
│   ├── ChatBot.jsx
│   ├── ContactForm.jsx
│   ├── Footer.jsx
│   ├── Hero.jsx
│   ├── HowItWorks.jsx
│   ├── Navbar.jsx
│   ├── ScrollToTop.jsx
│   ├── Testimonials.jsx
│   └── WhyChooseUs.jsx
├── services/
│   └── openaiService.js
├── App.jsx         # Main component
├── App.css         # Global styles
├── index.css       # Tailwind base imports
└── main.jsx        # App entry point
```

---

## 🎨 Design Choices

- **Color Scheme**: Trust-centric blue tones with minimal accent shades
- **Typography**: Clean, sans-serif font with strong visual hierarchy
- **Animation**: Smooth fades and slide-ins with Framer Motion
- **Mobile-First**: Designed for all screen sizes from the start

---

## ⏱️ Time Spent

- 🧠 Design planning: 1 hours
- 💻 Core development: 2 hours
- 🧪 Testing + optimization: 0.5 hours

---

## 🔮 Future Enhancements

- Authentication system for license sellers
- Admin dashboard for tracking license sales
- Payment processor integration (Stripe, Razorpay)
- Multilingual support (i18n)
- Improved chatbot context memory

---

## 📜 License

MIT License

---

## 🌐 Live Preview

**Coming Soon** – Deployed to Vercel or Netlify

---

> Crafted with ❤️ by Bhuvaneshvar Reddy
