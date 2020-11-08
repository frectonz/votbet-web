// event types => ONGOING, ENDED, DUE
// determine the event type given the startDate and endDate

// if current time is after the start date and current time is before end date => ONGOING
// if current time is after the end date => ENDED
// if current time is before the start date => DUE

export const getEventType = (startDate, endDate) => {
  if (Date.now() > Date.parse(startDate) && Date.now() < Date.parse(endDate)) {
    return "ONGOING";
  }

  if (Date.now() > Date.parse(endDate)) {
    return "ENDED";
  }

  if (Date.now() < Date.parse(startDate)) {
    return "DUE";
  }
};
