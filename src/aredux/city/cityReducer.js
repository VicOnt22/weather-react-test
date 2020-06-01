import {REFINE_CITY, SAVE_CITY} from "./cityTypes";

// reducer is a function which is given a state and an action.
const initialState = {
    iniRefinedRestaurants: [],
    iniSavedCity: []
}

// for the state we provide default initial value. type and payload are the properties of our action
export const cityReducer = (state= initialState, action) => {
    switch(action.type){
        case REFINE_CITY:
        const refine = action.payload
            let filteredRestaurants = state.iniSavedCity.filter(
                (restaurant) => {
                    let foundRestaurants = (restaurant.name.toLowerCase().indexOf(refine.toLowerCase()) !== -1)
                        || (restaurant.address.toLowerCase().indexOf(refine.toLowerCase()) !== -1)
                        || (restaurant.area.toLowerCase().indexOf(refine.toLowerCase()) !== -1)
                    return foundRestaurants
                }
            )
            let commonRestaurants = refine ? filteredRestaurants : state.iniSavedCity
            return {
            ...state,
            iniRefinedRestaurants: commonRestaurants

        }
        case SAVE_CITY: return{
            ...state,
            iniSavedCity: action.payload
        }
        default:

            return state
    }
}

