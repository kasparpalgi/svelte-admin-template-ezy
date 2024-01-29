import bcrypt from 'bcrypt';

/** @param {string} password */
export async function hashPassword(password) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}

/** @param {string | null} password */
export function passwordStrngthChecker(password) {
    if (password === null || password.length < 6) {
        return false;
    }

    const hasCapitalLetter = /[A-Z]/.test(password);
    const hasLowercaseLetter = /[a-z]/.test(password);

    return hasCapitalLetter && hasLowercaseLetter;
}