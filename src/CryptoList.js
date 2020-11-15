import React from 'react';


const CryptoList = props => {

    let cryptoItems = props.cryptoData.map(cryptoObj=>{
        return <li className="crypto-item" key={cryptoObj.currency}>Last rate: <span className={cryptoObj.classValue}>{cryptoObj.lastRate} {cryptoObj.arrow}</span> {cryptoObj.currency} {cryptoObj.symbol}</li>
    });

    return (
        <ul className="crypto-list">
            {cryptoItems}
        </ul>
    )
}

export default CryptoList;