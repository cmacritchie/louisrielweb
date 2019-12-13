import socketIOClient from "socket.io-client";
const endPoint = 'http://localhost:5000'
export const socket = socketIOClient(endPoint);

//delete this whole file?
export const ioHousePost = (data) => {
    socket.emit('incomingData', data, (error) =>{
        console.log('error')
    })
}

export const ioReceivePost= () => {
    socket.on("outgoingdata", data => {
        console.log(data)
    })
}