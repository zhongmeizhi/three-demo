import './styles/base.less';

import Main from '@/js/main.js';
import NMCube from '@/js/nm_cube';

console.log(VERSION, NODE_ENV)

const main = new Main();
main.init();

const nmCube = new NMCube(main);
nmCube.init();
nmCube.runAnimate();
