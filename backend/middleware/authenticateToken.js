import { firebaseAuth } from "../config/firebase.js";
import User from "../models/User.js";

function tokenToID(request, response, next) {
  const headerToken = request.headers.authorization;
  if (!headerToken) {
    return response.send({ message: "No token provided" }).status(401);
  }

  if (headerToken && headerToken.split(" ")[0] !== "Token") {
    return response.send({ message: "Invalid token" }).status(401);
  }

  const token = headerToken.split(" ")[1];
  if (token === undefined) {
    return response.send({ message: "Invalid token" }).status(401);
  }

  firebaseAuth
    .verifyIdToken(token)
    .then(async (user) => {
      // getOrCreate User

      // check if `User` with same uid exists
      const dbUser = await User.findOne({ uid: user.uid });

      // if not create user with respective credentials
      if (dbUser === null || dbUser.length === 0) {
        const saveUser = new User({
          name: user.name,
          picture: user.picture,
          auth_time: user.auth_time,
          user_id: user.user_id,
          email: user.email,
          uid: user.uid,
        });
        await saveUser.save();
      }

      // save user in request so that next() function can easily access it
      request["userId"] = user.uid;

      // call function to run after middleware is finished
      next();
    })
    .catch((err) =>
      response
        .send({ message: "Could not authorize" + err.toString() })
        .status(403)
    );
}

export default tokenToID;
