import ReactQuill, { Quill, Mixin, Toolbar }  from 'react-quill';

let Inline = Quill.import('blots/inline');

class UnderlineStyle extends Inline {
  static create(underlineStyle) {
    this.whitelist = [
      "style-single",
      "style-thick",
      "style-double",
      "pattern-dot",
      "pattern-dash"
    ];

    let node = super.create();
    node.setAttribute('class', underlineStyle);
    return node;
  }

  static formats(node) {
    let theClass = node.getAttribute('class');

    if(this.whitelist.indexOf(theClass) > -1) {
      return theClass
    } else { 
      return null
    }
  }
}
UnderlineStyle.blotName = 'underline-style';
UnderlineStyle.tagName = 'u';

export default UnderlineStyle;
