import express from 'express';
import cors from 'cors';
import sequelize from "./dbconfig.js";
import "../Backend/Models/User.js";
import router from "./Routes/index.js";

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

// Router Setup
app.use(router);

await sequelize.authenticate();
console.log("PostgreSQL Connected ✅");


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
