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
  // 1. Try to get token from header OR cookie
  const authHeader = req.headers.authorization;
  const token = (authHeader && authHeader.startsWith("Bearer")) 
    ? authHeader.split(" ")[1] 
    : null 

  // 2. If no token found, block access
  if (!token) {
    return res.status(401).json({ msg: "Not authorized, no token" });
  }

  try {
    // 3. Verify the token using the correct secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 4. Attach user info
    req.user = { id: decoded.id || decoded.userId || decoded._id };
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Not authorized, token failed" });
  }
};

module.exports = protect;

