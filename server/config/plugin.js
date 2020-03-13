'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }

  //开启mysql
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  //解决跨域问题
  cors: {
    enable: true,
    package: 'egg-cors',
  }
};



