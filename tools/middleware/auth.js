const auth = async function (req, res, next) {
  const clientid = req.headers["client-id"];
  const secret = req.headers["client-secret"];
  const CLIENTID = "2406";
  const SECRET = "1009";
  if (clientid !== CLIENTID) {
    console.log("CLIENT ID is invalid");
    console.log("accepted:", clientid);
    console.log("expected:", CLIENTID);
    return res
      .status(401)
      .json({ success: false, message: "An error occurred" });
  }
  if (secret !== SECRET) {
    console.log("CLIENT SECRET is invalid");
    console.log("accepted:", secret);
    console.log("expected:", SECRET);
    return res
      .status(401)
      .json({ success: false, message: "An error occurred" });
  }
  next();
};

export default auth;
