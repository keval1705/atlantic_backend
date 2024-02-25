// **
//  * return string replaced by special character without divided by pipe
//  * @param {String} str string for search
//  */
const getRegexStringSearch = (str) => {

    if (typeof str == 'string') return str.replace(/[-!$%^&*()_+|~=`{}\[\]:";<>?,]/g, "\\$&");

    if (Array.isArray(str)) return str.map(e => e.replace(/[-!$%^&*()_+|~=`{}\[\]:";<>?,]/g, "\\$&"))
}

/**
 * Service for get {$and} query for search across field
 * @param {String} query.fields - fields separated by coma
 * @param {String} query.search - search string
 */
const getRegexSearchQuery = (exports.getRegexSearchQuery = (query) => {
    let data = {
        $and: [],
    };
    const orInCondition = [];

    const arrayFields = query.fields.split(",");

    arrayFields.map((item) => {
        query.search = getRegexStringSearch(query.search)
        if (typeof query.search == 'string') {
            orInCondition.push({
                [item]: {
                    $regex: new RegExp(
                        `(${query.search}).*$`,
                        "i"
                    ),
                },
            });
        } else if (Array.isArray(query.search)) {
            query.search.map(search => {
                orInCondition.push({
                    [item]: {
                        $regex: new RegExp(
                            `^.*(${getRegexStringSearch(search)}).*$`,
                            "i"
                        ),
                    },
                });
            })
        }
    });

    data.$and.push({$or: orInCondition});

    return data;
});