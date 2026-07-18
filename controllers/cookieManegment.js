const jwt = require("jsonwebtoken");

const refreshAceessToken = async (req, res) => {
  //const refreshToken = req.cookies.refreshToken; this will overwrite other accounts 
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ msg: "No refresh token provided" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const newAccessToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );
    res.status(200).json({ token: newAccessToken });
  } catch (error) {
    console.error("Refresh token error:", error);
    res.status(403).json({ msg: "Invalid or expired refresh token" });
  }
};

module.exports = refreshAceessToken