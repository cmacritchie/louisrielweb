import React, { useState, useEffect } from 'react'

const RecordEntry = ({ onEntryChange, initialValue, colour, house, }) => {
    const [points, setPoints] = useState(initialValue);

    useEffect(()=>{
        onEntryChange(points)
    },[points])

    return(
            <tr style={{backgroundColor:colour}}>
                    <td>
                        <button className="btn green accent-3" onClick={()=>setPoints(points + 25)}>25</button>
                    </td>
                    <td>
                        <button className="btn green accent-2" onClick={()=>setPoints(points + 5)} >5</button>
                    </td>
                    <td>
                        <button className="btn green accent-1" onClick={()=>setPoints(points + 1)} >1</button>
                    </td>
                    <td>
                        <input  value={points}  readOnly/>
                    </td>
                    <td>
                        <button className="btn red lighten-4" onClick={()=>setPoints(points -1)}>1</button>
                    </td>
                    <td>
                        <button className="btn red lighten-1" onClick={()=>setPoints(points - 5)}>5</button>
                    </td>
                    <td>
                        <button className="btn red darken-4" onClick={()=>setPoints(points - 25)}>25</button>
                    </td>
            </tr>
    )
}


export default RecordEntry