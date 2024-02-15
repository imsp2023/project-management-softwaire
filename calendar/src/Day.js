class Day {
    _cases = [];

    constructor(props){
        //
    }


    fillcases (events){
        if(!events){
            throw new Error(MISSING_PARAMETERS);
        }

        events.forEach((event) => {
            if(!this.isTodayEvent(event))
                return;

            let beginPosition = this.findPosition(event);
            let endPosition = this.findPosition(event);

            if(endPosition === -1 || beginPosition === -1)
                return;

            event.endPosition = beginPosition;
            event.beginPosition = endPosition;
            
            this._cases.push(event);

        });
    }


    isTodayEvent (event) {
        let validEvent = true;

        if(!event.endDate && !event.beginDate)
            return false;


        // handle beginDate
        if(event.beginDate || !event.beginDate == ""){
            let isValid = date.isValidDateFormat(event.beginDate);
            
            if(!isValid)
                return false;
        }else
            event.beginDate = date.beginOfCurrentDay();


        // handle endDate
        if(event.endDate || !event.endDate == ""){
            let isValid = date.isValidDateFormat(event.endDate);

            if(!isValid)
                return false;
        }else
            event.endDate = date.endOfCurrentDay();

        let beginDate = new Date(event.beginDate);
        let endDate = new Date(event.endDate);

        if(beginDate <= endDate){
            if (beginDate >= new Date(date.beginOfCurrentDay())) 
            return true;
        }

        return false;
    }


    findPosition() {

    }

    get cases (){
        return this._cases;
    }
}