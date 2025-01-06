export const handleToday = (calendarRef, view, setTypo) => {
    if (calendarRef.current) {
        const calendarApi = calendarRef.current.getApi();
        const today = new Date(); // Get the current date

        if (view === "dayGridMonth") {
            calendarApi.changeView("dayGridMonth"); // Set to month view
        } else if (view === "timeGridWeek") {
            calendarApi.changeView("timeGridWeek"); // Set to week view
        } else if (view === "timeGridDay") {
            calendarApi.changeView("timeGridDay"); // Set to day view
        }
        calendarApi.gotoDate(today); // Navigate to today's date
        setTypo(calendarApi.view.title)
    }
};
export const handleNext = (calendarRef, setTypo) => {
    console.log(calendarRef.current.calendar.currentData.viewTitle)
    setTypo(calendarRef.current.calendar.currentData.viewTitle);
    const calendarApi = calendarRef.current.getApi();
    calendarApi.next();
};

export const handlePrev = (calendarRef, setTypo) => {
    console.log(calendarRef.current.calendar.currentData.viewTitle)
    setTypo(calendarRef.current.calendar.currentData.viewTitle);
    const calendarApi = calendarRef.current.getApi();
    calendarApi.prev();
};

export const changeView = (calendarRef, setView, newView, setTypo) => {
    // console.log(calendarRef.current.calendar.currentData.viewTitle)
    setTypo(calendarRef.current.calendar.currentData.viewTitle);
    setView(newView);
    const calendarApi = calendarRef.current.getApi();
    calendarApi.changeView(newView);
};


export const handleEvents = (events, users) => {
    return events.map((event) => {
        const user = users.find((user) => user.id === event.userId);
        return {
            title: user ? user.name : "Unknown User", // Use the user's name or a fallback
            color: user ? getColor(user.id) : "#ccc",
            start: new Date(event.startDate),
            end: new Date(event.endDate) // Assign a color (optional)
        };

    });
    // Return the mapped events array

};

const getColor = (id) => {
    switch (id) {
        case 23: return "red"
        case 24: return "blue"
        case 27: return "green"
        default: return "gray"
    }
}