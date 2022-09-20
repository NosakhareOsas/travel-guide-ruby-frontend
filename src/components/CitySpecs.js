import { useParams } from "react-router-dom";
import React, {useEffect, useState} from 'react'
import {nanoid} from 'nanoid'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image'
import {truncate} from "./CityCard";
import CreateReview from "./CreateReview"


function CitySpecs (){
    const params = useParams();
    const id = params.id
    const noReview = <div>No reviews for this city at the moment</div>
    
    const [city, setCity] = useState({})
    const [reviews, setReviews] = useState([])
    useEffect(()=>{
        fetch(`https://radiant-oasis-70177.herokuapp.com/cities/${id}`)
        .then(r => r.json())
        .then(data => {
            setCity(data)
            setReviews(data.reviews)
        })
      },[])
    
    const imgStyle = {
        boxShadow: '1px 2px 9px #282c34',
        margin: '2em',
        padding: '1em',
      };
    const divStyle = {
        boxShadow: '1px 2px 4px #282c34',
        margin: '2em',
        padding: '1em'
    };

    const displayReviews = reviews.map(review=>   
        <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
            key={nanoid(5)}
        >
            <div className="ms-2 me-auto">
                <div className="fw-bold">{review.user.name}</div>
                <div>{review.comment}</div>
                <br/>
                <div className="fw-bold">Star Ratings (out of 5)</div>
                <br/>
                <Row>
                    <Col><h6>Traffic:</h6> {"⭐".repeat(review.traffic)}</Col>
                    <Col><h6>Night life:</h6> {"⭐".repeat(review.night_life)}</Col>
                    <Col><h6>Foreigner friendly:</h6> {"⭐".repeat(review.friendly_to_foreigner)}</Col>
                </Row>
                <Row>
                    <Col><h6>Places to work from:</h6> {"⭐".repeat(review.places_to_work_from)}</Col>
                    <Col><h6>Quality of internet:</h6> {"⭐".repeat(review.quality_of_internet)}</Col>
                    <Col><h6>Quality of healthcare:</h6> {"⭐".repeat(review.quality_of_healthcare)}</Col>
                </Row>
            </div>
            
            <Row>
                <Badge pill>
                    <small>{truncate(review.updated_at, 10)}</small>
                </Badge>
                <button style={{margin: '10px', background: 'none', border: 'none'}} onClick={handleDelete} id={review.id}>
                    🗑
                </button>
            </Row>            
        </ListGroup.Item>
        )

    function handleNewReview(data){
        setReviews([...reviews, data])
    }

    function handleDelete(e){
        const id = e.target.id
        fetch(`https://radiant-oasis-70177.herokuapp.com/reviews/${id}`, {
            method: "DELETE",
        })
        const updatedReviews = reviews.filter((review) => review.id.toString() !== id)
        setReviews(updatedReviews)
    }
    
    return(
        <Container >
            <Row >
                <Col>
                    <Image src={city.image} alt={city.name}  width='450' rounded="true" fluid="true" style={imgStyle}/>
                    <h1 style={{fontWeight: 700}}>{city.name}</h1>
                    <Row>
                        <Col><h4>Minimum Wage</h4><p>${city.minimum_wage}</p></Col>
                        <Col><h4>Country</h4><p>{city.country}</p></Col>
                    </Row>
                    <Row>
                        <Col><h4>Currency</h4><p>{city.currency}</p></Col>
                        <Col><h4>Employment Rate</h4><p>{city.employment_rate}%</p></Col>
                    </Row>
                    <Row><h4>Crime Rate</h4><p>{city.crime_rate}%</p></Row> 
                </Col>
                <Col style={divStyle}>
                    <h1 style={{fontWeight: 700}}>Reviews</h1>
                    <Row style ={{margin:"20px"}}>
                        <Col>
                            <ListGroup as="ol" numbered>{reviews.length !== 0 ? displayReviews : noReview}</ListGroup>
                        </Col>  
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col style ={{marginBottom:"10px"}}>
                    <CreateReview city={city} getReview={handleNewReview}/>
                </Col>
            </Row>
            
        </Container>
    );
}

export default CitySpecs;