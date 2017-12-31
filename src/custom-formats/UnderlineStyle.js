import ReactQuill, { Quill, Mixin, Toolbar } from 'react-quill';

let Parchment = Quill.import('parchment')

class UnderlineStyle extends Parchment.Attributor.Class {
  add (node, value) {
    if (value === ".styleNone") {
      this.remove(node)
      return true
    } else {
      return super.add(node, value)
    }
  }
}

var underlineStyle = new UnderlineStyle('underline', 'underline', {
  scope: Parchment.Scope.INLINE, 
  whitelist: [
    false,
    "style-single",
    "style-thick",
    "style-double",
    "pattern-dot",
    "pattern-dash"
  ]
});

export default underlineStyle;
