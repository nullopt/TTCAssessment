# TTCAssessment

-----
## Preface
This was a really fun assessment that I genuinely enjoyed figuring out and working on. I even spent a bit more time on it after completing the main functionality to create a console UI and command inputting feature.

## Building and running the code

```sh
# clone the repository
git clone https://github.com/nullopt/TTCAssessment.git

# enter directory
cd ./TTCAssessment

# install npm packages
npm install

# run test cases
npm run test
```

## Insight into decision making

### Techstack
The techstack I chose to work with was `TypeScript` for implementation and `mocha` for testing. I chose TypeScript as it allowed me to quickly mockup what I needed without having to worry too much about syntactic sugar that other languages require. Mocha was used as I have prior experience using it for small commerical utility - it allows the developer to write test cases very close to how you'd `describe` them in english, as well as providing good visualisations.  

### Development style
I worked in a TDD fashion as this task had a lot of test cases and a huge potential for bugs. In all honesty, I haven't been in an environment where TDD was enforced, but to have the ability to utilise it in this project really showed me how beneficial it is to a developer and the outcome of the project.
TDD allowed me to speed up development time as I didn't have to waste time chasing bugs when I could easily see the issues from the segmented test cases I had written.

### Code
After playing around in the emulator for a while, I got an understanding of how the tiles on surrounding faces move, and then after a bit of mental gymnastics, I decided on a 2D matrix for the datastructure. 

> I had researched a few other ways to represent the cube. I had saw that a few people would just use a 54 character string, but I hadfound this difficult to visualise when rotating at the time. I can now see that this would be very efficient in both space and time complexity.  

After creating the structure, I went on to setup my testing environment `./test/tests.ts`. This included individual tests for each of the possible rotations possible as well as the expected permutations of each. With this subset of tests running successfully, I would ensure that the program would be able to run a set of commands.

I then created a function for rotating each of the faces. Each of these functions would rotate the face in question, and then adjust the neighbouring tiles on other faces.

> Since completing this assessment, I would like to go back in the future and clean up the space complexity of the rotations as they use O(N) space for the temporary matrices. But I believe with enough thought, I can do inplace alterations on the neighbouring tiles.

After all my tests were running successfully, it was time to implement the functionality for running a string of commands. I started off small to test the durability of my framework with only `F R` and `B D'`. Both of these commands ran successfully so things were looking good. It was only when I tried running the assessment's command `F R' U B' L D'` that I noticed there were a few issues. I had noticed that my test cases for `L` had invalid expected results and therefore were breaking.  
Without TDD, I could have been searching for a long time in irrelevant areas to try and debug this issue, but instead mocha showed me the flow and where it was breaking.  
After solving `L`, everything was running smoothly.

## Lessons learnt
Although I had done a lot of manual testing and automation testing during my previous role, I never had the opportunity to fully ultilize them in a TDD environment. This has vastly changed my outlook on how I will develop in the future.  
