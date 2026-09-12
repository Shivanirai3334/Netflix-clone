import React , { useEffect, useRef, useState }from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import{Link} from 'react-router-dom'


const TitleCards = ({title, category}) => {

  const[apiData, setApiData] = useState([]);

  const cardsRef = useRef();
  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZTE4MTkyMGNjMjc1ZDcxNTU1MDNmYzgyZjVjMWY2OCIsIm5iZiI6MTc4OTE5NzA0Ny4wNjMsInN1YiI6IjZhYTRmYWY3NjdjYjdmNWIyZTQ1NjE4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JZklqzXjIvgK_kbeV_4Fehtr4JjkNahKNW9thYLMAcY'
  }
};


const handleWheel = (event)=>{
event.preventDefault();
cardsRef.current.scrollLeft += event.deltaY;
}

useEffect(()=>{
  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));
 cardsRef.current.addEventListener('wheel', handleWheel);
}, [category]);
  return (
    <div className='title-cards'>
      <h2>{title?title:'Popular on Netflix'}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index)=>{
return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500${card.poster_path}`} alt={card.title} />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards


