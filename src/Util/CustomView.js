
const getCalendarViews = (isMobile) => ({
    resourceTimelineMonth: {
        type: isMobile ? "dayGridMonth" : "resourceTimeline",
        duration: { months: 1 },
        buttonText: "Month",
    },
    resourceTimelineWeek: {
        type: "resourceTimeline",
        duration: { weeks: 1 },
        buttonText: "Week",
    },
    resourceTimelineTwoWeeks: {
        type: "resourceTimeline",
        duration: { weeks: 2 },
        buttonText: "2 Weeks",
    },
    resourceTimelineTwoDays: {
        type: "resourceTimeline",
        duration: { days: 2 },
        buttonText: "2 Days",
    },
    resourceTimelineDay: {
        type: "resourceTimeline",
        duration: { days: 1 },
        buttonText: "Day",
    },
    timeGridTwoWeeks: {
        type: "timeGrid",
        duration: { weeks: 2 },
        buttonText: "2 Weeks",
    },
    timeGridTwoDays: {
        type: "timeGrid",
        duration: { days: 2 },
        buttonText: "2 Days",
    },
});

export default getCalendarViews;