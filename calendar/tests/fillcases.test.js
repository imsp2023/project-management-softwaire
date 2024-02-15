const { test } = QUnit;

test("throw an exception when events is not specified", assert => {
    assert.throws(() => {
        let d= new Day();
        d.fillcases();
    }, new Error(MISSING_PARAMETERS));
});

test("when beginDate and endDate are not specified for event, isTodayEvent return false", assert => {
    let event = {title: "Event 1"};
    let d = new Day();

    assert.equal(d.isTodayEvent(event), false);
});

test("when event beginDate only is specified, isValidDate should be called one time", assert => {
    let spy = sinon.spy(date, 'isValidDateFormat');
    let d = new Day();
    let events = [
        {title: "Event 1", beginDate: "12-15-16"}
    ];

    d.isTodayEvent(events[0]);
    
    assert.equal(spy.callCount, 1);
    spy.restore();
});

test("when event endDate only is specified, isValidDate should be called one time", assert => {
    let spy = sinon.spy(date, 'isValidDateFormat');
    let d = new Day();
    let events = [
        {title: "Event 1", endDate: "12-15-16"}
    ];

    d.isTodayEvent(events[0]);
    
    assert.equal(spy.callCount, 1);
    spy.restore();
});

test("when event endDate and beginDate are both specified, isValidDate should be called one time at least", assert => {
    let spy = sinon.spy(date, 'isValidDateFormat');
    let d = new Day();
    let event = {title: "Event 1", beginDate: "12-15-16", endDate: "12-5-25"}

    d.isTodayEvent(event);
    assert.ok(spy.callCount > 0);
    spy.restore();
});

test("when one of the event date is not in valid format, isTodayEvent return false", assert => {

    let stub = sinon.stub(date, 'isValidDateFormat').callsFake(function fn(){
        return false;
    });

    let event = {title: "Event 1", beginDate: "12-15-16", endDate: "12-5-25" };
    let d = new Day();
    
    assert.equal(d.isTodayEvent(event), false);
    stub.restore();
});

test("when beginDate only is not specified and endDate is in valid format, beginDate should be set to begin of journey", assert => {
    let stub = sinon.stub(date, 'isValidDateFormat').callsFake(function fn(){
        return true;
    });

    let event = {title: "Event 1", endDate: "12-03-2004"};

    (new Day()).isTodayEvent(event);

    assert.equal(event.beginDate, date.beginOfCurrentDay());
    stub.restore();
});


test("when endDate only is not specified and beginDate is in valid format, beginDate should be set to begin of journey", assert => {
    let stub = sinon.stub(date, 'isValidDateFormat').callsFake(function fn(){
        return true;
    });

    let event = {title: "Event 1", beginDate: "12-03-2004"};

    (new Day()).isTodayEvent(event);

    assert.equal(event.endDate, date.endOfCurrentDay());
    stub.restore();
});


test("when event has valid dates and is not in current day, isTodayEvent should return false", assert => {
    let stub = sinon.stub(date, 'isValidDateFormat').callsFake(function fn(){
        return true;
    });
    
    let event = {title:"Event", beginDate:"2004-13-12", endDate:"2004-13-12"};
    let d = new Day();

    assert.equal(d.isTodayEvent(event), false);
    stub.restore();
});

test("when event has valid dates and is in current day, isTodayEvent should return true", assert => {
    let stub = sinon.stub(date, 'isValidDateFormat').callsFake(function fn(){
        return true;
    });
    
    let event = {title:"Event", beginDate:"2024-02-11", endDate:"2024-02-12"};
    let d = new Day();

    assert.equal(d.isTodayEvent(event), true);
    stub.restore();
});


test("for each today event day, findPosition should be called twice", assert => {
    let stub = sinon.stub(date, 'isValidDateFormat').callsFake(function fn(){
        return true;
    });
    let spy = sinon.spy(Day.prototype, 'findPosition');
    
    let events = [{title:"Event", beginDate:"2024-02-11", endDate:"2024-02-12"}];
    let d = new Day();
    d.fillcases(events);

    assert.equal(spy.callCount, 2);

    stub.restore();
    spy.restore();
});


test("when findPosition returns -1 for some event, it should not be in cases", assert => {
    let stub = sinon.stub(Day.prototype, 'findPosition').callsFake(function fn(){
        return -1;
    });
    
    let events = [{title:"Event", beginDate:"2024-02-11", endDate:"2024-02-12"}];
    let d = new Day();
    d.fillcases(events);

    assert.equal(d.cases.includes(events[0]), false);
    stub.restore();
});

test("when findPosition return valid position for one event, it should be in cases", assert => {
    let stub = sinon.stub(Day.prototype, 'findPosition').callsFake(function fn(){
        return 1;
    });
    
    let events = [{title:"Event", beginDate:"2024-02-11", endDate:"2024-02-12"}];
    let d = new Day();
    d.fillcases(events);

    assert.equal(d.cases.length, 1);

    stub.restore();
});


test("when event already exists, it should not be in cases", assert => {
    // let stub = sinon.stub(Day.prototype, 'findPosition').callsFake(function fn(){
    //     return 1;
    // });
    
    // let events = [{title:"Event", beginDate:"2024-02-11", endDate:"2024-02-12"}, {title:"Event", beginDate:"2024-02-11", endDate:"2024-02-12"}];
    // let d = new Day();
    // d.fillcases(events);
    
    // console.log(d.cases);

    // assert.equal(d.cases.length, 1);

    // stub.restore();
});