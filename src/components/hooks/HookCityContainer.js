import {shallowEqual, useSelector} from "react-redux";
import React from "react";

export const HookCityContainer = (props) => {

    const {inp} = props
    restaurants = useSelector((state) => state.city.iniSavedCity)
    restaurants2 = useSelector((state) => state.city.iniRefinedRestaurants)
    var restaurants
    var restaurants2
    if (inp !== "" || inp !== '' || (typeof(inp) !== undefined)) {

        return (
            <div className='Gallery' aria-label="Restaurants Information">
                {restaurants.map(restaurant => <div className='card' key={restaurant.id}>
                    <ul className='place' aria-label="Next Restaurant">
                        <li className='place-subtitle'>Name: {restaurant.name} </li>
                        <li>Address: {restaurant.address}</li>
                        <li>Price: {restaurant.price}</li>
                        <li>Area: {restaurant.area}</li>
                    </ul>
                </div>)
                }
            </div>
        )
    }else{

        return(
            <div className='Gallery' aria-label="Restaurants Information">
                {restaurants2.map(restaurant => <div  className='card' key={restaurant.id}>
                    <ul className='place' aria-label="Next Restaurant">
                        <li className='place-subtitle'>Name: {restaurant.name} </li>
                        <li>Address: {restaurant.address}</li>
                        <li>Price: {restaurant.price}</li>
                        <li>Area: {restaurant.area}</li>
                    </ul>
                </div>)
                }
            </div>
        )
    }
}