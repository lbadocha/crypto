import React, { Component } from 'react';

import axios from 'axios';

import './Crypto.css';
import CryptoList from './CryptoList';

class Crypto extends Component {

    constructor() {
        super();

        this.state = {
            crypo: [],
            filteredCrypto: [],
            filterInputValue: ''
        }
    }

    getData = () => {
        axios.get(`https://blockchain.info/pl/ticker`)
            .then(res => {
                             
                let currentCryptoData = res.data;
                let prevCryptoData = this.state.crypo;
                let cryptoArray = [];
                let prevArrayIndex = 0;

    
                for(const property in currentCryptoData) {
                    let cryptoObj = {}
                    cryptoObj.lastRate = currentCryptoData[property].last;
                    cryptoObj.symbol = currentCryptoData[property].symbol;
                    cryptoObj.currency = property;
                    
                    if(prevCryptoData[prevArrayIndex] !== undefined) {
                        if(currentCryptoData[property].last>prevCryptoData[prevArrayIndex].lastRate) {
                            cryptoObj.classValue = 'green';
                            cryptoObj.arrow = String.fromCharCode(8593);
                        
                        } else if(currentCryptoData[property].last<prevCryptoData[prevArrayIndex].lastRate) {
                            cryptoObj.classValue = 'red';
                            cryptoObj.arrow = String.fromCharCode(8595);
                          
                        } else {
                            cryptoObj.arrow = String.fromCharCode(8596);
                            cryptoObj.classValue = 'blue';
                         
                        }
                    } else {
                        cryptoObj.arrow = String.fromCharCode(8596);
                        cryptoObj.classValue = 'blue';
                    }
                    
                    ++prevArrayIndex;

                    cryptoArray.push(cryptoObj);
                }


                this.setState({crypo: cryptoArray, filteredCrypto: cryptoArray},()=>{
                    this.filterCrypto();
                })
                
            });
    }


    

    filterCrypto = () => {
        let filteredArray = this.state.crypo.filter(cryptoObj=>{
            return  cryptoObj.currency.includes(this.state.filterInputValue);
        });
        this.setState({filteredCrypto: filteredArray})
    }

    setFilteValue = e => {
  
        this.setState({filterInputValue: e.target.value.toUpperCase()}, ()=>{
            this.filterCrypto();
        });
        
    }

    componentDidMount() {
        this.getData();
        this.interval = setInterval(()=>this.getData(), 5000)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div className="crypo">
                <input type="text" placeholder="Filter" ref={input => this.refInput = input} value={this.state.filterInputValue} onChange={this.setFilteValue} />
                <CryptoList cryptoData={this.state.filteredCrypto} />
            </div>
        )
    }
}

export default Crypto;