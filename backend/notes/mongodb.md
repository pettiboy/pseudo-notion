- install mongoose

```bash
npm i mongoose
```

- create `.env`

```
DATABASE_URL=mongodb://localhost/pseudo-notion
```

- `server.js`

```js
import mongoose from "mongoose";
import dotenv from "dotenv";

// to use environment variables
dotenv.config();

// database
mongoose.connect(process.env.DATABASE_URL); // connect to the database
const db = mongoose.connection; // store connection
db.on("error", (error) => console.error(error)); // error handling
db.once("open", () => console.log("connected to db")); // log success message on successful connection
```

- go to https://cloud.mongodb.com/v2/61e6b2a152a63f763e80f2ef#clusters

  - database access create user (remember password)
  - network access whitelist 0.0.0.0/0
  - go to databases click connect get Url and in .env

    ```
    DATABASE_URL=mongodb+srv://expressBackendUser:<password>@cluster0.hkeil.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
    ```

- understanding data modeling with mongodb https://www.youtube.com/watch?v=yuPjoC3jmPA&ab_channel=MongoDB

- understanding mongoose https://www.youtube.com/watch?v=DZBGEVgL2eE&t=93s&ab_channel=WebDevSimplified
