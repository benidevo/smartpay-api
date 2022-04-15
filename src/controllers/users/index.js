const createUser = require("./createUser");
const authenticateUser = require("./authenticateUser");

module.exports = {
    create: createUser,
    login: authenticateUser,
};
