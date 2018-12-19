/**
 * Created by emrahsoytekin on 29.07.2018.
 */
import RestConstants from './RestConstants';
let CategoryRemote = {

    fetchCategories: (state) => {
        let url = RestConstants.categoryUrl;
        return RestConstants.jFetch(url).then(response => response.data);

    },
    add: (state, category) => {
        let url = RestConstants.categoryUrl;

        return RestConstants
            .jPost(url, {name: category})
            .then(response => response.data);
    },
    delete: (state, category) => {

        const url = `${RestConstants.categoryUrl}`;

        return RestConstants
            .jDelete(url, category)
            .then(response => category);
    },
    update: (state, category) => {

        const url = RestConstants.categoryUrl;

        return RestConstants.jPut(url, category)
            .then(response => category);
    }
};

export default CategoryRemote;
