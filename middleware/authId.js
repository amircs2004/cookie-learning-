const jwt = require("jsonwebtoken");
/*
const protect = async (req, res, next) => {
  /*
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = {
        id: decoded.id,
      };
      return next();
    } catch (error) {
        // return the error and stop execyting
      return res.status(401).json({ msg: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ msg: "Not authorized, no token" });
  }
    
 const authHeader = req.headers.authorization; 
  const token = req.cookies.token;
  //if theres no token passed in the cookies property in the resuest that comes the fronetend return no token
  if (!token) {
    return res.status(401).json({ msg: "Not authorized, no token" });
  }
  try{

    const decodedCokkie = jwt.verify(token , process.env.JWT_SECRET)
    // AS LONG TRUE WE WILL RETURN USER INFO TO req.user
    req.user = {
      id : decodedCokkie.id , 
    }
    next()

  }catch(error){
return res.status(401).json({ msg: "Not authorized, token failed" });
  }
};
*/
const protect = async (req, res, next) => {
  let token;
   console.log("DEBUG - Middleware reached, Headers:", req.headers.authorization);
  // Check if the Authorization header exists and starts with "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {

    try {
      // Extract the token from the "Bearer <token>" string
      token = req.headers.authorization.split(" ")[1];
      
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Attach the user info to the request object
      req.user = {
        id: decoded.id,
      };
      
      return next();
    } catch (error) {
      // If verification fails
      return res.status(401).json({ msg: "Not authorized, token failed" });
    }
  }

  // If no authorization header was found
  if (!token) {
    return res.status(401).json({ msg: "Not authorized, no token" });
  }
};

module.exports = protect;
