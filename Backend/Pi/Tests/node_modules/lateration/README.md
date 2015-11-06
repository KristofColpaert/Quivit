# Lateration

> A simple (?) solution to the fairly common problem of lateration.

## Problem

You've got three or more beacons, their distances to your device and you want to calculate the device's position.

## Theory

Suppose we have three circles, and somewhere in their center our beacon.
The radius of each circle is the (approximate) distance to the beacon. Let call the circles A, B, and C.

Each circle's formula would look like this:

![Formula Circle](https://github.com/philplckthun/lateration/raw/master/img/circle.png)

Substracting two circles would give a linear equation, which crosses their two intersections:

![Linear Equation from Subtraction](https://github.com/philplckthun/lateration/raw/master/img/linearfunction.png)

Calculating the intersection of two of these linear equations gives the x-value of the devices position in between the beacons.

![Calculate x-value via intersecting](https://github.com/philplckthun/lateration/raw/master/img/calculateX.png)

This value can then be inserted in one of the two linear equations to get the corresponding y-value.

This process is repeated for each pair of circles and for each pair lines resulting from this circle subtraction.
The resulting points are averaged.

## Installation

```
npm install lateration
```

## Usage (ES6)

```javascript
import {
  Circle,
  Vector,
  laterate
} from "lateration";

// The beacons
const beacons = [
  new Circle(new Vector(0, 1), 5.89),
  new Circle(new Vector(4, 7), 4.62),
  new Circle(new Vector(4, 5), 2.73)
];

// Laterating
const position = laterate(beacons);
```

## Usage (ES5)

```javascript
var lateration = require("lateration");
var Circle = lateration.Circle;
var Vector = lateration.Vector;
var laterate = lateration.laterate;

// The beacons
var beacons = [
  new Circle(new Vector(0, 1), 5.89),
  new Circle(new Vector(4, 7), 4.62),
  new Circle(new Vector(4, 5), 2.73)
];

// Laterating
var position = laterate(beacons);
```

## API

### function laterate(circles)

Takes a list of Circles and executes a lateration operation.

If it can't generate enough lines to intersect, it will return null.

### class Vector

A simple vector with `x` and `y` attributes

### class Circle

### Class Line

## License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
