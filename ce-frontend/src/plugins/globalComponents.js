import {
  Button,
  Checkbox,
  Radio,
  FormGroupInput,
  Slider,
  Switch,
  Parallax,
  ContentLoading,
  Modal
} from '@/components';
/**
 * You can register global components here
 */

const globalComponents = {
  install(Vue) {
    Vue.component(Parallax.name, Parallax);
    Vue.component(Button.name, Button);
    Vue.component(Checkbox.name, Checkbox);
    Vue.component(Radio.name, Radio);
    Vue.component(FormGroupInput.name, FormGroupInput);
    Vue.component(Slider.name, Slider);
    Vue.component(Switch.name, Switch);
    Vue.component(ContentLoading.name, ContentLoading);
    Vue.component(Modal.name, Modal);
  }
};

export default globalComponents;
