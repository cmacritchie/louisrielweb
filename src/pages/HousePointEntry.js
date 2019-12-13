import React, { useState, useContext, useEffect } from "react";
import RecordEntry from "../components/RecordEntry"
import { Context as HouseContext } from '../contexts/HousePointsContext'
import { Link } from 'react-router-dom'
import axios from 'axios';
import requireAuth from '../components/requireAuth'

const HousePointWrapper = ({ match, location: { pathname } } )=>{

  const { params: { id, entryid } } = match

  const {state:{ entries}, fetchUserPoints } = useContext(HouseContext)


  const [isLoaded, setLoaded] = useState(false)
  const [isEdit, setEdit] = useState(false)
  const [initialPoints, setInitialPoints] = useState()

  useEffect(() => {
    
    if(id && !entries[id]) {
      fetchUserPoints(id)
    }

    if(entryid){
        const getExistingPoints = async (id) => {
        const response = await axios.get(`/api/house/${id}`)
        setInitialPoints(response.data)
        setEdit(true)
        setLoaded(true)
      }
      getExistingPoints(entryid)
     
    } else {
      setLoaded(true)
    }
  }, [pathname])

  if(!isLoaded) {
    return <p>...loading</p>
  } else if(isLoaded && isEdit ) {
    return <HousePoints initialPoints={initialPoints} edit={true} userId={id} id={entryid} />
  } else if(isLoaded && !isEdit) {
    return <HousePoints userId={id} />
  }

  return <p>error</p>
}

const  HousePoints = ({ initialPoints, edit, id, userId }) => {
    const { submitPoints, editPoints } = useContext(HouseContext)

    const [wolfPoints, setWolfPoints] = useState(initialPoints.wolf)
    const [bearPoints, setBearPoints] = useState(initialPoints.bear)
    const [eaglePoints, setEaglePoints] = useState(initialPoints.eagle)
    const [turtlePoints, setTurtlePoints] = useState(initialPoints.turtle)

    const handleSubmit = (e) => {
        e.preventDefault();
        const housePoints = { wolf: wolfPoints,
                              bear: bearPoints,
                              eagle: eaglePoints,
                              turtle: turtlePoints 
                            }
        if(edit){
          editPoints(id, housePoints)
        } else {
          submitPoints(housePoints)
        }

    }

  return (
    <div>
      <br />
      <Link to={`/user/${userId}`}>
        <button className="btn blue accent-4">back</button>
      </Link>   
    <h4>House Entry</h4>
      <table>
        <tbody>
          <RecordEntry onEntryChange={(points)=>setBearPoints(points)}
                            initialValue={initialPoints.bear}
                            colour="green lighten-5"
                            house="Bear" />
          <RecordEntry onEntryChange={(points)=>setWolfPoints(points)}
                      initialValue={initialPoints.wolf}
                      colour="orange lighten-5"
                      house="Wolf" />
          
          <RecordEntry onEntryChange={(points)=>setEaglePoints(points)}
                      initialValue={initialPoints.eagle}
                      colour="blue lighten-5"
                      house="Eagle" />
          <RecordEntry onEntryChange={(points)=>setTurtlePoints(points)}
                      initialValue={initialPoints.turtle}
                      colour="red lighten-5"
                      house="Turtle" />
        </tbody>
      </table>
      <br />
        <button className="btn green accent-4" onClick={handleSubmit}>Submit</button>
    </div>
  );
}

HousePoints.defaultProps = {
    edit: false,
    initialPoints: {
      wolf:0,
      eagle:0,
      turtle:0,
      bear:0
  }
}

export default requireAuth()(HousePointWrapper)