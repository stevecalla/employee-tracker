const { getWhatToDo } = require('./dist/js/app');
const { banner } = require('./dist/js/banner');

let main = () => {
  console.log(banner);
  getWhatToDo();
};

main();

