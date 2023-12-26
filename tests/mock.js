class Task{
    id = "212121";
    _title = undefined;
    _startDate = undefined;
    _dueDate = undefined;
    constructor(props){
        this.title= props.title;
    }

    get startDate(){
        return this._startDate;
    }

    get dueDate(){
        return this._dueDate;
    }

    set startDate(value){
        if (!regex.test(value))
          throw new Error(INVALID_DATE_FORMAT);
        var dates = value.split('-');
        this._startDate = new Date(Number(dates[YEAR]), Number(dates[MONTH]) - 1, Number(dates[DAY]));
    }

    set dueDate(value){
        if (!regex.test(value))
          throw new Error(INVALID_DATE_FORMAT);
        var dates = value.split('-');
        this._dueDate = new Date(Number(dates[YEAR]), Number(dates[MONTH]) - 1, Number(dates[DAY]));
    }
}