import Attribute from './Attribute';

class FontAttribute extends Attribute {
  parse() {
    let attributes = this.attributes
    if (attributes && "font" in attributes && "size" in attributes) {
      let fontName = attributes["font"];
      let fontSize = attributes["size"].replace("px", "");

      let font = `UIFont(name: "${fontName}", size: ${fontSize})`;
      return `NSAttributedStringKey.font: ${font}`;
    }
  }
}

export default FontAttribute;
