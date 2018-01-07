import ReactQuill, { Quill, Mixin, Toolbar } from 'react-quill';

let Parchment = Quill.import('parchment')

class UnderlineStyle extends Parchment.Attributor.Class {}

var underlineStyle = new UnderlineStyle('underline', 'underline', {
  scope: Parchment.Scope.INLINE, 
  whitelist: [
    "style-none",
    "style-single",
    "style-thick",
    "style-double",
    "pattern-dot",
    "pattern-dash"
  ]
});

export default underlineStyle;
