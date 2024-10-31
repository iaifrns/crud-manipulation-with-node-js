import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __direname = path.dirname(__filename);
const app = express();

const __publicfolder = path.join(__direname, "public");

app.use(express.static(__publicfolder));
app.use(express.json())

app.get("/", (req, res) => {
  res.sendFile(path.join(__publicfolder, "mainPage.html"));
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__publicfolder, "createUserPage.html"));
});

app.post("/create_role", (req, res) => {
  const data = req.body;
  fs.writeFile(
    path.join(__publicfolder, 'json', "role.json"),
    JSON.stringify(data, null, 2),
    (err) => {
      if (err) {
        res.json({ error: true, message: "an error occured" });
      }
      res.json({ message: "Role Created" });
    }
  );
});

const port = "3000";

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
