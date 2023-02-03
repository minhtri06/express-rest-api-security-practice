/**
 *
 * @param {[]} fields
 * @returns {Function}
 */
const sortBy = (fields) => (sortBy, helpers) => {
    const options = []
    for (let order of sortBy.split(",")) {
        let option = order[0] === "-" ? [order.slice(1), "DESC"] : [order]

        if (fields.includes(option[0])) {
            options.push(option)
        } else {
            return helpers.message(`Field '${option[0]}' is not allowed in 'sortBy'`)
        }
    }
    return options
}

module.exports = sortBy
