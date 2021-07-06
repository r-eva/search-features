import React, { useState, useEffect } from 'react'
import {urlApi} from '../helpers/database'
import axios from 'axios'
import './Landing.css'
import History from './History'

const Landing = () => {
    const [data, setData] = useState('')
    const [loading, setLoading] = useState(true)
    const [inputUser, setInputUser] = useState({})

    // GET DATA WITH AXIOS ///

    const fetchData = async () => {
        return await axios.get(`${urlApi}/activities/getalltour`)
    };

    useEffect(() => {
        fetchData()
        .then((res)=> {
            setData(res.data);
            setLoading(false);
        })
        .catch((err)=> {
            console.log(err);
            setData('');
            setLoading(false);
        })
      }, []);

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

    const onSubmit = (e) => {
        e.preventDefault()
        let queryString = Object.keys(inputUser).map(key => key + '=' + inputUser[key]).join('&')
        axios.get(`${urlApi}/activities/search`, {params: inputUser})
        .then((res) => {
            setInputUser({})
            History.push({
                pathname: '/search',
                search: '?q=' + queryString,
                searchResult: res.data
            })
        }).catch(err => {
            setInputUser({})
            console.log(err)
        })
    }

    if (data === ""  || loading === true) {
        return <h1>Loading...</h1>
    }
    if (loading === "Database Error") {
        return <h1>Database Error</h1>
    }
    return (
        <div>
            <h1 style={{textAlign: 'center'}}>Welcome to Our Tour</h1>
            <section className="container">
                <form>
                <input type="text" placeholder="Search for tour..." name="search" onChange={(e) => setInputUser({...inputUser, title: e.target.value})}/>
                <input type="number" placeholder="Maximum price.." name="search" onChange={(e) => setInputUser({...inputUser, price: e.target.value})}/>
                <input type="number" placeholder="Minimum rating.." name="search" onChange={(e) => setInputUser({...inputUser, rating: e.target.value})}/>
                <input type='checkbox' id="isSpecialOffer" name='isSpecialOffer' onChange={(e)=> setInputUser({...inputUser, [e.target.name]: e.target.checked})}/>
                <label htmlFor='isSpecialOffer'>Offer</label>
                <button type="submit" onClick={onSubmit}>SEARCH</button>
                </form>
            </section>
            <section className="container-content">
                {displayData(data)}
            </section>
        </div>
    );
};

export default Landing;


























// import React, { Component } from 'react';
// import {urlApi} from '../helpers/database'
// import axios from 'axios'
// import './Landing.css'

// class Landing extends Component {

//     state = {
//         data: [],
//         loading: true,
//         inputUser: {}
//     }

//     componentDidMount() {
//         axios.get(`${urlApi}/activities/getalltour`)
//         .then((res) => {
//             this.setState({data: res.data, loading: false})
//         }).catch(err => {
//             console.log(err)
//             this.setState({loading: "Database Error"})
//         })
//     }

//     displayData = () => {
//         const jsx = this.state.data.map((val) => {
//             return (
//                 <div className="tour-box" key={val.id}>
//                     <h2>{val.title}</h2>
//                     <p>Price: {val.price} {val.currency} <br/>
//                     {
//                         val.isSpecialOffer ? <span className="special-offer"> Special Offer</span> : <span> Normal Price</span>
//                     }
//                     <br/>
//                     Rating: {val.rating}
//                     </p>
//                 </div>
//             )
//         })
//         return jsx
//     }

//     onSubmit = (e) => {
//         axios.get(`${urlApi}/activities/search`, {params: this.state.inputUser})
//         .then((res) => {
//             this.setState({data: res.data})
//         }).catch(err => {
//             this.setState({inputUser: {}})
//             console.log(err)
//             alert('Database Error')
//         })
//         e.preventDefault()
//     }

//     render() {
//         if (this.state.data === []  || this.state.loading === true) {
//             return <h1>Loading...</h1>
//         }
//         if (this.state.loading === "Database Error") {
//             return <h1>{this.state.loading}</h1>
//         }
//         return (
//             <div>
//                 <h1>Welcome to GetYourGuide</h1>
//                 <section className="container">
//                     <form onSubmit={this.onSubmit}>
//                     <input type="text" placeholder="Search for tour..." name="search" onChange={(e) => this.setState({inputUser: {...this.state.inputUser, title: e.target.value}})}/>
//                     <input type="number" placeholder="Maximum price.." name="search" onChange={(e) => this.setState({inputUser: {...this.state.inputUser, price: e.target.value}})}/>
//                     <input type="number" placeholder="Minimum rating.." name="search" onChange={(e) => this.setState({inputUser: {...this.state.inputUser, rating: e.target.value}})}/>
//                     <button type="submit" onClick={this.onSubmit}>SEARCH</button>
//                     </form>
//                 </section>
//                 <section className="container-content">
//                     {this.displayData()}
//                 </section>
//             </div>
//         );
//     }
// }

// export default Landing;