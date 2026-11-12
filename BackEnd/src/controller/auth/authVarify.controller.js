async function authVarifyController(req, res, next) {
  const user = req.jwt;

  if (user) {
    res.status(200).send({
      _id: user._id,
      name: user.name,
      role: user.role,
    });
  } else {
    res.status(403).send("please login");
  }
}

module.exports = authVarifyController;
