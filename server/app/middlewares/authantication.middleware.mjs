import jwt from 'jsonwebtoken';
import { UsersModal } from '../modals/index.modals.mjs';

const jwtSecret = process.env.JWT_SECRET;

const UserAuthantication = (req, res, next) => {
  const { token = '' } = req.headers;
  if (token) {
    jwt.verify(token, jwtSecret, function (err, decoded) {
      if (err) {
        res.json({
          error: 'invalid token',
          status: 201,
        });
      } else {
        const { id = '', email = '' } = decoded;
        if (id && email) {
          UsersModal.findOne({
            _id: id,
            email,
          })
            .then((responce) => {
              if (responce) {
                next();
              }
            })
            .catch((error) => {
              req.json({
                error: error.message,
                status: 201,
              });
            });
        } else {
          res.json({
            message: 'invalid data in tokesn',
            status: 201,
          });
        }
      }
    });
  } else {
    res.json({
      message: 'token required',
      status: 201,
    });
  }
};
export default UserAuthantication;
