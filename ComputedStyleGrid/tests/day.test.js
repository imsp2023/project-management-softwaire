QUnit.module("day", () => {
  QUnit.module("computedGridStyle", () => {
    QUnit.test(
      "throws an exception when the parameters are empty",
      (assert) => {
        let dayOne = new Day();
        assert.throws(() => {
          dayOne.computedGridStyle();
        }, new Error("parameters are missig"));
      }
    );

    QUnit.test(
      "with event parameter specified, findPosition should be called twice",
      (assert) => {
        let dayOne = new Day();
        let eventOne = { beginDate: "", endDate: "" };
        let count = 0;
        sinon.stub(Day.prototype, "findPosition").callsFake(function fn() {
          count++;
        });
        dayOne.computedGridStyle(eventOne);
        assert.equal(count, 2);
        sinon.restore();
      }
    );

    QUnit.test(
      "with event parameter specified, computedGridStyle return correct value",
      (assert) => {
        let dayOne = new Day();
        let eventOne = { beginDate: `${new Date()}`, endDate: "2025-01-12" };
        let stub1 = sinon.stub(Day.prototype, "findPosition");
        stub1.onFirstCall().returns(2);
        stub1.onSecondCall().returns(4);
        assert.equal(
          dayOne.computedGridStyle(eventOne),
          `grid-row:${2}/${4};grid-col:${1}`
        );
        stub1.restore();
      }
    );
  });
});
