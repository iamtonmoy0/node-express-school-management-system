const { readdirSync } = require("fs");
const path = require("path");

const routeSync = (app, pathName) => {
  const routePath = path.join(__dirname, `../routes/v1/${pathName}`);

  readdirSync(routePath).map((fileName) => {
    const routeFilePath = path.join(routePath, fileName);
    app.use("/api/v1", require(routeFilePath));
  });
};
module.exports = routeSync;
