
// define our store Actions here. We make Action type a constant by declaring string as const.
// Also group declarations and use import from a file .cakeTypes. const buyCake is ActionCreator, returning an object
// here parameter have default value of 1 so existing functionality will not break - in cakeContainer we dont have 'number' of cakes to buy as parameter
import {REFINE_CITY, SAVE_CITY} from "./cityTypes";

export const refineCity = (refineInput) => {
       return {
        type: REFINE_CITY,
        payload: refineInput
    }
}

export const saveCity = (post) => {
    return {
        type: SAVE_CITY,
        payload: post
    }
}