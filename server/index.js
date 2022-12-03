import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  user: "admin",
  host: "localhost",
  password: "PassWord!",
  database: "deha",
});

app.get("/get-length", (req, res) => {
  db.query(`SELECT COUNT(*) as count FROM users`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/register", (req, res) => {
  let id;
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  db.query(`SELECT COUNT(*) as count FROM users`, (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      id = result[0].count;
      db.query(
        "INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)",
        [id, username, email, password],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send("Values Inserted");
          }
        }
      );
    }
  });
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Wrong username/password combination!" });
      }
    }
  );
});

app.listen(1337, () => {
  console.log("Server is running on port 1337");
});
