import React, {useState, useEffect} from 'react';
import axios from "axios";


export const DataCityFetchRefine = () => {

    const itemsPerPagerPage = process.env.REACT_APP_ITEMS_PER_PAGER_PAGE

    const [post, setPost] = useState([])
    const [id, setId] = useState('')
    const [idFromButtonClick, setIdFromButtonClick] = useState('')
    const [err, setErrMsg] = useState(false)
    const [currPagerPage, setCurrPagerPage] = useState(1)
    const [totalEntries, setTotalEntries] = useState(0)
    const [currCity, setCurrentCity] = useState('')
    const [postError, setPostError] = useState({})
    const [refine, setRefine] = useState('')

    const [isLoading, setIsLoading] = useState(true);
    const [weather, setWeather] = useState({});
    const [error, setError] = useState({});
    const [city, setCity] = useState('Toronto');
    const [country, setCountry] = useState('CA');



    // For the empty city submission set default City to Toronto
    const handleClick = (e) =>{ e.preventDefault();
        id ? setIdFromButtonClick(id) : setIdFromButtonClick('Toronto')
    }
    const handleRefineClick = (event) =>{
        event.preventDefault();
    }

    useEffect(() => {
        let openTableUrl = process.env.REACT_APP_OPEN_TABLE_URL
        let weatherbitUrl = process.env.REACT_APP_WEATHERBIT_URL
        let weatherbitKey = process.env.REACT_APP_WEATHERBIT_KEY

        if (idFromButtonClick) {

            if (currCity !== idFromButtonClick) {

                openTableUrl = `${openTableUrl}/restaurants?city=${idFromButtonClick}&per_page=${itemsPerPagerPage}&page=1`
                console.log('Request1a ', openTableUrl)
                weatherbitUrl = `${weatherbitUrl}=${idFromButtonClick},CA&days=7&key=${weatherbitKey}`
                console.log('Request1 ', weatherbitUrl)
            }else {
                openTableUrl = `${openTableUrl}/restaurants?city=${idFromButtonClick}&per_page=${itemsPerPagerPage}&page=1`
                weatherbitUrl = `${weatherbitUrl}=${idFromButtonClick},CA&days=7&key=${weatherbitKey}`
                console.log('Request2 ', weatherbitUrl)
                console.log('Request2a ', openTableUrl)
            }

            axios.get(openTableUrl)
                .then(resp => {
                    let nextstring = refine;
                    setPost(resp.data.restaurants)
                    setTotalEntries(resp.data.total_entries)
                    setCurrentCity(resp.data.restaurants[0]['city'])
                })
                .catch(error => {
                    setErrMsg(true)
                    console.log('State err', err)
                    setPostError(error)
                })

            axios.get(weatherbitUrl)
                .then(result => {
                    // console.log('Result ', result.data)
                    let nextstring = refine;
                    // setPost(result.data)

                    result = result.data;
                    setWeather({
                        temperature: result.data[0].temp,
                        city: result.city_name,
                        country: result.country_code,
                        icon: result.data[0].weather.icon,
                        code: result.data[0].weather.code,
                        description: result.data[0].weather.description,
                        // forecastdays: result.data, //this is an array
                        valid_date: result.data[0].valid_date
                    });
                    console.log('weather ', weather)
                    setIsLoading(false);
                })
                .catch(error => {
                    setErrMsg(true)
                    console.log('State err', error)
                    setError(error)
                })


        }
    }, [idFromButtonClick, err, currCity])


    const cityError = () => {
        if (postError.message === "Cannot read property 'city' of undefined") {
            return (<span aria-label="City Error"> No such City or its restaurants are not in our database, Sorry! </span>)
        } else {
            return (<span aria-label="Error or Page Not Found">{postError.message}</span>)
        }
    }

    const renderCityError = () => { return(<p> {err ? err ? cityError() : '': ''} </p> ) }

    const renderInputCityForm = () => {
        return (
            <form onSubmit={handleClick}>
                <input type="text" placeholder = "City (default: Toronto)" value={id} onChange={e => setId(e.target.value.substr(0, 30)) }/>
                <button type="submit" >Search {id}</button>
            </form>
        )
    }



    const renderRestaurants =() =>{
        let filteredRestaurants = post.filter(
            (restaurant) => {
                let foundRestaurants = (restaurant.name.toLowerCase().indexOf(refine.toLowerCase()) !== -1)
                    || (restaurant.address.toLowerCase().indexOf(refine.toLowerCase()) !== -1)
                    || (restaurant.area.toLowerCase().indexOf(refine.toLowerCase()) !== -1)
                return foundRestaurants
            }
        )
        return(
            <div className='Gallery' aria-label="Restaurants Information">
                { filteredRestaurants.map(restaurant => <div  className='card' key={restaurant.id}>
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

    const renderInputRefineForm = () => {
        return (
            <React.Fragment>
            {
                <form onSubmit={handleRefineClick}>
                     <input type="text" placeholder = "Name, Address or Area" value={refine} onChange={event => {
                        setRefine(event.target.value.substr(0, 30))
                     }}/>
                     <button type="submit" > Refine </button>
                </form> }
            </React.Fragment>
        )
    }

    return (
        <div>
           <h4><label>City Weather</label></h4>
            {renderInputCityForm()}
            {renderInputRefineForm()}
            {renderCityError()}
            {renderRestaurants()}
        </div>
    )


}



