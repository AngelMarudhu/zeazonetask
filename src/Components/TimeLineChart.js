import React, { useEffect, useRef, useState } from 'react'
//// we are going to do time line chart here with full calender library let's start
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Button, ButtonGroup, Container, Box, Typography } from "@mui/material"
import { changeView, handleToday, handlePrev, handleNext } from "../Util/CustomCalender.js"
import { event_members, event_data } from "../Data/Data.js"
import { handleEvents, getResources } from '../Util/CustomCalender.js'
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import EventContent from './EventContent.js'
import "../css/event.css"
import getCalendarViews from '../Util/CustomView.js'


// import resourceTimelinePlugin from '@fullcalendar/resource-timeline'

const TimeLineChart = () => {
    const [view, setView] = useState('dayGridMonth')
    const [typo, setTypo] = useState("October 2022")
    const calendarRef = useRef(null)
    const [event, setEvents] = useState([])
    const [resources, setResources] = useState([])
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const views = getCalendarViews(isMobile)


    useEffect(() => {
        const fetchEvents = async () => { // Make it async
            try {
                const resources = getResources(event_data.layers, event_data.overrideLayer, event_data.finalSchedule);
                const handledEvents = handleEvents(event_data.layers, event_data.finalSchedule, event_data.overrideLayer, event_members.users)

                setEvents(handledEvents);
                setResources(resources);
                // console.log("Events set:", handledEvents)
            } catch (error) {
                console.error("Something happend", error.message);
            }
        };

        fetchEvents();
    }, []);


    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // Update state on resize
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    // console.log(event)

    // const handleDateClick = (arg) => {
    //     console.log(calendarRef)
    // }

    return (
        <Container maxWidth={false}>
            <Box sx={{
                width: "100%",
                display: "flex", justifyContent: "space-between", marginTop: "1rem", overflowX: "hidden", marginBottom: "1rem", '@media (max-width:768px)': {
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100vw'
                }
            }}>

                <ButtonGroup
                    variant="outlined"
                    color="secondary"
                >
                    <Button onClick={() => { handleToday(calendarRef, view, setTypo) }}>Today</Button>
                    <Button onClick={() => { handlePrev(calendarRef, setTypo) }}>⬅️</Button>
                    <Button onClick={() => { handleNext(calendarRef, setTypo) }}>➡️</Button>
                </ButtonGroup>

                <ButtonGroup variant="outlined" color="primary" size={isMobile ? "small" : "medium"}
                    sx={isMobile ? { flexWrap: 'wrap', justifyContent: 'center', alignItems: "center", width: "100%" } : {}} >

                    <Button onClick={() => changeView(calendarRef, setView, isMobile ? "dayGridMonth" : "resourceTimelineMonth", setTypo)}>Month</Button>
                    <Button onClick={() => changeView(calendarRef, setView, isMobile ? "timeGridWeek" : "resourceTimelineWeek", setTypo)}>1-Week</Button>
                    <Button onClick={() => changeView(calendarRef, setView, isMobile ? "timeGridTwoWeeks" : "resourceTimelineWeek", setTypo)}>
                        2-Weeks
                    </Button>
                    <Button onClick={() => changeView(calendarRef, setView, isMobile ? "timeGridTwoDays" : "resourceTimelineTwoDays", setTypo)}>2-Days</Button>
                    <Button onClick={() => changeView(calendarRef, setView, isMobile ? "timeGridDay" : "resourceTimelineDay", setTypo)}>1-Day</Button>
                </ButtonGroup>

            </Box>

            <Typography variant="h5" sx={{ marginTop: "1rem", textAlign: "center" }}>
                {typo}
            </Typography>

            <div>
                <FullCalendar
                    //// full customization don't panic just it's all just built in customization just go through it and our logics are somewhere
                    //// refered from official documentation of full calender easy to implement 
                    //// https://fullcalendar.io/docs/events-array
                    //// https://fullcalendar.io/docs/expandRows
                    //// most import feeding : https://fullcalendar.io/docs/resources-json-feed
                    key={isMobile}
                    schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
                    initialDate="2022-10-03"
                    ref={calendarRef}
                    plugins={[resourceTimelinePlugin, dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView={isMobile ? 'dayGridMonth' : 'resourceTimelineMonth'}
                    headerToolbar={false}
                    resources={resources}
                    eventContent={EventContent}
                    events={event}
                    expandRows={true}
                    resourceAreaWidth={150}
                    eventClassNames={['event-class']}
                    height="auto"
                    locale="en-IN"
                    firstDay={1}
                    //// my customization placed on customview.js file 
                    views={views}
                // events={event}

                >
                </FullCalendar >
            </div>
        </Container >
    )
}

export default TimeLineChart    