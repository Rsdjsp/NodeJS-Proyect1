const Users = require("./users");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../database/credentials");
const bcrypt = require("bcrypt");

class Auth {
  constructor() {
    this.users = new Users();
  }

  async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  getToken(user) {
    const userId = user._id.toString();
    const data = {
      id:user.id,
      firstName: user.firstName,
      displayName: user.displayName,
      lastName: user.lastName,
      email: user.email,
      role: user.role ? user.role : 0,
    };
    const token = jwt.sign(data, jwt_secret, { expiresIn: "1d" });
    return { success: true, data, token, userId };
  }

  async login(email, password) {
    const user = await this.users.getByEmail(email);
    if (user) {
      const correctPassword = await bcrypt.compare(password, user.password);
      if (correctPassword) {
        return this.getToken(user);
      }
    }

    return { success: false, message: "Las credenciales no coinciden" };
  }

  async signup(userData) {
    if (await this.users.getByEmail(userData.email)) {
      return { succes: false, message: "Usuario ya registrado" };
    } else {
      userData.password = await this.hashPassword(userData.password);
      const user = await this.users.create(userData);
      return this.getToken(user);
    }
  }

  async loginProvider(profile) {
    let user = await this.users.getByEmail(profile.email);
    if (!user) {
      user = await this.users.create({
        firstName: profile.name?.givenName,
        lastName: profile.name?.familyName,
        email: profile.emails ? profile.emails[0].value : undefined,
        displayname:profile.displayname ? profile.displayname: undefined,
        role: 0,
        provider: profile.provider,
        idProvider: profile.id,
      });
    }
    return this.getToken(user);
  }
}

module.exports = Auth;
