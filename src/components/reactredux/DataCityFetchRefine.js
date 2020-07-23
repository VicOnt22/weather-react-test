import React, {useState, useEffect} from 'react';
import axios from "axios";


export const DataCityFetchRefine = () => {

    const [forecast, setForecast] = useState([])
    const [id, setId] = useState('Toronto')
    const [idFromButtonClick, setIdFromButtonClick] = useState('Toronto')
    const [err, setErrMsg] = useState(false)
    const [currCity, setCurrentCity] = useState('')
    const [postError, setPostError] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState({});

    // For the empty city submission set default City to Toronto
    const handleClick = (e) =>{ e.preventDefault();
        // id ? setId(id) : setId('Toronto')
        id ? setIdFromButtonClick(id) : setIdFromButtonClick('Toronto')
    }

    const handleChange = (e) =>{

        id ? setCurrentCity(id) : setCurrentCity(id)
        id ? setIdFromButtonClick(id) : setIdFromButtonClick('Toronto')
        handleClick(e)
        e.preventDefault();
    }

    useEffect(() => {
        let weatherbitUrl = process.env.REACT_APP_WEATHERBIT_URL
        let weatherbitKey = process.env.REACT_APP_WEATHERBIT_KEY

        if (idFromButtonClick) {

                weatherbitUrl = `${weatherbitUrl}=${idFromButtonClick},CA&days=5&key=${weatherbitKey}`

            axios.get(weatherbitUrl)
                .then(result => {
                    let resultarray = result.data.data;
                    console.log('ResultArray ', resultarray)
                    setForecast(resultarray);
                    setIsLoading(false);
                })
                .catch(err => {
                    setErrMsg(true)
                    console.log('State err', err)
                    setError(err)
                })


        }
    // }, [idFromButtonClick, err, id, idFromButtonClick, currCity, selectedOption])
    }, [err, id, idFromButtonClick])


    const cityError = () => {
        if (postError.message === "Cannot read property 'city' of undefined") {
            return (<span aria-label="City Error"> No such City or its restaurants are not in our database, Sorry! </span>)
        } else {
            return (<span aria-label="Error or Page Not Found">{postError.message}</span>)
        }
    }

    const renderCityError = () => { return(<p> {err ? err ? cityError() : '': ''} </p> ) }

    // const renderInputCityForm = () => {
    //     return (
    //         <form onSubmit={handleClick}>
    //             <input type="text" placeholder = "City (default: Toronto)" value={id} onChange={e => setId(e.target.value.substr(0, 30)) }/>
    //             <button type="submit" >Search {id}</button>
    //         </form>
    //     )
    // }


    const renderSelectCityForm = () => {
        return (

            <form>
            {/* <form onClick={handleChange}> */}
            {/* <form onClick={handleClick}> */}
                <select className='select-city' value={id} onChange={e =>  setId(e.target.value.substr(0, 15))}>
                    <option name="Toronto">Toronto</option>
                    <option name="Montreal">Montreal</option>
                    <option name="Vancouver">Vancouver</option>
                    <option name="Montreal">Edmonton</option>
                    <option name="Whitehorse">Whitehorse</option>
                </select>
            </form>
        )
    }

    // const options = () => {
    //  return (
    //      [
    //         {value: 'Toronto', label: 'Toronto'},
    //         {value: 'Montreal', label: 'Montreal'},
    //         {value: 'Vancouver', label: 'Vancouver'}
    //     ]
    //  )
    // }



    const renderApplyButton = () => {
        return (
            <form className='button-apply' onSubmit={handleClick}>
                <button className='button-bottom-apply' type="submit" >Apply</button>
            </form>
        )
    }

    const renderForecast = () => {

        return(
            <div className='Gallery' aria-label="Weather Forecast">
                {forecast.map(dayWeather => <div  className='card' key={dayWeather.moonrise_ts}>
                    <div className='place' aria-label="Next Day">
                        <div className='weather-date'>{getDayName(dayWeather.datetime)}</div>
                        <div className='weather-date'>{getDateMonth(dayWeather.datetime)}</div>
                        <div className='weather-img'>
                            <img src={process.env.PUBLIC_URL + '/assets/icons/' + dayWeather.weather.icon +'.png'} alt={dayWeather.weather.description} />
                        </div>
                        <div className='place-subtitle'>{Math.round(dayWeather.temp)}&#176;C </div>
                    </div>
                </div>)
                }

            </div>
        )
    }

    function getDayName(date) {
        return new Date(date).toLocaleString('en', { weekday: 'long' });
    }
    function getDateMonth(date) {
        return (new Date(date).toLocaleString('en', { month: 'short' })  + ' ' + new Date(date).toLocaleString('en', { day: 'numeric' }));
    }

    return (
        <div className='card-wrapper'>
           <h4><label>Canadian City Weather</label></h4>

            {renderSelectCityForm()}
            {renderCityError()}
            {renderForecast()}
            {renderApplyButton()}
        </div>
    )


}




