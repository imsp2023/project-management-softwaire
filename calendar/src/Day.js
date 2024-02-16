class Day {
    _cases = [];

    constructor(props){
        
    }


    fillcases (events){
        if(!events){
            throw new Error(MISSING_PARAMETERS);
        }

        events.forEach((event) => {
            console.log(event);
            if(!this.isTodayEvent(event))
                return;

            let beginPosition = this.findPosition(event.beginDate);
            let endPosition = this.findPosition(event.endDate);

            if(endPosition === -1 || beginPosition === -1)
                return;

            event.endPosition = endPosition;
            event.beginPosition = beginPosition;

            console.log("J'y suis");
            
            this._cases.push(event);
            
        });
        
        console.log(this.cases);
    }


    isTodayEvent (event) {

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
            if(!date.isValidDateFormat(event.endDate))
                return false

        }else
            event.endDate = date.endOfCurrentDay()

        let beginDate = new Date(event.beginDate);
        let endDate = new Date(event.endDate);

        if(beginDate <= endDate && beginDate >= new Date(date.beginOfCurrentDay()))
            return true;

        return false;
    }


    findPosition() {

    }

    get cases (){
        return this._cases;
    }

}