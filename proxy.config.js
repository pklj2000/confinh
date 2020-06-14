const proxy = [
  {
    context: '/confina',
    target: 'http://localhost:80/confina/api',
    "secure": true
  }
];
module.exports = proxy; 