import React, { useEffect, useContext, useState } from 'react'
import { NavLink } from 'react-router-dom';
// import socketIOClient from "socket.io-client";
import HouseTable from '../components/HouseTable'
import { Context as HouseContext } from '../contexts/HousePointsContext'
import { Context as UserContext } from '../contexts/UserContext'
import { socket } from '../api/socketAPI'

const LandingWrapper = () => {
    const { state: { loaded, sumEntries },
     fetchPoints } = useContext(HouseContext)

    useEffect(() => {
        fetchPoints()
    }, [])

    if(loaded){
        return <Landing sumEntries={sumEntries} />
    }

    return <p>loading</p>        
    
}


const Landing = ({ sumEntries }) => {

     const { wsPostPoints, wsPatchPoints, wsDeletePoints } = useContext(HouseContext)

    useEffect(() => {
        socket.on("postedData", data => {
            wsPostPoints(data.num)
        })   
        socket.on("deletedData", data => {
            wsDeletePoints(data.num)
        })   
        socket.on("patchedData", data => {
            wsPatchPoints(data.num)
        })
    }, [])

    return <HouseTable  housePoints={sumEntries} />
}

export default LandingWrapper