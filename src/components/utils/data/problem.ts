const problems = [
  {
    question_id: 1,
    question_title_slug: 'two-sum',
    question_title: 'Two Sum',
    difficulty: 'Easy',
    topics: ['Array', 'Hash Table'],
    description:
      'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order',

    testCases: [
      {
        input: {
          nums: [2, 7, 11, 15],
          target: 9,
        },
        expectedOutput: [0, 1],
      },
      {
        input: {
          nums: [3, 2, 4],
          target: 6,
        },
        expectedOutput: [1, 2],
      },
      {
        input: {
          nums: [3, 3],
          target: 6,
        },
        expectedOutput: [0, 1],
      },
    ],
    constraints: [
      '2 <= nums.length <= 10^4, 10^9 <= nums[i] <= 10^9, 10^9 <= target <= 10^9, Only one valid answer exists.',
    ],
    content: `Given an array of integers, return <strong>indices</strong> of the two numbers such that they add up to a specific target.</p>
<p>You may assume that each input would have <strong><em>exactly</em></strong> one solution, and you may not use the <em>same</em> element twice.</p>
<p><strong>Example:</strong></p>
<pre>Given nums = [2, 7, 11, 15], target = 9,

Because nums[<strong>0</strong>] + nums[<strong>1</strong>] = 2 + 7 = 9,
return [<strong>0</strong>, <strong>1</strong>].
</pre>`,
  },
  {
    question_id: 2,
    question_title_slug: 'reverse-integer',
    question_title: 'Reverse Integer',
    difficulty: 'Medium',
    topics: ['Math'],
    description:
      'Given a signed 32-bit integer x, return x with its digits reversed.\n If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.\nAssume the environment does not allow you to store 64-bit integers (signed or unsigned)',
    testCases: [
      {
        input: '123',
        expectedOutput: '321',
      },
      {
        input: '-123',
        expectedOutput: '-321',
      },
      {
        input: '120',
        expectedOutput: '21',
      },
    ],
    constraints: ['-231 <= x <= 231 - 1'],
    content: `<div><p>Given a 32-bit signed integer, reverse digits of an integer.</p>
<p><strong>Example 1:</strong></p>
<pre><strong>Input:</strong> 123
<strong>Output:</strong> 321
</pre>
<p><strong>Example 2:</strong></p>
<pre><strong>Input:</strong> -123
<strong>Output:</strong> -321
</pre>
<p><strong>Example 3:</strong></p>
<pre><strong>Input:</strong> 120
<strong>Output:</strong> 21
</pre>
<p><strong>Note:</strong><br/>
Assume we are dealing with an environment which could only store integers within the 32-bit signed integer range: [−2<sup>31</sup>,  2<sup>31 </sup>− 1]. For the purpose of this problem, assume that your function returns 0 when the reversed integer overflows.</p>`,
  },
  {
    question_id: 3,
    question_title_slug: 'palindrome-number',
    question_title: 'Palindrome Number',
    difficulty: 'Easy',
    topics: ['Math'],
    description: `Given an integer x, return true if x is palindrome integer. An integer is a palindrome when it reads the same backward as forward. For example, 121 is palindrome while 123 is not.`,
    testCases: [
      {
        input: 121,
        expectedOutput: true,
      },
      {
        input: -121,
        expectedOutput: false,
      },
      {
        input: 10,
        expectedOutput: false,
      },
    ],
    constraints: ['-231 <= x <= 231 - 1'],
    content: `<div><p>Determine whether an integer is a palindrome. An integer is a palindrome when it reads the same backward as forward.</p>
<p><strong>Example 1:</strong></p>
<pre><strong>Input:</strong> 121
<strong>Output:</strong> true
</pre>
<p><strong>Example 2:</strong></p>
<pre><strong>Input:</strong> -121
<strong>Output:</strong> false
<strong>Explanation:</strong> From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.
</pre>
<p><strong>Example 3:</strong></p>
<pre><strong>Input:</strong> 10
<strong>Output:</strong> false
<strong>Explanation:</strong> Reads 01 from right to left. Therefore it is not a palindrome.
</pre>
<p><strong>Follow up:</strong></p>
<p>Coud you solve it without converting the integer to a string?</p>`,
  },
  {
    question_id: 4,
    question_title_slug: 'valid-parantheses',
    question_title: 'Valid Parantheses',
    difficulty: 'Easy',
    topics: ['String', 'Stack'],
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
An input string is valid if: Open brackets must be closed by the same type of brackets. Open brackets must be closed in the correct order.`,
    testCases: [
      {
        input: '()',
        expectedOutput: true,
      },
      {
        input: '()[]{}',
        expectedOutput: true,
      },
      {
        input: '(]',
        expectedOutput: false,
      },
    ],
    constraints: [
      '1 <= s.length <= 10^4',
      "s consists of parentheses only '()[]{}'",
    ],
    content: `
      <div><p>Given a string containing just the characters <code>'('</code>, <code>')'</code>, <code>'{'</code>, <code>'}'</code>, <code>'['</code> and <code>']'</code>, determine if the input string is valid.</p>
<p>An input string is valid if:</p>
<ol>
<li>Open brackets must be closed by the same type of brackets.</li>
<li>Open brackets must be closed in the correct order.</li>
</ol>
<p>Note that an empty string is also considered valid.</p>
<p><strong>Example 1:</strong></p>
<pre><strong>Input:</strong> "()"
<strong>Output:</strong> true
</pre>
<p><strong>Example 2:</strong></p>
<pre><strong>Input:</strong> "()[]{}"
<strong>Output:</strong> true
</pre>
<p><strong>Example 3:</strong></p>
<pre><strong>Input:</strong> "(]"
<strong>Output:</strong> false
</pre>
<p><strong>Example 4:</strong></p>
<pre><strong>Input:</strong> "([)]"
<strong>Output:</strong> false
</pre>
<p><strong>Example 5:</strong></p>
<pre><strong>Input:</strong> "{[]}"
<strong>Output:</strong> true
</pre>
    `,
  },
  {
    question_id: 5,
    question_title_slug: 'longest-common-prefix',
    question_title: 'Longest Common Prefix',
    difficulty: 'Easy',
    topics: ['String', 'Trie'],
    description: `Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string ""
    `,
    testCases: [
      {
        input: ['flower', 'flow', 'flight'],
        expectedOutput: 'fl',
      },

      {
        input: ['dog', 'racecar', 'car'],
        expectedOutput: '',
      },
    ],
    constraints: [
      '1 <= strs.length <= 200',
      '0 <= strs[i].length <= 200',
      'strs[i] consists of only lowercase English letters',
    ],
    content: `
      <div><p>Write a function to find the longest common prefix string amongst an array of strings.</p>
<p>If there is no common prefix, return an empty string <code>""</code>.</p>
<p><strong>Example 1:</strong></p>
<pre><strong>Input: </strong>["flower","flow","flight"]
<strong>Output:</strong> "fl"
</pre>
<p><strong>Example 2:</strong></p>
<pre><strong>Input: </strong>["dog","racecar","car"]
<strong>Output:</strong> ""
<strong>Explanation:</strong> There is no common prefix among the input strings.
</pre>
<p><strong>Note:</strong></p>
<p>All given inputs are in lowercase letters <code>a-z</code>.</p>
    
    `,
  },
  {
    question_id: 6,
    question_title_slug: 'maximum-subarray',
    question_title: 'Maximum Subarray',
    difficulty: 'Medium',
    topics: ['Array', 'Binary Search'],
    description: `
     Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum. A subarray is a contiguous part of an array.
    `,
    testCases: [
      {
        input: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
        expectedOutput: 6,
      },
      {
        input: [1],
        expectedOutput: 1,
      },
      {
        input: [5, 4, -1, 7, 8],
        expectedOutput: 23,
      },
    ],
    constraints: ['1 <= nums.length <= 3 * 10^4', '-10^5 <= nums[i] <= 10^5'],
    content: `
      <div><p>Given an integer array <code>nums</code>, find the contiguous subarray (containing at least one number) which has the largest sum and return <em>its sum</em>.</p>
<p>A <strong>subarray</strong> is a <strong>contiguous</strong> part of an array.</p>
<p>&nbsp;</p>
<p><strong>Example 1:</strong></p>
<pre><strong>Input:</strong> nums = [-2,1,-3,4,-1,2,1,-5,4]
<strong>Output:</strong> 6
<strong>Explanation:</strong> [4,-1,2,1] has the largest sum = 6.
</pre>
<p><strong>Example 2:</strong></p>
<pre><strong>Input:</strong> nums = [1]
<strong>Output:</strong> 1
</pre>
<p><strong>Example 3:</strong></p>
<pre><strong>Input:</strong> nums = [5,4,-1,7,8]
<strong>Output:</strong> 23
</pre>
<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>
<ul>
<li><code>1 &lt;= nums.length &lt;= 3 * 10<sup>4</sup></code></li>
<li><code>-10<sup>5</sup> &lt;= nums[i] &lt;= 10<sup>5</sup></code></li>
</ul>
<p>&nbsp;</p>
<p><strong>Follow up:</strong> If you have figured out the <code>O(n)</code> solution, try coding another solution using the <strong>divide and conquer</strong> approach, which is more subtle.</p>
</div>
    `,
  },
];
