import React from 'react'

const EventContent = (eventInfo) => {
    // console.log(eventInfo.event._def.title)
    return (
        <div style={{ backgroundColor: eventInfo.event.backgroundColor, padding: '2px', borderRadius: '4px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <span>{eventInfo.event._def.title}</span>
        </div>
    )
}

export default EventContent