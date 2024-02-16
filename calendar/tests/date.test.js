test("getCurrentDateString should return current day yyyy-mm-dd", assert => {
    let d = date.getCurrentDateString();
    let current_day = (new Date()).toISOString().split('T')[0];

    assert.equal(d, `${current_day}`);
});


test("beginOfCurrentDay should get today with hours to zero", assert => {
    let d = date.beginOfCurrentDay();

    assert.equal(d, `${date.getCurrentDateString()}T00:00`);
});


test("endOfCurrentDay should get today with hours to zero", assert => {
    let d = date.endOfCurrentDay();

    assert.equal(d, `${date.getCurrentDateString()}T23:59`);
});