const initializeHourMinSec = (date) => {
    date.setHours(0, 0, 0, 0); 
    return date;
}


const validateDateFormat = (dateString) => {
    const regexDate = /^(?:\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01]))$/;
    if(regexDate.test(dateString))
        return true;

    return false;
}