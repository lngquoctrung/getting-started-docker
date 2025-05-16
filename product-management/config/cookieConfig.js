module.exports = {
    maxAge: 1000 * 60 * 10,   // 10 minutes
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
}