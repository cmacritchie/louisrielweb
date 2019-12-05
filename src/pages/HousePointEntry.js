import React, { useState, useContext, useEffect } from "react";
import RecordEntry from "../components/RecordEntry"
import { Context as HouseContext } from '../contexts/HousePointsContext'
import axios from 'axios';

const HousePointWrapper = ({ match } )=>{
  const { params } = match

  const [isLoaded, setLoaded] = useState(false)
  const [isEdit, setEdit] = useState(false)
  const [initialPoints, setInitialPoints] = useState()

  useEffect(() => {
    if(Object.keys(params).length > 0){
      const getExistingPoints = async (id) => {
        const response = await axios.get(`/api/house/${id}`)
        setInitialPoints(response.data)
        setEdit(true)
        setLoaded(true)
      }
      getExistingPoints(params.id)
     
    } else {
      setLoaded(true)
    }
  }, [])

  if(!isLoaded) {
    return <p>...loading</p>
  } else if(isLoaded && isEdit ) {
    return <HousePoints initialPoints={initialPoints} edit={true} id={params.id} />
  } else if(isLoaded && !isEdit) {
    return <HousePoints />
  }

  return <p>error</p>
}

const  HousePoints = ({ initialPoints, edit, id }) => {
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
    <h2>House Entry</h2>
    <table>
      <tbody>


    
            <RecordEntry onEntryChange={(points)=>setWolfPoints(points)}
                        initialValue={initialPoints.wolf}
                        colour="white"
                        house="Wolf" />
            <RecordEntry onEntryChange={(points)=>setBearPoints(points)}
                        initialValue={initialPoints.bear}
                        colour="blue"
                        house="Bear" />
            <RecordEntry onEntryChange={(points)=>setEaglePoints(points)}
                        initialValue={initialPoints.eagle}
                        colour="red"
                        house="Eagle" />
            <RecordEntry onEntryChange={(points)=>setTurtlePoints(points)}
                        initialValue={initialPoints.turtle}
                        colour="green"
                        house="Turtle" />
             </tbody>
        </table>
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

export default HousePointWrapper