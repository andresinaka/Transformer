import Picker from "quill/ui/picker.js"
import Emitter from 'quill/core/emitter';
import ReactQuill, { Quill, Mixin, Toolbar }  from 'react-quill';

var Snow = Quill.import('themes/snow');
class CustomSnow extends Snow {
  constructor(quill, options) {
    super(quill, options);
  }

  buildPickers(selects, icons) {
    super.buildPickers(selects, icons);

    let newClases = ['ql-underline-style']
    let newSelectors = selects.filter(select => newClases.includes(select.getAttribute('class')));

    let self = this
    newSelectors.forEach(function(select) {
      self.pickers.push(new Picker(select));
    });

    let update = () => {
      this.pickers.forEach(function(picker) {
        picker.update();
      });
    };
    this.quill.on(Emitter.events.EDITOR_CHANGE, update);
  }
}

function fillSelect(select, values, defaultValue = false) {
  values.forEach(function(value) {
    let option = document.createElement('option');
    if (value === defaultValue) {
      option.setAttribute('selected', 'selected');
    } else {
      option.setAttribute('value', value);
    }
    select.appendChild(option);
  });
}

export default CustomSnow;
