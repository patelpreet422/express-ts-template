import express from "express";
import "process";
import morgan from "morgan";
import * as http from "http";
import multer from "multer";

const app = express();
const PORT = process.env.PORT || 8181;

const routes = express.Router();
routes.get("/", (req, res) => {
  console.table(`request: ${req}`);
  res.send("Hey, buddy!");
});

const storage = multer.diskStorage({
  destination: ".",
  filename: (req, file, cb) => {
    const filename = file.originalname;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

routes.post("/", upload.any(), (req, res) => {
  res.send(req.files);
});

app.use(morgan("combined"));
app.use(express.json());
app.use(express.static("."));
app.use("/users", routes);

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`HTTP server listening on ${PORT}`);
});
