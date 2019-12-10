import React from 'react'
import requireAuth from '../components/requireAuth'

const Support = () => {
    return (
        <div>
            <p>
                Hi!
                <br /> 
                My name is Craig MacRitchie and I work on the Louis Riel House System application for fun. 
                If you run into any issues or would like to make suggestions please feel free to contact me. 
                reporting bugs and providing constructive criticism is appreciated. Thanks!
                <br />
                <br />
                -Craig
                <br />
                <br />
                email: &nbsp;
                
                <a href="mailto:craig.macritchie@gmail.com?
                subject= Louis Riel House App">
                    craig.macritchie@gmail.com
                </a>
            </p>
        </div>
    )
}

export default requireAuth()(Support)