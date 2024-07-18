import React, { useEffect, useState,useContext,useRef } from 'react'
import axios from 'axios';
import { DataContext } from '../../../components/Context'
import Card from '../../../components/Card/Card';
import View from '../../../components/View/View';
const Favorites = () => {
  const [faved, setFaved] = useState([]);
  const [selectedCard, setSelectedCard] = useState(0);
  const viewRef = useRef(null);

  const token = useContext(DataContext).loginState.token;
  useEffect(()=>{
  axios( "https://app.having.market/api/fav", {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(e => {
    console.log("fav: ",e);
    setFaved(e);
  });
  },[]);
  function handelCardSelection(cardData){
    setSelectedCard(cardData.id)
    viewRef.current = cardData;
  }
  return (
    <div className='fav' style={{display:"flex"}}>
    <div className='grid-container'>
      {faved.data? faved.data[0].map((e, index)=> {
            return <Card data={e} key={index} onSelect={handelCardSelection} selectedIndex={selectedCard} faved={true} loved={true}/>;
      }): <p>null data</p>}
    </div>
      {faved.data? <View ref={viewRef}/>: null}
    </div>
  )
}

export default Favorites