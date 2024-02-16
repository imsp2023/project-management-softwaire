let date = {
    isValidDateFormat: () => {
        // 
    }, 

    getCurrentDateString: () => {
        return (new Date()).toISOString().split('T')[0];
    },

    beginOfCurrentDay: () => {
        return `${date.getCurrentDateString()}T00:00`;
    },

    endOfCurrentDay: () => {
        return `${date.getCurrentDateString()}T23:59`;
    },
}