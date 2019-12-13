import React, { useState, useEffect } from 'react'

const RecordEntry = ({ onEntryChange, initialValue, colour, house, }) => {
    const [points, setPoints] = useState(initialValue);

    useEffect(()=>{
        onEntryChange(points)
    },[points])

    return(
            <tr className={colour}>
                <td>
                    {house}
                </td>
                    <td>
                        <button className="btn blue-grey lighten-5" onClick={()=>setPoints(points + 5)} >+5</button>
                    </td>
                    <td>
                        <button className="btn blue-grey lighten-5" onClick={()=>setPoints(points + 1)} >+1</button>
                    </td>
                    <td>
                        <input max="1000" type="number" onChange={(e)=>setPoints(parseInt(e.target.value))}  value={points} />
                    </td>
                    <td>
                        <button className="btn blue darken-1" onClick={()=>setPoints(0)}>Clear</button>
                    </td>
            </tr>
    )
}


export default RecordEntry