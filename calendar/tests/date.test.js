const { test } = QUnit;

test("beginOfCurrentDay should get today with hours to zero", assert => {
    let d = date.beginOfCurrentDay();

    assert.equal(d, "2024-02-11 00:00:00");
});

test("endOfCurrentDay should get today with 23:59:59 hours", assert => {
    let d = date.endOfCurrentDay();

    assert.equal(d, "2024-02-11 23:59:59");
});