const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt")
const { SECRET_KEY } = require("../config/env-config").jwt
const { ACCESS } = require("../utils").commonConstants
const createError = require("http-errors")
const { User } = require("../models")

const jwtOptions = {
    secretOrKey: SECRET_KEY,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("Authorization"),
}

const jwtVerify = async (payload, done) => {
    try {
        if (payload.type !== ACCESS) {
            throw createError.Unauthorized("Invalid token")
        }
        const user = await User.findByPk(payload.sub)
        if (!user) {
            return done(null, false)
        }
        return done(null, user)
    } catch (error) {
        done(error, false)
    }
}

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify)

module.exports = jwtStrategy
