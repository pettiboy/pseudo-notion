## Set up

- install

```bash
npm init
npm i express mongoose
npm i -D dotenv nodemon
```

- in package.json script

```json
"type": "module", // to use React like exports and imports
"scripts": {
  "devstart": "nodemon server.js"
}
```

- server.js

```js
import express from "express";

// initialise express
const app = express();

// start server
app.listen(process.env.PORT || "8000", () => {
  console.log("server started on localhost:" + process.env.PORT || "8000");
});
```

- example route (without router)

```js
server.use("/", (_req, res) => {
  res.send("Hello, World");
});
```

- JSON

```js
server.use("/", (_req, res) => {
  res.send({ message: "Hello, World" });
});
```

- Explain MVC architecture https://www.youtube.com/watch?v=DUg2SWWK18I&ab_channel=WebDevSimplified

- we need to organise our routes into seperate files, so we use express's built in router.

`routes/example.js`

```js
import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({ message: "example message" });
});

export default router;
```

`server.js`

```js
server.use("/example", exampleRouter);
```
