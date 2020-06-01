import React, {useState, useEffect} from 'react';
import {useDispatch} from "react-redux";
import axios from "axios";
import {saveCity, refineCity} from "../../aredux";
import {HookCityContainer} from "../hooks/HookCityContainer";


export const DataCityFetchRefine = () => {

    const dispatch = useDispatch()
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
    const [refineValue, setRefineValue] = useState('')

    // For the empty city submission set default City to Toronto
    const handleClick = (e) =>{ e.preventDefault();
        id ? setIdFromButtonClick(id) : setIdFromButtonClick('Toronto')
    }
    const handleRefineClick = (event) =>{
               refine ? setRefineValue(refine) : setRefineValue('')
        event.preventDefault();
    }

    useEffect(() => {
        var openTableUrl = process.env.REACT_APP_OPEN_TABLE_URL
        if (idFromButtonClick) {
            if (currCity !== idFromButtonClick && totalEntries <= itemsPerPagerPage) {
                openTableUrl = `${openTableUrl}/restaurants?city=${idFromButtonClick}&per_page=${itemsPerPagerPage}&page=1`
            }else{
                openTableUrl = `${openTableUrl}/restaurants?city=${idFromButtonClick}&per_page=${itemsPerPagerPage}&page=${currPagerPage}`
            }
            axios.get(openTableUrl)
                .then(resp => {
                    let nextstring = refine;
                    setPost(resp.data.restaurants)
                    setCurrPagerPage(resp.data.current_page)
                    setTotalEntries(resp.data.total_entries)
                    setCurrentCity(resp.data.restaurants[0]['city'])
                    dispatch(saveCity(post))
                    dispatch(refineCity(nextstring))
                })
                .catch(error => {
                    setErrMsg(true)
                    // console.log('State err', err)
                    setPostError(error)
                })
        }
    }, [idFromButtonClick, err, currPagerPage, currCity])

    // pager calculations
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalEntries/itemsPerPagerPage); i++) {
        pageNumbers.push(i);
    }
    const handlePagerNextClick = (event) => { setCurrPagerPage(currPagerPage + 1)
        dispatch(refineCity(refine)) }
    const handlePagerPreviousClick = (event) => { setCurrPagerPage(currPagerPage > 1? currPagerPage - 1 : 1)
        dispatch(refineCity(refine)) }
    const handlePagerLastClick = (event) => { setCurrPagerPage(currPagerPage >= 1? pageNumbers.length : 1)
        dispatch(refineCity(refine)) }
    const handlePagerFirstClick = (event) => { setCurrPagerPage(currPagerPage > 1 ? 1 : 1)
        dispatch(refineCity(refine)) }

    const cityError = () => {
        if (postError.message === "Cannot read property 'city' of undefined") {
            return (<span aria-label="City Error"> No such City or its restaurants are not in our database, Sorry! </span>)
        } else {
            return (<span aria-label="Error or Page Not Found">{postError.message}</span>)
        }
    }

    const renderPagerFirst = () => { return (<span className='place-subtitle' aria-label="First page" onClick={handlePagerFirstClick}> 1st ... </span>)}
    const renderPagerNext = () => { return (<span className='place-subtitle' aria-label="Next" onClick={handlePagerNextClick}>  »Next  </span>)}
    const renderPagerPrevious = () => { return (<span className='place-subtitle' aria-label="Previous" onClick={handlePagerPreviousClick}> Prev«  </span>)}
    const renderPagerLast = () => { return (<span className='place-subtitle' aria-label="Last page" onClick={handlePagerLastClick}> ... Last {pageNumbers.length} </span>)}
    const renderCurrentPageNumber = () => { return (<span className='current-pager-page' aria-label="Current page"> &nbsp; Page {currPagerPage} &nbsp; </span>)}
    const renderCityError = () => { return(<p> {pageNumbers.length < 1 ? err ? cityError() : '': ''} </p> ) }

    const renderPagerParagraph = () => {
        return(
            <p aria-label="Restaurants Pagination">
                {currPagerPage > 1 ? renderPagerFirst() : ''}
                {currPagerPage > 1 ? renderPagerPrevious() : ''}
                {pageNumbers.length > 1 ? renderCurrentPageNumber(): ''}
                {currPagerPage < pageNumbers.length ? renderPagerNext() : ''}
                {currPagerPage < pageNumbers.length ? renderPagerLast(): ''}
            </p>
        )
    }

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
            {pageNumbers.length >= 1 ? (
                <form onSubmit={handleRefineClick}>
                     <input type="text" placeholder = "Name, Address or Area" value={refine} onChange={event => {
                        setRefine(event.target.value.substr(0, 30))
                        dispatch(refineCity(event.target.value.substr(0, 30)))}}/>
                     <button type="submit" > Refine </button>
                </form>) : '' }
            </React.Fragment>
        )
    }

    return (
        <div>
           <h4><label>Search City Restaurants</label></h4>
            {renderInputCityForm()}
            {renderInputRefineForm()}
            {renderCityError()}
            {renderPagerParagraph()}
            {renderRestaurants()}
            {renderPagerParagraph()}
        </div>
    )


}



