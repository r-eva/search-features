import React, { useState, useEffect } from 'react'
import {useLocation, useHistory} from 'react-router'
import './Landing.css'

const Search = () => {
    const [searchData, setSearchData] = useState(false)
    const [loading, setLoading] = useState(true)

    const location = useLocation()
    const history = useHistory()

    useEffect(() => {
        let savedData = JSON.parse(localStorage.getItem('searchData'))
        if (location.searchResult === undefined) {
            console.log('masuk if')
            setSearchData(savedData)
            setLoading(false)
        } else {
            console.log('masuk else')
            localStorage.setItem('searchData', JSON.stringify(location.searchResult))
            setSearchData(location.searchResult)
            setLoading(false)
        }
    },[location.searchResult]);

    const displayData = (inputData) => {
        const jsx = inputData.map((val) => {
            return (
                <div className="tour-box" key={val.id}>
                    <h2>{val.title}</h2>
                    <p>Price: {val.price} {val.currency} <br/>
                    {
                        val.isSpecialOffer ? <span className="special-offer"> Special Offer</span> : <span> Normal Price</span>
                    }
                    <br/>
                    Rating: {val.rating}
                    </p>
                </div>
            )
        })
        return jsx
    }

    if (loading === true) {
        return (<h1>Loading...</h1>)
    }
    
    return (
        <div>
            <button type="button" onClick={() => history.push('/')}>All Tour</button>
            <h1>Your Search result</h1>
            <section className="container-content">
                {displayData(searchData)}
            </section>
        </div>
    );
};

export default Search;