## Should I go exercise today

## Team members
1. Jiramate Kedmake 6610545201 
2. Yutivich Tun-ueng 6610545910

We are currently studying at Kasetsart University Bang Khen Campus

Faculty: Engineering

Department: Software And Knowledge Engineering (SKE)


## Project Overview
This project aims to help people decide whether or not they should go outside
to exercise based on the conditions like weather and the percentage of people who might go.
This will also show the relationship between the percentage of people going to exercise and the weather.

## 🚀 Features

- ✅ **Personalized Suggestions**  
  Get a simple yes/no recommendation like:

  > *“Yes. The weather is perfect today.”*

- 📊 **History Exercise Stats**  
  View max, min, and average numbers of people exercising throughout the whole month of data collection.

- 🔮 **Predictions**  
  Estimate how many people will exercise at future time intervals (or right now) using predictive models.

- 🧠 **Heatstroke Risk Score**  
  Get data representing the current environmental risk for heat-related illness.


## Api to be provided to users

- Text Suggestion based on the data (Ex. YES: Outside is in good condition, go ahead and enjoy!)
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

### 4. **Upload the data to your Database in phpMyAdmin**

```txt
data/yearProject.csv
```

In your database (b66......) -> name the table "yearProject" (or name it something else and change the code if you know what you're doing)

### 5. **Create .env.local file**

```txt
Find the example from example.env from root directory
```
---

### 6. **Start the development server**

```bash
npm run dev
```

This will launch the frontend at:

```
http://localhost:3000
```

---

### 7. **Run the tests**

In a separate terminal (while the dev server is running):

```bash
cd tests
pytest test_website_manual.py
```

Since there is a problem with phpMyAdmin Database max user connection some api test might fail. It will resolve itself after a while (>1 hour)
---

## ✅ Notes

- Make sure the dev server is **already running** before running Selenium or `requests` tests.
- You have to connect to your own database with the data we provided in "data" folder (or you can use your own data if you have one)
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

---

## 🧠 Prediction Model

This project includes a basic prediction model that estimates the number of people based on weather conditions such as temperature, humidity, precipitation, and PM2.5 levels. While the model may not provide highly accurate results due to data limitations, it offers a useful approximation to support decision-making.

The data is visualized using python sklearn library in **Google Colab**
The model is trained by the library "ml-regression-multivariate-linear" in javascript.

[EDA](https://colab.research.google.com/drive/1QH3cfshCUESUoD8XnBOln-4Af9MValTy?usp=sharing)

