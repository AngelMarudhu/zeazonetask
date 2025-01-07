export const handleToday = (calendarRef, view, setTypo) => {
    if (calendarRef.current) {
        const calendarApi = calendarRef.current.getApi();
        const today = new Date();
        //// filteration of view based where your filter is set
        if (view === "resourceTimelineMonth" || "dayGridMonth") {
            calendarApi.changeView("resourceTimelineMonth");

        } else if (view === "resourceTimelineWeek" || "timeGridWeek") {
            calendarApi.changeView("resourceTimelineWeek");

        } else if (view === "resourceTimelineDay" || "timeGridDay") {
            calendarApi.changeView("resourceTimelineDay");
        }
        calendarApi.gotoDate(today); // Navigate to today's date
        setTypo(calendarApi.view.title)
    }
};

//// the below things are happen with the help of the calendar api and the calendar ref
export const handleNext = (calendarRef, setTypo) => {
    // console.log(calendarRef.current.calendar)
    const calendarApi = calendarRef.current.getApi();
    calendarApi.next();
    setTypo(calendarRef.current.calendar.currentData.viewTitle);
};

export const handlePrev = (calendarRef, setTypo) => {
    // console.log(calendarRef.current.calendar.currentData.viewTitle)
    const calendarApi = calendarRef.current.getApi();
    calendarApi.prev();
    setTypo(calendarRef.current.calendar.currentData.viewTitle);
};

export const changeView = (calendarRef, setView, newView, setTypo) => {
    // console.log(calendarRef.current.calendar)
    setView(newView);
    const calendarApi = calendarRef.current.getApi();
    calendarApi.changeView(newView);
    setTypo(calendarRef.current.calendar.currentData.viewTitle);
};

export const getResources = (layers, overrideLayer, finalSchedule) => {
    // console.log(layers, overrideLayer, finalSchedule)
    let anonymous = []
    // all the resources are rendered sorting by layer title it's a default feature of fullcalendar
    const resources = layers.map((layer) => ({
        id: `layer-${layer.number}`,
        title: `Layer ${layer.number}`,
    }));


    if (overrideLayer.length >= 0) {
        resources.push({
            id: "override-layer",
            title: "Override Layer",
        });
    }

    // Add Final Schedule if it has events
    if (finalSchedule.length > 0) {
        resources.push({
            id: "final-layer",
            title: "Final Schedule",
        });
    }
    //// i just mentioned for example if you want to add anonymous layer then you can do it here
    if (anonymous.length >= 0) {
        resources.push({
            id: "anonymous-layer",
            title: "Anonymous",
        });
    }

    return resources;
}

/// from getting arguments TimelineChart.js
export const handleEvents = (layers, finalSchedule, overrideLayer, users) => {
    const allEvents = [];

    //// seperate the events based on the layer and push into single array allEvents 
    //// here two nested array that is layers and users
    layers.forEach((layer) => {
        layer.layers.forEach((event) => {
            const user = users.find((user) => user.id === event.userId);
            allEvents.push({
                //// the resourceId must be same as resourceId in the calendar as we passed in the resource object or we can't get the event for that particular layer otherwise rest of the things are common as usual another library
                resourceId: `layer-${layer.number}`,
                title: user ? user.name : "Unknown User",
                start: event.startDate,
                end: event.endDate,
                color: user ? getColor(user.id) : "#ccc",
            });
        });
    });


    finalSchedule.forEach((event) => {
        const user = users.find((user) => user.id === event.userId);
        allEvents.push({
            resourceId: "final-layer",
            title: user ? user.name : "Unknown User",
            start: event.startDate,
            end: event.endDate,
            color: user ? getColor(user.id) : "gray ",
        });
    });


    overrideLayer.forEach((event) => {
        const user = users.find((user) => user.id === event.userId);
        allEvents.push({
            resourceId: "override-layer",
            title: user ? user.name : "Unknown User",
            start: event.startDate,
            end: event.endDate,
            color: user ? getColor(user.id) : "gray",
        });
    });
    return allEvents;
}

const getColor = (id) => {
    switch (id) {
        case 23: return "goldenRod"
        case 24: return "black"
        case 27: return "#ff6000"
        default: return "gray"
    }
}