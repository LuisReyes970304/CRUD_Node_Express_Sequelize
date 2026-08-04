import express, { type Response, type Request } from "express";
import multer from "multer";
import axios from "axios";
import cors from "cors";

const port: Number = 3005;
const host: String = "http://localhost";

const app = express();

interface Operaciones {
  id: number;
  name: string;
  value: number[];
}

const suma: Operaciones = {
  id: 1,
  name: "suma",
  value: [1, 2, 3],
};

//Middleware
app.use((req: Request, res: Response, next) => {
  console.log("Time:", Date.now());
  next();
});

app.use(express.json());

//Multer file manager that works as middleware.

// const upload = multer({ dest: 'files/' });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "files/");
  },
  filename: function (req, file, cb) {
    const nombre = Date.now() + "_" + file.originalname.replace(/\s+/g, "_");
    cb(null, nombre);
  },
});

const upload = multer({ storage: storage });

app.post(
  "/profile",
  upload.single("avatar"),
  function (req: Request, res: Response, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any

    const size = req.file?.size ? req.file.size / (1024 * 1024) : 0;
    if (size > 2) {
      console.log("El tamaño del archivo supera el limite");
    } else {
      console.log(req.file);
    }
    console.log(`${size.toFixed(2)} MB`);
    res.json(req.file);
  },
);

app.get("/", (req: Request, res: Response) => {
  res.send(`<h1 style="color:darkblue;">Hello world</h1> ${suma.value}`);
});

app.listen(port, () => {
  console.log(`Server is running on ${host}:${port}`);
});

//AXIOS

async function callapi(url: string, path: string){
  const response = await axios.get(url + path);
  return response.data;
}

app.get("/example_axios", async (req: Request, res: Response) => {
  const url = "https://rickandmortyapi.com/api";
  const path = "/character";
  const data = await callapi(url, path);
  const character = []
  for (let char of data.results){
    character.push({id: char.id, name: char.name, gender: char.gender});
  }
  res.json(character)
  console.log(character)
});

//CorsOrigin

const corsOrigin = {
  origin: "*",
};

app.use(cors(corsOrigin));
