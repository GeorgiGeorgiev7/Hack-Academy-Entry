# Hack Academy
## Entry Task Solution

```js
const { createHash } = require('crypto')

function sha256(data) {
    return createHash('sha256')
        .update(data)
        .digest('hex')
}

let nonce = -1;
while (!sha256(`hack${++nonce}`).startsWith('00000')) { }

console.log(`${nonce}_${sha256(`hack${nonce}`)}`)
```
This up here is the most basic solution which I used at first just to get the answer to the task and to submit it.
<br>
Then I got inspired to create an app which simulates a basic blockchain
<br>
that people can experiment with and learn how it works with the help of a friendly and easy to use GUI.
<br>
## Block
### "Block" is a project that aims to teach people the very basics about the blockchain technology and how it works
#### It has both front-end and back-end code and users can visit a total of _**3**_ pages:
1. **A page which shows a blockchain run by a single node with the following characteristics:**
 * runs to infinity (or until the server goes off)
 * each block contains 5 fields:
   * timestamp
   * data
   * current hash
   * previous hash
   * nonce
 * adds a new block to the chain approximately each 10 seconds
 > _Read more about each of the block fields at < leave_a_link_later >_
2. **A page which shows a blockchain that:**
 * mines its genesis block when the user initially enters the page (or reloads)
 * mines all the other blocks one by one as user clicks a "Mine ⛏️" button\
\
_The difference between this blockchain and the first one is that\
here the user has all the freedom to write whatever they want in the data field\
and then mine their custom built block by theselves at any time._
3. **A "How It Works" page** where users can read about how the previous two pages actually work and\
understand what is the difference between them (the simple) blockchains and a real one.
<br>
Visit the app at < leave_a_link_later >
