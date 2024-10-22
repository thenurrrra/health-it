// server.js
const express = require("express");
const cors = require("cors");

const app = express();

// Настройка CORS
app.use(
  cors({
    origin: "http://localhost:5173", // ваш фронтенд домен
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// Другие настройки сервера
app.use(express.json());

app.get("/equipments", (req, res) => {
  // Логика получения данных оборудования
  res.json([
    /* данные оборудования */
  ]);
});

app.get("/equipments/:id", (req, res) => {
  // Логика получения данных конкретного оборудования по ID
  res.json({
    /* данные конкретного оборудования */
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
