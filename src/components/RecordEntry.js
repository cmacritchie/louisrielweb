import React, { useState, useEffect } from 'react'

const RecordEntry = ({ onEntryChange, initialValue, colour, house, }) => {
    const [points, setPoints] = useState(initialValue);

    useEffect(()=>{
        onEntryChange(points)
    },[points])

    return(
            <div style={{backgroundColor:colour}}>
                <h3>House: {house}</h3>
                <ul>
                    <li>
                        <button onClick={()=>setPoints(points + 25)} >+ 25</button>
                    </li>
                    <li>
                        <button onClick={()=>setPoints(points + 5)} >+ 5</button>
                    </li>
                    <li>
                        <button onClick={()=>setPoints(points + 1)} >+ 1</button>
                    </li>
                    <li>
                        <input value={points}  readOnly/>
                    </li>
                    <li>
                        <button onClick={()=>setPoints(points -1)} >- 1</button>
                    </li>
                    <li>
                        <button onClick={()=>setPoints(points - 5)} >- 5</button>
                    </li>
                    <li>
                        <button onClick={()=>setPoints(points - 25)} >- 25</button>
                    </li>
                </ul>
            </div>
    )
}


export default RecordEntry