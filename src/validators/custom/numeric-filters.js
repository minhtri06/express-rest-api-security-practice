const { Op } = require("sequelize")

/**
 *
 * @param {[]} fields
 * @returns {object}
 */
const numericFilters = (fields) => (numericFilters, helpers) => {
    const filterObj = {}
    const operatorMap = {
        "<": Op.lt,
        ">": Op.gt,
        "<=": Op.lte,
        ">=": Op.gte,
        "=": Op.eq,
    }
    for (let comparisonStr of numericFilters.split(",")) {
        const comparisonArr = comparisonStr
            .replace(/\b(<|>|<=|>=|=)\b/, (match) => `-${match}-`)
            .split("-")
        if (comparisonArr.length !== 3) {
            return helpers.message("Invalid numericFilters format")
        }
        const [field, operator, value] = comparisonArr
        if (fields.includes(field)) {
            if (isNaN(value)) {
                return helpers.message("value in numericFilters must be numeric")
            }
            filterObj[field] = { [operatorMap[operator]]: Number(value) }
        } else {
            return helpers.message(`field '${field}' is not allowed in numericFilters`)
        }
    }
    return filterObj
}

module.exports = numericFilters
