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

     const { wsUpdatePoints } = useContext(HouseContext)

    useEffect(() => {
        socket.on("outgoingData", data => {
            wsUpdatePoints(data.num)
        })      
    }, [])

    return <HouseTable  housePoints={sumEntries} />
}

export default LandingWrapper