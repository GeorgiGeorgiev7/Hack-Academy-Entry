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
1. **A hash page** where users:
 * can test and learning how hashing works with sha256 cryptographic algorithm
2. **A page which shows a single block where:**
 * user can experiment and learn what fields does a single block include
 * mines the block as user clicks a "Mine ⛏️" button and saves current and previous block hash
3. **A page which shows a blockchain that mines dummy transactions on user click:**
 * each block contains 5 fields:
   * timestamp
   * data
   * current hash
   * previous hash
   * nonce
<br>
Visit the app at https://hack-academy-block.web.app/
