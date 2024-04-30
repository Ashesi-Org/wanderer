export const javascriptDefault = `
// Binary search problem
const binarySearchHelper = (arr, target, start, end) => {
 if (start > end) {
   return false;
 }
 let mid = Math.floor((start + end) / 2);
 if (arr[mid] === target) {
   return mid;
 }
 if (arr[mid] < target) {
   return binarySearchHelper(arr, target, mid + 1, end);
 }
 if (arr[mid] > target) {
   return binarySearchHelper(arr, target, start, mid - 1);
 }
};
`;

export const languageOptions = [
  {
    id: 63,
    name: 'JavaScript (Node.js 12.14.0)',
    label: 'JavaScript (Node.js 12.14.0)',
    value: 'javascript',
  },

  {
    id: 71,
    name: 'Python (3.8.1)',
    label: 'Python (3.8.1)',
    value: 'python',
  },

  {
    id: 74,
    name: 'TypeScript (3.7.4)',
    label: 'TypeScript (3.7.4)',
    value: 'typescript',
  },
];
