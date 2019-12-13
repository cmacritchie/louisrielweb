import React from 'react'
import PropTypes from 'prop-types'
import {VictoryChart, VictoryBar, VictoryContainer } from 'victory'

const HouseTable = ({ housePoints }) => {

    return (
        <>
            <VictoryChart
            height={350}
                domainPadding={{ x: 20 }}
                animate={{ duration: 1000,
                    onLoad: { duration: 1000 } }}
                >
                <VictoryBar
                    labels={({ datum }) => Math.round(datum.y)}
                    containerComponent={<VictoryContainer responsive={false} />}
                        data={[
                            { x: 'Bear', y: housePoints.bear, opacity: 0.5, fill: "blue" },
                            { x: 'Wolf', y: housePoints.wolf, opacity: 0.5, fill: "green"},
                            { x: 'Eagle', y: housePoints.eagle, opacity: 0.5, fill: "red"},
                            { x: 'Turtle', y: housePoints.turtle, opacity: 0.5, fill: "yellow"},
                        
                        ]}
                    style={{
                        data: {
                            fill: ({ datum }) => datum.fill,
                            opacity: ({ datum }) => datum.opacity
                        }
                        }}
                    />
            </VictoryChart>
        </>
    )
}

HouseTable.defaultProps  = {
    housePoints: {
        bear:0,
        wolf:0,
        eagle:0,
        turtle:0
    }
}

export default HouseTable
