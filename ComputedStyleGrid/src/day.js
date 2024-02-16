class Day {
  _cases = [];
  constructor(props) {
    //
  }

  findPosition(date) {
    //
  }

  computedGridStyle(event) {
    if (!event) throw new Error("parameters are missig");
    const beginPosition = this.findPosition(event.beginDate);
    const endPosition = this.findPosition(event.endDate);
    return `grid-row:${beginPosition}/${endPosition};grid-col:${1}`;
  }
}
