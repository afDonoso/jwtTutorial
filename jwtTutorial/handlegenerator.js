const CryptoJS = require("crypto-js");

let jwt = require('jsonwebtoken');
let config = require('./config');
const Mongolib = require('./db/Mongolib')

// Clase encargada de la creación del token
class HandlerGenerator {

    login(req, res) {

        // Extrae el usuario y la contraseña especificados en el cuerpo de la solicitud
        let username = req.body.username;
        let password = req.body.password;

        // Si se especifico un usuario y contraseña, proceda con la validación
        // de lo contrario, un mensaje de error es retornado
        if (username && password) {
            Mongolib.getDatabase(db => {
                Mongolib.getUser(username, db, doc => {

                    if (!doc) {
                        res.status(404).send('User doesnt exists')
                    } else {

                        // Si los usuarios y las contraseñas coinciden, proceda con la generación del token
                        // de lo contrario, un mensaje de error es retornado
                        var decipher = CryptoJS.AES.decrypt(doc.password, config.secret);
                        let decryptedPassword = decipher.toString(CryptoJS.enc.Utf8);

                        console.log("Contraseñas: " + password + "\n" + decryptedPassword)

                        if (password === decryptedPassword) {

                            // Se genera un nuevo token para el nombre de usuario el cuál expira en 24 horas
                            let token = jwt.sign({ username: username },
                                config.secret, { expiresIn: '24h' });

                            // Retorna el token el cuál debe ser usado durante las siguientes solicitudes
                            res.json({
                                success: true,
                                message: 'Authentication successful!',
                                token: token
                            });

                        } else {

                            // El error 403 corresponde a Forbidden (Prohibido) de acuerdo al estándar HTTP
                            res.status(403).json({
                                success: false,
                                message: 'Incorrect username or password'
                            });

                        }
                    }
                })
            })

        } else {

            // El error 400 corresponde a Bad Request de acuerdo al estándar HTTP
            res.status(400).json({
                success: false,
                error: 'Authentication failed! Please check the request'
            });

        }

    }

    index(req, res) {

        // Retorna una respuesta exitosa con previa validación del token
        res.json({
            success: true,
            message: 'Index page'
        });

    }
}

module.exports = HandlerGenerator;