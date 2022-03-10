import RubiksCube, { rotateMatrix } from "../src/index";
import { cubes } from "./cubes";
import { expect } from "chai";
import "mocha";

describe("Creation", () => {
  it("should create a fresh coloured cube", () => {
    const rubiksCube = new RubiksCube();
    expect(rubiksCube.cube).deep.equal(cubes.freshCube);
  });

  it("should create a fresh numbered cube", () => {
    const rubiksCube = new RubiksCube(true);
    expect(rubiksCube.cube).deep.equal(cubes.numberedCube);
  });
});

describe("In-place Rotation", () => {
	it("should rotate clockwise correctly", () => {
		const matrix = [
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9],
		];

		const expected = [
			[7, 4, 1],
			[8, 5, 2],
			[9, 6, 3],
		]

		rotateMatrix(matrix, false);

		expect(matrix).deep.equal(expected);
	});
	
	it("should rotate anti-clockwise correctly", () => {
		const matrix = [
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9],
		];

		const expected = [
			[3, 6, 9],
			[2, 5, 8],
			[1, 4, 7],
		]

		rotateMatrix(matrix, true);

		expect(matrix).deep.equal(expected);
	});
});

describe("Rotate Up", () => {
  it("should rotate clockwise correctly", () => {
    const rubiksCube = new RubiksCube(true);
    rubiksCube.upperRotate(false);
    expect(rubiksCube.cube).deep.equal(cubes.upperRotatedClockwise);
  });

  it("should rotate anti-clockwise correctly", () => {
    const rubiksCube = new RubiksCube(true);
    rubiksCube.upperRotate(true);
    expect(rubiksCube.cube).deep.equal(cubes.upperRotatedAntiClockwise);
  });
});

describe("Rotate Front", () => {
  it("should rotate clockwise correctly", () => {
    const rubiksCube = new RubiksCube(true);
    rubiksCube.frontRotate(false);
    expect(rubiksCube.cube).deep.equal(cubes.frontRotatedClockwise);
  });
	
  it("should rotate anti-clockwise correctly", () => {
    const rubiksCube = new RubiksCube(true);
    rubiksCube.frontRotate(true);
    expect(rubiksCube.cube).deep.equal(cubes.frontRotatedAntiClockwise);
  });
});

describe("Rotate Bottom", () => {
  it("should rotate clockwise correctly", () => {
    const rubiksCube = new RubiksCube(true);
    rubiksCube.bottomRotate(false);
    expect(rubiksCube.cube).deep.equal(cubes.bottomRotatedClockwise);
  });
	
  it("should rotate anti-clockwise correctly", () => {
    const rubiksCube = new RubiksCube(true);
    rubiksCube.bottomRotate(true);
    expect(rubiksCube.cube).deep.equal(cubes.bottomRotatedAntiClockwise);
  });
});

describe("Rotate Left", () => {
  it("should rotate clockwise correctly", () => {
    const rubiksCube = new RubiksCube(true);
    rubiksCube.leftRotate(false);
    expect(rubiksCube.cube).deep.equal(cubes.leftRotatedClockwise);
  });
	
  it("should rotate anti-clockwise correctly", () => {
    const rubiksCube = new RubiksCube(true);
    rubiksCube.leftRotate(true);
    expect(rubiksCube.cube).deep.equal(cubes.leftRotatedAntiClockwise);
  });
});

describe("Rotate Right", () => {
  it("should rotate clockwise correctly", () => {
    const rubiksCube = new RubiksCube(true);
    rubiksCube.rightRotate(false);
    expect(rubiksCube.cube).deep.equal(cubes.rightRotatedClockwise);
  });
	
  it("should rotate anti-clockwise correctly", () => {
    const rubiksCube = new RubiksCube(true);
    rubiksCube.rightRotate(true);
    expect(rubiksCube.cube).deep.equal(cubes.rightRotatedAntiClockwise);
  });
});

describe("Rotate Down", () => {
  it("should rotate clockwise correctly", () => {
    const rubiksCube = new RubiksCube(true);
    rubiksCube.downRotate(false);
    expect(rubiksCube.cube).deep.equal(cubes.downRotatedClockwise);
  });
	
  it("should rotate anti-clockwise correctly", () => {
    const rubiksCube = new RubiksCube(true);
    rubiksCube.downRotate(true);
    expect(rubiksCube.cube).deep.equal(cubes.downRotatedAntiClockwise);
  });
});

describe("Simple Command Execution", () => {
  it("should produce the correct sequence with the following command: [F R]", () => {
    const rubiksCube = new RubiksCube();
		rubiksCube.executeRotations("F R", false);
    expect(rubiksCube.cube).deep.equal(cubes.simpleScrambleOne);
  });

  it("should produce the correct sequence with the following command: [B D']", () => {
    const rubiksCube = new RubiksCube();
		rubiksCube.executeRotations("B D'", false);
    expect(rubiksCube.cube).deep.equal(cubes.simpleScrambleTwo);
  });

  it("should produce the correct sequence with the following command: [F' U B' L]", () => {
    const rubiksCube = new RubiksCube();
		rubiksCube.executeRotations("F' U B' L", false);
    expect(rubiksCube.cube).deep.equal(cubes.simpleScrableThree);
  });
});

describe("Complex Command Execution", () => {
  it("should produce the correct sequence", () => {
    const rubiksCube = new RubiksCube();
		rubiksCube.executeRotations("F R' U B' L D'", true);
    expect(rubiksCube.cube).deep.equal(cubes.scrambledCube);
  });
});
