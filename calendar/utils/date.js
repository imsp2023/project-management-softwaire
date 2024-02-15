let date = {
    isValidDateFormat: () => {
        
    }, 

    beginOfCurrentDay: () => {
        let date = (new Date()).toISOString().split('T')[0];

        return `${date} 00:00:00`;
    },

    endOfCurrentDay: () => {
        let date = (new Date()).toISOString().split('T')[0];

        return `${date} 23:59:59`;
    }
}