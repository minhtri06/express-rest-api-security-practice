const userService = require("./user-services")
const { BlacklistUser } = require("../models")
const createError = require("http-errors")

/**
 * Check if user is in blacklist
 * @param {number} userId
 * @returns {Promise<boolean>}
 */
const checkUserIsInBlacklist = async (userId) => {
    const blacklistUser = await BlacklistUser.findOne({ where: { userId } })
    return blacklistUser != null
}

const getBlacklistByUserId = async (userId) => {
    return BlacklistUser.findOne({ where: { userId } })
}

/**
 * Add a user to blacklist
 * @param {number} userId
 * @returns {Promise<InstanceType<BlacklistUser>>}
 */
const addUserToBlackList = async (userId) => {
    let [blacklistUser, isCreated] = await BlacklistUser.findOrCreate({
        where: { userId },
        defaults: { userId },
    })
    return blacklistUser
}

/**
 * Remove user from blacklist
 * @param {number} userId
 */
const removeUserFromBlacklist = async (userId) => {
    const blacklistUser = await BlacklistUser.findOne({ where: { userId } })
    if (blacklistUser) {
        await blacklistUser.destroy()
    }
}

const blacklistUserService = {
    checkUserIsInBlacklist,
    addUserToBlackList,
    removeUserFromBlacklist,
}
module.exports = blacklistUserService
