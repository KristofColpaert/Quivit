/*eslint-disable */
jest.autoMockOff();

import {
  Vector,
  Circle,
  laterate
} from "../src/index.js";

describe("lateration", function() {

  it("should calculate correct values", function() {
    const circles = [
      new Circle(new Vector(0, 1), 5.89),
      new Circle(new Vector(4, 7), 4.62),
      new Circle(new Vector(4, 5), 2.73),
      new Circle(new Vector(8, 4), 3.66),
      new Circle(new Vector(-2, 1), 7.78),
    ];

    const position = laterate(circles);

    expect(position.x).toBeGreaterThan(5 - .5);
    expect(position.x).toBeLessThan(5 + .5);

    expect(position.y).toBeGreaterThan(3 - .5);
    expect(position.y).toBeLessThan(3 + .5);
  });

});
