export const problems = [
  {
    problemId: 'cc',
    name: 'Clock Conversion',
    description:
      'Given the time in 24-hour format, output the equivalent time in 12-hour format.\n24-hour format divides the day into 24 hours from 00 to 23, each of which has 60 minutes from 00 to 59\n12-hour format divides the day into two halves: the first half is AM, and the second half is PM. In each half, the hours are numbered in the order 12,01,02,03,…,11. Each hour has 60 minutes numbered from 00 to 59.',
    inputformat:
      'The first line contains a single integer t (1≤t≤1440) — the number of test cases. \nThe only line of each test case contains a string s of length 5 with format hh:mm representing a valid time in the 24-hour format. hh represents the hour from 00 to 23, and mm represents the minute from 00 to 59.\nThe input will always be a valid time in 24-hour format.',
    outputformat:
      "For each test case, output two strings separated by a space ('hh:mm AM' or 'hh:mm PM'), which are the 12-hour equivalent to the time provided in the test case (without quotes).You should output the time exactly as indicated; in particular, you should not remove leading zeroes.",
    constraint: ' (1≤t≤1440)',
    input: '6\n09:41\n18:06\n12:14\n00:59\n00:00\n14:34',
    output: '09:41 AM\n06:06 PM\n12:14 PM\n12:59 AM\n12:00 AM\n02:34 PM',
    explanation: 'Self Explanatory',
    difficulty: 'Easy',
    testInput:
      '50\n21:37\n10:49\n16:06\n02:08\n05:44\n07:33\n22:09\n00:10\n16:02\n18:31\n04:59\n13:04\n21:45\n07:21\n00:13\n01:18\n18:33\n20:33\n05:42\n16:56\n09:07\n22:26\n19:08\n00:14\n00:33\n23:02\n23:44\n14:08\n06:23\n23:13\n23:16\n09:40\n21:21\n13:05\n14:37\n16:11\n15:59\n17:29\n08:39\n20:07\n12:22\n07:29\n18:46\n13:56\n16:19\n03:46\n02:51\n13:58\n05:35\n00:58',
    testOutput:
      '09:37 PM\n10:49 AM\n04:06 PM\n02:08 AM\n05:44 AM\n07:33 AM\n10:09 PM\n12:10 AM\n04:02 PM\n06:31 PM\n04:59 AM\n01:04 PM\n09:45 PM\n07:21 AM\n12:13 AM\n01:18 AM\n06:33 PM\n08:33 PM\n05:42 AM\n04:56 PM\n09:07 AM\n10:26 PM\n07:08 PM\n12:14 AM\n12:33 AM\n11:02 PM\n11:44 PM\n02:08 PM\n06:23 AM\n11:13 PM\n11:16 PM\n09:40 AM\n09:21 PM\n01:05 PM\n02:37 PM\n04:11 PM\n03:59 PM\n05:29 PM\n08:39 AM\n08:07 PM\n12:22 PM\n07:29 AM\n06:46 PM\n01:56 PM\n04:19 PM\n03:46 AM\n02:51 AM\n01:58 PM\n05:35 AM\n12:58 AM',
    bestCode:
      '#include<bits/stdc++.h> using namespace std; int main(){ int test; cin>>test; while(test--){ string s; cin>>s; int h1= s[0]-`0`; int h2= s[1]-`0`; int m1= s[3]-`0`; int m2=s[4]-`0`; int hour = h1*10+h2; int min = m1*10+m2; int thour,tmin=min; string t; hour>12 ? thour = hour-12: thour = hour; hour<12 ? t="AM" : t="PM"; if(thour==0) thour=12; if(thour<10 && tmin<10) cout<<"0"<<thour<<":"<<"0"<<tmin<<" "<<t<<endl; else if(thour<10) cout<<"0"<<thour<<":"<<tmin<<" "<<t<<endl; else if(tmin<10) cout<<thour<<":"<<"0"<<tmin<<" "<<t<<endl; else cout<<thour<<":"<<tmin<<" "<<t<<endl; } }',
  },
  {
    problemId: 'csb',
    name: 'Count Set Bits',
    description:
      'Given a positive integer n, count the total number of set bits in binary representation of all numbers from 1 to n, inclusive.',
    inputformat:
      'The first line of input contains T - the number of test cases. It is followed by T lines, each line contains a single integer N.',
    outputformat:
      'For each test case, print the number of bits set to 1 in the binary representation of N, separated by a new line.',
    constraint: '1 ≤ T ≤ 10000\n1 ≤ N ≤ 10^18',
    input: '3\n4\n15\n10',
    output: '1\n4\n2',
    explanation: 'Self Explanatory',
    difficulty: 'Medium',
    testInput:
      '50\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n21\n22\n23\n24\n25\n26\n27\n28\n29\n30\n31\n32\n33\n34\n35\n36\n37\n38\n39\n40\n41\n42\n43\n44\n45\n46\n47\n48\n49\n50',
    testOutput:
      '1\n1\n2\n1\n2\n2\n3\n1\n2\n2\n3\n2\n3\n3\n4\n1\n2\n2\n3\n2\n3\n3\n4\n2\n3\n3\n4\n3\n4\n4\n5\n1\n2\n2\n3\n2\n3\n3\n4\n2\n3\n3\n4\n3\n4\n4\n5',
    bestCode:
      '#include<bits/stdc++.h> using namespace std; int main(){ int test; cin>>test; while(test--){ int n; cin>>n; int count=0; for(int i=1;i<=n;i++){ int x=i; while(x>0){ x=x&(x-1); count++; } } cout<<count<<endl; } }',
  },
  {
    problemId: 'bp',
    name: 'Balanced Parentheses',
    description:
      'Write a program to generate all possible strings with balanced parentheses having N pairs of curly braces.',
    inputformat:
      'The first line of input contains T - the number of test cases. It is followed by T lines, each line contains a single integer N.',
    outputformat:
      'For each test case, print all possible strings with balanced parentheses having N pairs of curly braces, separated by a new line.',
    constraint: '1 ≤ T ≤ 10\n1 ≤ N ≤ 10',
    input: '2\n3\n2',
    output: '#1\n{{{}}}\n{{}{}}\n{{}}{}\n{}{{}}\n{}{}{}#2{{}}\n{}{}\n',
    explanation: 'Self Explanatory',
    difficulty: 'Hard',
    testInput: '5\n1\n2\n3\n4\n5',
    testOutput:
      '#1\n{}#2\n{{}}\n{}{}\n#3\n{{}{}}\n{{}}{}\n{}{{}}\n{}{}{}\n#4\n{{{{}}}}\n{{}{}}{}\n{{}}{}{}\n{}{{}}{}\n{}{}{}{}\n#5\n{{{{}{}}}}\n{{{{}}}}{}\n{{}{}}{}{}\n{{}}{}{}{}\n{}{{}}{}{}\n{}{}{}{}{}',
    bestCode:
      '#include<bits/stdc++.h> using namespace std; void solve(int n, int open, int close, string op, vector<string> &v){ if(open==n && close==n){ v.push_back(op); return; } if(open<n) solve(n,open+1,close,op+"{",v); if(close<open) solve(n,open,close+1,op+"}",v); } int main(){ int test; cin>>test; while(test--){ int n; cin>>n; vector<string> v; solve(n,0,0,"",v); for(auto x:v) cout<<x<<endl; } }',
  },
  {
    problemId: 'ca',
    name: 'Counting Anagrams',
    description:
      'Given 2 strings, check if they are anagrams. An anagram is a rearrangement of the letters of one word to form another word. In other words, some permutations of string A must be the same as string B.',
    inputformat:
      "The first line of input contains T - the number of test cases. It's followed by T lines, each line containing 2 space-separated strings.",
    outputformat: 'For each test case, print True/False, separated by a new line.',
    constraint: "1 ≤ T ≤ 100\n1<=len(S)<=10^5\n'a'<=S[i]<='z'",
    input: '4\niamlordvoldemort tommarvoloriddle\nb h\nstop post\nhi hey',
    output: 'True\nFalse\nTrue\nFalse',
    explanation: 'Self Explanatory',
    difficulty: 'Easy',
    testInput: '5\niamlordvoldemort tommarvoloriddle\nb h\nstop post\nhi hey\nhello world world hello',
    testOutput: 'True\nFalse\nTrue\nFalse\nTrue',
    bestCode:
      '#include<bits/stdc++.h> using namespace std; int main(){ int test; cin>>test; while(test--){ string s1,s2; cin>>s1>>s2; sort(s1.begin(),s1.end()); sort(s2.begin(),s2.end()); if(s1==s2) cout<<"True"<<endl; else cout<<"False"<<endl; } }',
  },
  {
    problemId: 'bdo',
    name: 'Ballon d Or',
    description:
      "Leo has already won the Ballon d'Or 8 times, so he is really impressed with it (is he?).\nLeo has an array 𝐴 A containing 𝑁 N integers. Each element of this array is either 1 1 or 2 2.\nHe wants to figure out if the product of all the elements of the array can be written as an 8-th power of some integer, i.e, 𝑘^8 for some integer 𝑘.",
    inputformat:
      'The first line contains a single integer 𝑇 T (1≤𝑇≤100) — the number of test cases.\nEach test case consists of two lines. The first line contains a single integer 𝑁 N (1≤𝑁≤100) — the number of elements in the array 𝐴 A.\nThe second line contains 𝑁 N integers 𝑎1,𝑎2,…,𝑎𝑁 (1≤𝑎𝑖≤2) — the elements of the array 𝐴 A.',
    outputformat:
      'For each test case, output on a separate line:\nYES if the product of all elements of the array can be written as 𝑘^8 for some integer 𝑘;\nNO otherwise.',
    constraint: '1≤𝑇≤100\n1≤𝑁≤2 * 10^5\n1≤𝑎𝑖≤2',
    input: '2\n1\n2\n9\n2 2 2 2 1 2 2 2 2',
    output: 'NO\nYES',
    explaination:
      'In the first test case, the product of all elements of the array is 2, which cannot be written as 𝑘^8 for any integer 𝑘.\nIn the second test case, the product of all elements of the array is 256, which is equal to 2^8.',
    difficulty: 'Medium',
    testInput: '2\n1\n2\n9\n2 2 2 2 1 2 2 2 2',
    testOutput: 'NO\nYES',
    bestCode:
      '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    int t;\n    cin >> t;\n    while(t--) {\n        int n;\n        cin >> n;\n        vector<int> ar(n);\n        int t = 0;\n        for(int i = 0; i < n; i++) {\n            cin >> ar[i];\n            if(ar[i] == 2) t++;\n        }\n        if(t % 8 == 0) cout << "YES" << endl;\n        else cout << "NO" << endl;\n    }\n}',
  },
  {
    problemId: 'ri',
    name: 'Reverse Integer',
    description: 'Given a 32-bit signed integer, reverse digits of an integer.',
    inputformat:
      'The first line of input contains T - the number of test cases. It is followed by T lines, each line contains a single integer N.',
    outputformat: 'For each test case, print the reversed integer, separated by a new line.',
    constraint: '-2^31 <= x <= 2^31 - 1',
    input: '4\n69\n-123\n420\n9658',
    output: '96\n-321\n24\n8569',
    explanation: 'Self Explanatory',
    difficulty: 'Medium',
    testInput: '5\n69\n-123\n420\n9658\n-123456789',
    testOutput: '96\n-321\n24\n8569\n-987654321',
    bestCode:
      '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    int t;\n    cin >> t;\n    while(t--) {\n        int n;\n        cin >> n;\n        long long int ans = 0;\n        while(n) {\n            ans = ans * 10 + n % 10;\n            n /= 10;\n        }\n        if(ans > INT_MAX || ans < INT_MIN) cout << 0 << endl;\n        else cout << ans << endl;\n    }\n}',
  },
  {
    problemId: 'ts',
    name: 'Two Sum',
    description:
      'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    inputformat:
      'The first line of input contains T - the number of test cases. It is followed by 3*T lines, each test case contains a single integer N, the number of elements in the array, the target integer, The next line contains N space-separated integers.',
    outputformat:
      'For each test case, print the indices of the two numbers such that they add up to target, separated by a new line.',
    constraint:
      '2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9\nOnly one valid answer exists.',
    input: '2\n4\n9\n2 7 11 15\n3\n6\n3 2 4',
    output: '0 1\n1 2',
    explanation: 'Self Explanatory',
    difficulty: 'Easy',
    testInput:
      '8\n4\n9\n2 7 11 15\n3\n6\n3 2 4\n4\n5\n1 2 3 4\n3\n6\n3 3 3\n4\n8\n1 2 3 4\n3\n6\n3 2 4\n4\n5\n1 2 3 4\n3\n6\n3 3 3',
    testOutput: '0 1\n1 2\n0 1\n0 1\n0 3\n1 2\n1 2\n0 1',
    bestCode:
      '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    int t;\n    cin >> t;\n    while(t--) {\n        int n, target;\n        cin >> n >> target;\n        vector<int> ar(n);\n        for(int i = 0; i < n; i++) cin >> ar[i];\n        unordered_map<int, int> mp;\n        for(int i = 0; i < n; i++) {\n            if(mp.find(target - ar[i]) != mp.end()) {\n                cout << mp[target - ar[i]] << " " << i << endl;\n                break;\n            }\n            mp[ar[i]] = i;\n        }\n    }\n}',
  },
  {
    problemId: 'ms',
    name: 'Merge Sorted Array',
    description:
      'You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.\nMerge nums1 and nums2 into a single array sorted in non-decreasing order.',
    inputformat:
      'The first line of input contains T - the number of test cases. It is followed by 3*T lines, each test case contains a single integer m, the number of elements in the first array, n, the number of elements in the second array, The next line contains m space-separated integers, followed by n space-separated integers.',
    outputformat: 'For each test case, print the merged array sorted in non-decreasing order, separated by a new line.',
    constraint: '0 <= m, n <= 200\n1 <= m + n <= 200\n-10^9 <= nums1[i], nums2[i] <= 10^9',
    input: '2\n3 3\n1 2 3\n2 5 6\n6 4\n5 8 99 100 101 102\n56 477 2222 61651',
    output: '1 2 2 3 5 6\n5 8 56 99 100 101 102 477 2222 61651',
    explanation: 'Self Explanatory',
    difficulty: 'Medium',
    testInput:
      '3\n4 8\n12 14 18 33\n1234 5457 6211 6511 49944 50002 89456 99999\n3 3\n89 899 5610\n984894 9494849 10894984\n6 4\n5 8 99 100 101 102\n56 477 2222 61651',
    testOutput:
      '12 14 18 33 1234 5457 6211 6511 49944 50002 89456 99999\n89 899 5610 984894 9494849 10894984\n5 8 56 99 100 101 102 477 2222 61651',
    bestCode:
      '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    int t;\n    cin >> t;\n    while(t--) {\n        int m, n;\n        cin >> m >> n;\n        vector<int> ar1(m), ar2(n);\n        for(int i = 0; i < m; i++) cin >> ar1[i];\n        for(int i = 0; i < n; i++) cin >> ar2[i];\n        vector<int> ans;\n        int i = 0, j = 0;\n        while(i < m && j < n) {\n            if(ar1[i] < ar2[j]) ans.push_back(ar1[i++]);\n            else ans.push_back(ar2[j++]);\n        }\n        while(i < m) ans.push_back(ar1[i++]);\n        while(j < n) ans.push_back(ar2[j++]);\n        for(auto x: ans) cout << x << " ";\n        cout << endl;\n    }\n}',
  },
  {
    problemId: 'pn',
    name: 'Palindrome Number',
    description:
      'Given an integer x, return true if x is a palindrome integer.\nAn integer is a palindrome when it reads the same backward as forward. For example, 121 is palindrome while 123 is not.',
    inputformat:
      'The first line of input contains T - the number of test cases. It is followed by T lines, each line contains a single integer N.',
    outputformat: 'For each test case, print True/False, separated by a new line.',
    constraint: '-2^31 <= x <= 2^31 - 1',
    input: '4\n121\n-121\n10\n-101',
    output: 'True\nFalse\nFalse\nFalse',
    explanation: 'Self Explanatory',
    difficulty: 'Easy',
    testInput: '5\n121\n-121\n10\n-101\n12321',
    testOutput: 'True\nFalse\nFalse\nFalse\nTrue',
    bestCode:
      '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    int t;\n    cin >> t;\n    while(t--) {\n        int n;\n        cin >> n;\n        if(n < 0) {\n            cout << "False" << endl;\n            continue;\n        }\n        int temp = n, rev = 0;\n        while(temp) {\n            rev = rev * 10 + temp % 10;\n            temp /= 10;\n        }\n        if(rev == n) cout << "True" << endl;\n        else cout << "False" << endl;\n    }\n}',
  },
  {
    problemId: 'rm',
    name: 'Remove Duplicates from Sorted Array',
    description:
      'Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same.',
    inputformat:
      'The first line of input contains T - the number of test cases. It is followed by 2*T lines, each test case contains a single integer N, the number of elements in the array, The next line contains N space-separated integers.',
    outputformat: 'For each test case, print the array after removing duplicates, separated by a new line.',
    constraint: '0 <= nums.length <= 3 * 10^4\n-10^4 <= nums[i] <= 10^4\nnums is sorted in non-decreasing order.',
    input: '2\n6\n1 1 2 2 3 3\n4\n1 1 2 3',
    output: '1 2 3\n1 2 3',
    explanation: 'Self Explanatory',
    difficulty: 'Easy',
    testInput: '3\n6\n1 1 2 2 3 3\n4\n1 1 2 3\n5\n1 2 2 3 3',
    testOutput: '1 2 3\n1 2 3\n1 2 3',
    bestCode:
      '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    int t;\n    cin >> t;\n    while(t--) {\n        int n;\n        cin >> n;\n        vector<int> ar(n);\n        for(int i = 0; i < n; i++) cin >> ar[i];\n        ar.erase(unique(ar.begin(), ar.end()), ar.end());\n        for(auto x: ar) cout << x << " ";\n        cout << endl;\n    }\n}',
  },
];
