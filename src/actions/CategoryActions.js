/**
 * Created by emrahsoytekin on 14.06.2018.
 */
import alt from '../alt'

class CategoryActions {
    fetchCategories() {
        return;
    }

    updateCategories(categories) {
        return categories;
    }

    fetchFailAction(errorMessage){
        return errorMessage;
    }

    updateFailAction(errorMessage) {
        return errorMessage;
    }

    updateSuccessAction(category){
        return category
    }
    deleteSuccessAction(category) {
        return category;
    }
    addSuccessAction(category) {
        return category;
    }
    setCategory(category) {
        return category;
    }
}

export default alt.createActions(CategoryActions);

