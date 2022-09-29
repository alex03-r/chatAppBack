
const jwt = require('jsonwebtoken')

function generateToken(id, name) {

  return new Promise((resolve, reject) => {

    const payload = { id, name };

    jwt.sign(payload, process.env.SECRECT_KEY, { expiresIn: '2h' }, (error, token) => {

      if (error) {
        reject("no se pudo generar el token ")
      }
      resolve(token)

    })

  })

}

module.exports = generateToken;

