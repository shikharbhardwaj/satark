const bcrypt = require('bcryptjs');

/**
 * Compare password equality.
 *
 * @param {string} userPassword - The password supplied.
 * @param {string} databasePassword - The stored password.
 * @return {bool} - The comparision.
 */
function comparePass(userPassword, databasePassword) {
    return bcrypt.compareSync(userPassword, databasePassword);
}

module.exports = {
    comparePass,
};
