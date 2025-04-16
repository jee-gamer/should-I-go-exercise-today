## Project Overview
This project aims to help people decide whether or not they should go outside
to exercise based on the conditions like weather and the percentage of people who might go.
This will also show the relationship between the percentage of people going to exercise and the weather.

## Api to be provided to users

- Text Suggestion based on the data (Ex. You should go!: -description-)
- Percentage of people doing exercise at current time interval
- Max/Min/Average amount of people that exercise in the day
- Prediction of amount of people that exercise on time interval based on data fetched from api
- Number representing Heatstroke risk

<a href="../../wiki">Go to WIKI</a>

## How to install

### 🔧 Requirements

Make sure you have the following installed:

- **Node.js** (>=16.x)
- **npm** (comes with Node)
- **Python** (>=3.8)
- **pip** (Python package installer)
---

## 📦 Setup Instructions

### 1. **Clone the repository**

```bash
git clone https://github.com/jee-gamer/should-I-go-exercise-today.git
cd your-repo
```

---

### 2. **Install Node dependencies**

```bash
npm install
```

---

### 3. **Install Python dependencies**

```bash
pip install -r requirements.txt
```

Your `requirements.txt` should include:

```txt
selenium
requests
```
---

### 4. **Start the development server**

```bash
npm run dev
```

This will launch the frontend at:

```
http://localhost:3000
```

---

### 5. **Run the tests**

In a separate terminal (while the dev server is running):

```bash
python -m unittest discover tests
```

---

## ✅ Notes

- Make sure the dev server is **already running** before running Selenium or `requests` tests.
- You have to connect to your own database and use your own data.
---

## 💼 Database Schema Requirements

This application requires a MySQL-compatible database table with the following schema:

### Table: `yearProject`

| Column        | Type       | Null | Default             | Extra           |
|---------------|------------|------|---------------------|-----------------|
| `id`          | int        | No   | None                | AUTO_INCREMENT  |
| `timestamp`   | datetime   | No   | CURRENT_TIMESTAMP   | DEFAULT_GENERATED |
| `temperature` | float      | No   | None                |                 |
| `humidity`    | float      | No   | None                |                 |
| `people`      | int        | No   | None                |                 |
| `precip_mm`   | float      | No   | None                |                 |
| `PM25`        | float      | No   | None                |                 |


