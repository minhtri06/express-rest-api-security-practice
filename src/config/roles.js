let roleInfo = {
    user: [],
    admin: ["getUsers", "manageUsers"],
}

const roles = Object.keys(roleInfo)
const roleRights = new Map(Object.entries(roleInfo))

const roleConfig = {
    roles,
    roleRights,
}

module.exports = roleConfig
