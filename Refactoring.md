# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here
I've added aditional test cases as follows divided in 3 groups:
1. Invalid Inputs: no inputs, empty object, empty string, empty array, number
2. Incomplete Objects: Object that doesn't have a field called partitionKey
3. Complete Objects: Object that has a partitionKey field

I've created a file called constants.js to set all constants in a single place, and keep the logic separately.

I've replaced an if-else statement by a thernary operator that handles the logic if a string length exceeds max string length for hash. (remove unnecesary if statement)

I've replaced another if-else statement by applying the .toString() method where it's necessary. (remove unnecesary if statement)

I've replaced the whole 'crypto' import statement by only importing the function needed from this library, that way the function doesn't take too much resources when booting. (avoid bloating, efficient memory allocation)

