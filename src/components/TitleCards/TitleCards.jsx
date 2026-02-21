import React, { useState, useRef, useEffect } from 'react'
import './TitleCards.css'
import { Link } from 'react-router-dom'

const TitleCards = ({ title, category = "now_playing" }) => {
  const [apiData, setApiData] = useState([])
  const cardsRef = useRef(null)

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWIxN2MyODVmMzViYjFlYmU2MmJhODFiY2FiNzgzNCIsIm5iZiI6MTc3MTY3NjY0MS4yNTgsInN1YiI6IjY5OTlhM2UxZWFkMTZjNTQ5MzM3M2E4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.damxzWysuc3iB4P5yoc5jrhVw0G57DdhQ8Rz92N_2mo'
    }
  }

  const handleWheel = (e) => {
    if (!cardsRef.current) return
    e.preventDefault()
    cardsRef.current.scrollLeft += e.deltaY
  }

  useEffect(() => {
    const container = cardsRef.current

    const fetchMovies = async () => {
      try {
        console.log("Fetching:", category) // DEBUG

        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`,
          options
        )

        const data = await res.json()
        console.log(data)

        setApiData(data.results || [])
      } catch (err) {
        console.error(err)
      }
    }

    fetchMovies()

    container?.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      container?.removeEventListener('wheel', handleWheel)
    }
  }, [category])

  return (
    <div className='title-cards'>
      <h2>{title}</h2>

      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => (
          <Link to={`/player/${card.id}`} key={card.id} className="card">
  <img
    src={
      card.backdrop_path
        ? `https://image.tmdb.org/t/p/w500${card.backdrop_path}`
        : "https://via.placeholder.com/500x281"
    }
    alt={card.title}
  />
  <p>{card.title}</p>
</Link>
        ))}
      </div>
    </div>
  )
}

export default TitleCards