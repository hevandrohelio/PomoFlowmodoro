import MicroModal from './node_modules/micromodal/dist/micromodal.es.js';

MicroModal.init({
    onClose: ()=>{
        window.dispatchEvent(new CustomEvent("settings-updated"));
    }
});
