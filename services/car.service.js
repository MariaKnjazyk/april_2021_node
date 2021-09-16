const Car = require('../dataBase/Car');

module.exports = {
    getAll: async (query = {}) => {
        const {
            order = 'asc',
            page = 1,
            perPage = 10,
            sortBy = 'createdAt',
            ...filters
        } = query;

        const orderBy = order === 'asc' ? -1 : 1;
        const filterObject = {};
        const year_filter = {};

        Object.keys(filters).forEach((filterParam) => {
            switch (filterParam) {
                case 'year_from': {
                    Object.assign(year_filter, { $gte: +filters[filterParam] });
                    break;
                }
                case 'year_to': {
                    Object.assign(year_filter, { $lte: +filters[filterParam] });
                    break;
                }
                case 'model': {
                    filterObject[filterParam] = { $regex: `^${filters[filterParam]}`, $options: 'gi' };
                    break;
                }
                default: {
                    filterObject[filterParam] = filters[filterParam];
                }
            }
        });

        if (Object.keys(year_filter).length) {
            filterObject.year = year_filter;
        }

        const cars = await Car
            .find(filterObject)
            .sort({ [sortBy]: orderBy })
            .limit(+perPage)
            .skip((page - 1) * perPage);

        const count = await Car.countDocuments((filterObject));

        return {
            data: cars,
            page,
            limit: +perPage,
            count,
            pageCount: Math.ceil(count / perPage)
        };
    }
};
