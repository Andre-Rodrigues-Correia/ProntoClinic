import bcrypt from 'bcrypt';

const SALT = 10;

async function encryptPassword(password) {
    const saltPassword = await bcrypt.genSalt(SALT);
    const encryptedPassord = await bcrypt.hash(password, saltPassword)

    return encryptedPassord;
}

export {encryptPassword}