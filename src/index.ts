import chalk from "chalk";

export interface IHash {
  [face: string]: string[][];
}

/**
 * rotate a 2d matrix 90 degrees.
 * @param {any[][]} matrix - 2d matrix of any type
 * @param {boolean} inverted - false = clockwise | true = anti-clockwise
 * @author Prashant Yadav - https://learnersbucket.com/examples/algorithms/rotate-matrix-90-degrees-clockwise-and-anti-clockwise/
 */
export const rotateMatrix = (matrix: any[][], inverted: boolean): void => {
  const n = matrix.length - 1;

  for (var i = 0; i < n / 2; i++) {
    for (var j = i; j < n - i; j++) {
      var tmp = matrix[i][j];

      if (inverted) {
        // move values from right to top
        matrix[i][j] = matrix[j][n - i];
        // move values from bottom to right
        matrix[j][n - i] = matrix[n - i][n - j];
        // move values from left to bottom
        matrix[n - i][n - j] = matrix[n - j][i];
        // assign temp to left
        matrix[n - j][i] = tmp;
      } else {
        // move values from left to top
        matrix[i][j] = matrix[n - j][i];
        // move values from top to right
        matrix[n - j][i] = matrix[n - i][n - j];
        // move values from right to bottom
        matrix[n - i][n - j] = matrix[j][n - i];
        // move values from bottom to left
        matrix[j][n - i] = tmp;
      }
    }
  }
};

/**
 * Class that contains the Rubik's Cube matrix and helper functions
 */
class RubiksCube {
  cube: IHash;
  sideLength: number;
  constructor(testing: boolean = false) {
    this.cube = {};
    this.sideLength = 3;
    if (testing) {
      this.createNumbedCube();
    } else {
      this.createCube();
    }
  }

  /**
   * function to create the cube matrix in the starting position
   *
   * contains 6 faces each with a different colour
   *
   * "u" == Upper, "l" == Left, "f" == Front,
   * "r" == Right, "b" == Bottom, "d" == Down
   */
  createCube = () => {
    this.cube["u"] = [
      ["W", "W", "W"],
      ["W", "W", "W"],
      ["W", "W", "W"],
    ];
    this.cube["l"] = [
      ["O", "O", "O"],
      ["O", "O", "O"],
      ["O", "O", "O"],
    ];
    this.cube["f"] = [
      ["G", "G", "G"],
      ["G", "G", "G"],
      ["G", "G", "G"],
    ];
    this.cube["r"] = [
      ["R", "R", "R"],
      ["R", "R", "R"],
      ["R", "R", "R"],
    ];
    this.cube["b"] = [
      ["B", "B", "B"],
      ["B", "B", "B"],
      ["B", "B", "B"],
    ];
    this.cube["d"] = [
      ["Y", "Y", "Y"],
      ["Y", "Y", "Y"],
      ["Y", "Y", "Y"],
    ];
  };

  /**
   * Used for testing that pieces are in the correct place
   */
  createNumbedCube = () => {
    this.cube["u"] = [
      ["1", "2", "3"],
      ["4", "5", "6"],
      ["7", "8", "9"],
    ];
    this.cube["l"] = [
      ["10", "11", "12"],
      ["13", "14", "15"],
      ["16", "17", "18"],
    ];
    this.cube["f"] = [
      ["19", "20", "21"],
      ["22", "23", "24"],
      ["25", "26", "27"],
    ];
    this.cube["r"] = [
      ["28", "29", "30"],
      ["31", "32", "33"],
      ["34", "35", "36"],
    ];
    this.cube["b"] = [
      ["37", "38", "39"],
      ["40", "41", "42"],
      ["43", "44", "45"],
    ];
    this.cube["d"] = [
      ["46", "47", "48"],
      ["49", "50", "51"],
      ["52", "53", "54"],
    ];
  };

  /**
   * function to create a copy of a 2d array
   */
  copy2DArray = (array: string[][]): string[][] =>
    array.map((inner) => inner.slice());

  /**
   * function to create a copy of an array
   */
  copyArray = (array: string[]): string[] => [...array];

  /**
   * function to rotate the front face and update all neighbouring tiles
   */
  frontRotate = (inverted: boolean): void => {
    // rotate the front face
    rotateMatrix(this.cube["f"], inverted);
    // create a row copy of either the upper or down side to be used for the new left tiles
    const newLeft = this.copyArray(
      this.cube[inverted ? "u" : "d"][inverted ? 2 : 0]
    );
    // create a row copy of either the down or upper side to be used for the new right tiles
    const newRight = this.copyArray(
      this.cube[inverted ? "d" : "u"][inverted ? 0 : 2]
    );
    // TODO: figure out an algorithm to do this inplace
    // create a full face copy of either the right or left side
    const newUp = this.copy2DArray(this.cube[inverted ? "r" : "l"]);
    // create a full face copy of either the left or right side
    const newDown = this.copy2DArray(this.cube[inverted ? "l" : "r"]);

    // loop through all affected faces and update the tile values
    for (var i = 0; i < this.sideLength; i++) {
      // update left
      this.cube["l"][i][2] = newLeft[inverted ? 2 - i : i];
      // update right
      this.cube["r"][i][0] = newRight[inverted ? 2 - i : i];
      // update upper
      this.cube["u"][2][i] = newUp[inverted ? i : 2 - i][inverted ? 0 : 2];
      // update down
      this.cube["d"][0][inverted ? 2 - i : i] =
        newDown[2 - i][inverted ? 2 : 0];
    }
  };

  /**
   * function to rotate the right face and update all neighbouring tiles
   */
  rightRotate = (inverted: boolean): void => {
    rotateMatrix(this.cube["r"], inverted);
    const newUpper = this.copy2DArray(this.cube[inverted ? "b" : "f"]);
    const newFront = this.copy2DArray(this.cube[inverted ? "u" : "d"]);
    const newBottom = this.copy2DArray(this.cube[inverted ? "d" : "u"]);
    const newDown = this.copy2DArray(this.cube[inverted ? "f" : "b"]);

    for (var i = 0; i < this.sideLength; i++) {
      // update upper
      this.cube["u"][i][2] = newUpper[inverted ? 2 - i : i][inverted ? 0 : 2];
      // update front
      this.cube["f"][i][2] = newFront[i][2];
      // update bottom
      this.cube["b"][i][0] = newBottom[2 - i][2];
      // update down
      this.cube["d"][i][2] = newDown[inverted ? i : 2 - i][inverted ? 2 : 0];
    }
  };

  /**
   * function to rotate the upper face and update all neighbouring tiles
   */
  upperRotate = (inverted: boolean): void => {
    // rotate face
    rotateMatrix(this.cube["u"], inverted);
    // set left to bottom or front
    const newLeft = this.cube[inverted ? "b" : "f"][0];
    // set front to left or right
    const newFront = this.cube[inverted ? "l" : "r"][0];
    // set right to front or bottom
    const newRight = this.cube[inverted ? "f" : "b"][0];
    // set bottom to right or left
    const newBottom = this.cube[inverted ? "r" : "l"][0];

    // update left
    this.cube["l"][0] = newLeft;
    // update front
    this.cube["f"][0] = newFront;
    // update right
    this.cube["r"][0] = newRight;
    // update bottom
    this.cube["b"][0] = newBottom;
  };

  /**
   * function to rotate bottom face and update all neighbouring tiles
   */
  bottomRotate = (inverted: boolean): void => {
    rotateMatrix(this.cube["b"], inverted);
    const newLeft = this.copy2DArray(this.cube[inverted ? "d" : "u"]);
    const newRight = this.copy2DArray(this.cube[inverted ? "u" : "d"]);
    const newUpper = this.copy2DArray(this.cube[inverted ? "l" : "r"]);
    const newDown = this.copy2DArray(this.cube[inverted ? "r" : "l"]);

    for (var i = 0; i < this.sideLength; i++) {
      // update left
      this.cube["l"][i][0] = newLeft[inverted ? 2 : 0][inverted ? i : 2 - i];
      // update right
      this.cube["r"][i][2] = newRight[inverted ? 0 : 2][inverted ? i : 2 - i];
      // update upper
      this.cube["u"][0][i] = newUpper[inverted ? 2 - i : i][inverted ? 0 : 2];
      // update down
      this.cube["d"][2][i] = newDown[inverted ? 2 - i : i][inverted ? 2 : 0];
    }
  };

  /**
   * function to rotate the left face and update all neighbouring tiles
   */
  leftRotate = (inverted: boolean): void => {
    rotateMatrix(this.cube["l"], inverted);
    const newUpper = this.copy2DArray(this.cube[inverted ? "f" : "b"]);
    const newFront = this.copy2DArray(this.cube[inverted ? "d" : "u"]);
    const newBottom = this.copy2DArray(this.cube[inverted ? "u" : "d"]);
    const newDown = this.copy2DArray(this.cube[inverted ? "b" : "f"]);

    for (var i = 0; i < this.sideLength; i++) {
      // update upper
      this.cube["u"][i][0] = newUpper[inverted ? i : 2 - i][inverted ? 0 : 2];
      // update front
      this.cube["f"][i][0] = newFront[i][0];
      // update bottom
      this.cube["b"][i][2] = newBottom[2 - i][0];
      // update down
      this.cube["d"][i][0] = newDown[inverted ? 2 - i : i][inverted ? 2 : 0];
    }
  };

  /**
   * function to rotate the down face and update all neighbouring tiles
   */
  downRotate = (inverted: boolean): void => {
    rotateMatrix(this.cube["d"], inverted);
    // set left to bottom or front
    const newLeft = this.cube[inverted ? "f" : "b"][2];
    // set front to left or right
    const newFront = this.cube[inverted ? "r" : "l"][2];
    // set right to front or bottom
    const newRight = this.cube[inverted ? "b" : "f"][2];
    // set bottom to right or left
    const newBottom = this.cube[inverted ? "l" : "r"][2];

    // update left
    this.cube["l"][2] = newLeft;
    // update front
    this.cube["f"][2] = newFront;
    // update right
    this.cube["r"][2] = newRight;
    // update bottom
    this.cube["b"][2] = newBottom;
  };

  /**
   * helper function to transform a character into a coloured block using chalk
   * @returns {string} coloured block
   */
  getColour = (character: string): string => {
    switch (character) {
      case "W":
        return chalk.hex("#FFFFFF")("██"); // white
      case "O":
        return chalk.hex("#FFA500")("██"); // orange
      case "G":
        return chalk.hex("#00FF00")("██"); // green
      case "R":
        return chalk.hex("#FF0000")("██"); // red
      case "B":
        return chalk.hex("#0044FF")("██"); // blue
      case "Y":
        return chalk.hex("#FFFF00")("██"); // yellow
    }

    // unknown character found
    return chalk.white("?");
  };

  /**
   * helper function to print the splayed cube into the console
   * TODO: clean up this code to potentially only use 1 set of loops
   */
  printCube = () => {
    const faces = ["l", "f", "r", "b"];
    const up = this.cube["u"];
    const down = this.cube["d"];

    for (var i = 0; i < up.length; i++) {
      const colours = [];
      for (var j = 0; j < up[i].length; j++) {
        colours.push(this.getColour(up[i][j]));
      }
      console.log(`        |${colours.join("")}|`);
    }
    console.log(`         ------`);

    for (var i = 0; i < this.sideLength; i++) {
      var row = "";
      for (var face of faces) {
        const cubeFace = this.cube[face];
        row += `|${cubeFace[i].map(this.getColour).join("")}|`;
      }
      console.log(row);
    }

    console.log(`         ------`);
    for (var i = 0; i < down.length; i++) {
      const colours = [];
      for (var j = 0; j < down[i].length; j++) {
        colours.push(this.getColour(down[i][j]));
      }
      console.log(`        |${colours.join("")}|`);
    }
  };

  /**
   * helper function to excute a set of rotations based on a string of commands
   * @example inputCommand: "F R' U B' L D'"
   */
  executeRotations = (inputCommand: string, showSteps: boolean): void => {
    console.log(`Running Command: ${inputCommand}`);
    // split the command string into individual rotations
    const spl = inputCommand.toUpperCase().split(" ");

    for (var i = 0; i < spl.length; i++) {
      // get the command character
      const command = spl[i][0];
      // check if the rotation is to be inverted
      const inverted = spl[i][1] != null;

      // perform the correct rotation based on the command
      switch (command) {
        case "F":
          this.frontRotate(inverted);
          break;
        case "R":
          this.rightRotate(inverted);
          break;
        case "U":
          this.upperRotate(inverted);
          break;
        case "B":
          this.bottomRotate(inverted);
          break;
        case "L":
          this.leftRotate(inverted);
          break;
        case "D":
          this.downRotate(inverted);
          break;
        default:
          throw new SyntaxError("Invalid command string");
      }

      // if debugging, it might be useful to print the individual steps
      if (showSteps) {
        console.log(`Current Command: ${spl[i]}`);
        this.printCube();
      }
    }
  };
}

export default RubiksCube;
