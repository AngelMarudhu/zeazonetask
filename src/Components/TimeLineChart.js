import React, { useEffect, useRef, useState } from 'react'
//// we are going to do time line chart here with full calender library let's start
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Button, ButtonGroup, Container, Box, Typography } from "@mui/material"
import { changeView, handleToday, handlePrev, handleNext } from "../Util/CustomCalender.js"
import { event_members, event_data } from "../Data/Data.js"
import { handleEvents } from '../Util/CustomCalender.js'

// import resourceTimelinePlugin from '@fullcalendar/resource-timeline'

const TimeLineChart = () => {
    const [view, setView] = useState('dayGridMonth')
    const [typo, setTypo] = useState("October 2022")
    const calendarRef = useRef(null)
    const [event, setEvents] = useState([])


    useEffect(() => {
        const fetchEvents = async () => { // Make it async
            try {
                const handledEvents = handleEvents(event_data.finalSchedule, event_members.users);
                setEvents(handledEvents);
                // console.log("Events set:", handledEvents)
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, []);


    // console.log(event)

    const handleDateClick = (arg) => {
        alert(arg.dateStr, "clicked")
    }

    return (
        <Container>
            <Box sx={{
                display: "flex", justifyContent: "space-between", marginTop: "1rem", marginBottom: "1rem", '@media (max-width:768px)': {
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%'
                }
            }}>

                <ButtonGroup
                    variant="outlined"
                    color="secondary"
                    sx={{ marginLeft: "10px" }}
                >
                    <Button onClick={() => { handleToday(calendarRef, view, setTypo) }}>Today</Button>
                    <Button onClick={() => { handlePrev(calendarRef, setTypo) }}>⬅️</Button>
                    <Button onClick={() => { handleNext(calendarRef, setTypo) }}>➡️</Button>
                </ButtonGroup>

                <ButtonGroup variant="outlined" color="primary" >
                    <Button onClick={() => changeView(calendarRef, setView, "dayGridMonth", setTypo)}>Month</Button>
                    <Button onClick={() => changeView(calendarRef, setView, "timeGridWeek", setTypo)}>1-Week</Button>
                    <Button onClick={() => changeView(calendarRef, setView, "timeGridTwoWeeks", setTypo)}>
                        2-Weeks
                    </Button>
                    <Button onClick={() => changeView(calendarRef, setView, "timeGridTwoDays", setTypo)}>2-Days</Button>
                    <Button onClick={() => changeView(calendarRef, setView, "timeGridDay", setTypo)}>1-Day</Button>
                </ButtonGroup>

            </Box>

            <Typography variant="h5" sx={{ marginTop: "1rem", textAlign: "center" }}>
                {typo}
            </Typography>

            <FullCalendar initialDate="2022-10-01" ref={calendarRef} plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} initialView={view} dateClick={handleDateClick} headerToolbar={false} height="auto" views={{
                timeGridTwoWeeks: {
                    type: "timeGrid",
                    duration: { weeks: 2 },
                    buttonText: "2 Weeks",
                },

                timeGridTwoDays: {
                    type: "timeGrid",
                    duration: { days: 2 },
                    buttonText: "2 Days",
                }
            }} events={event}
            >
                <div>
                    <h1>TimeLineChart</h1>
                </div>
            </FullCalendar >
        </Container>
    )
}

export default TimeLineChart    