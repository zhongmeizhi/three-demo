import './styles/base.less';
import Main from '@/js/main.js';
import NMCube from '@/js/mesh/nm_cube.js';
import ParrotModel from '@/js/model/parrot_model.js';


(function init() {
    console.log(VERSION, NODE_ENV)

    const main = new Main();
    main.init();

    const nmCube = new NMCube(main);
    nmCube.init();

    const parrotModel = new ParrotModel(main);
    parrotModel.init();

    function runAnimate() {
        nmCube.animate();
        parrotModel.animate();
        main.animate();
        requestAnimationFrame(runAnimate);
    }

    runAnimate();
})()
