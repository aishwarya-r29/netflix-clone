import React from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const Player = () => {

  const {id} = useParams();

  const navigate = useNavigate();

  const [apiData,setApiData] = useState({
    name:"",
    key: "",
    published_at: "",
    typeof: ""
  });
  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWIxN2MyODVmMzViYjFlYmU2MmJhODFiY2FiNzgzNCIsIm5iZiI6MTc3MTY3NjY0MS4yNTgsInN1YiI6IjY5OTlhM2UxZWFkMTZjNTQ5MzM3M2E4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.damxzWysuc3iB4P5yoc5jrhVw0G57DdhQ8Rz92N_2mo'
  }
};

useEffect(()=>{

  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results[0]))
  .catch(err => console.error(err));

},[])



  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={()=>{navigate('/')}}/>
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer' frameBorder='0' allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at?.split('T')[0]}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player