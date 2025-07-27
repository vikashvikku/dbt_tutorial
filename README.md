# Interactive dbt Guide - React Application

This project is an interactive, single-page web application designed to be a comprehensive, chapter-by-chapter guide to learning dbt (data build tool). It transforms a traditional text-based tutorial into an engaging and user-friendly learning experience.

---

## 🚀 Features

* **Interactive Chapter Navigation**: A persistent sidebar allows users to easily navigate between the 10 chapters of the dbt guide.
* **Responsive Design**: Fully responsive layout that works seamlessly on desktop, tablet, and mobile devices.
* **Modern UI/UX**: Clean and attractive interface with smooth animations and transitions, styled using custom CSS.
* **Reusable Components**: Built with modular, reusable React components for better maintainability.
* **Code Snippets**: Each code block includes a "Copy to Clipboard" feature for ease of use.

---

## 📁 Project Structure

```
/


└── images/                               # Static images used in chapters
│       ├── fig1.png
│       └── fig2.png
└── src/
    ├── App.css                               # Custom CSS styles
    ├── App.jsx                                # Main React application component
    └── main.jsx                             # React entry point
├── index.html                            # Main HTML template
```

---

## 💠 Getting Started

Follow these steps to set up the project locally.

### ✅ Prerequisites

Make sure you have the following installed:

* [Node.js](https://nodejs.org/) (which includes npm)
* npm or yarn package manager

### 📦 Installation & Setup

1. **Clone the repository**

```bash
git clone https://github.com/vikashvikku/dbt_tutorial
```

2. **Navigate into the project directory**


```

3. **Install dependencies**

```bash
npm install
# or
yarn install
```

4. **Add images**

Make sure the following images are placed in the `images` directory:

* `fig1.png`
* `fig2.png`

---

## 💻 Running the Application

To start the development server:

```bash
npm run dev
```

This will run the app in development mode. Open your browser and navigate to:

```
http://localhost:5174
```

The app will reload automatically when you make changes.

---

## 🏗️ Building for Production

To build the app for production:

```bash
npm run build
```

This will create an optimized production build in the `build/` directory.

---

## 🧰 Technologies Used

* **React** – JavaScript library for building UIs
* **JavaScript (ES6+)** – Main programming language
* **CSS** – Custom styling without any framework
* **HTML5** – Base HTML structure

---

## 🙌 Contributing

Pull requests are welcome! If you'd like to contribute, please fork the repo and submit a PR.

---

## 📢 Contact

For any inquiries or feedback, reach out via [vikkuvikash79097@gmail.com](mailto:vikkuvikash79097@gmail.com).
