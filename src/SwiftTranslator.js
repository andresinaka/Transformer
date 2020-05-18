import FontColor from './swift-attributes/FontColor';
import FontAttribute from './swift-attributes/FontAttribute';
import BackgroundColor from './swift-attributes/BackgroundColor';
import UnderlineStyle from './swift-attributes/UnderlineAttribute';
import ParagraphAttribute from './swift-attributes/ParagraphAttribute';

class SwiftTranslator {
  constructor(text, delta) {
    this.text = text;
    this.delta = delta;
  }

  translate() {
    let text = this.text;
    let delta = this.delta;
    let start = 0;
    let attributedString = `let attributedString = NSMutableAttributedString(string: ${JSON.stringify(text)})\n`;

    let ops = delta["ops"];
    for (let index = 0; index < ops.length; index++) { 
      let item = ops[index];
      let itemAttributes = item["attributes"];
      let length = item["insert"].length;
      let attributeName = `attributes${index}`;
      let attributes = this.attributes(itemAttributes);

      let nextItem = this.hasParagraphAttributes(index, ops)
      if(nextItem) {
        let nextItemAttributes = nextItem["attributes"]; 
        let paragraphAttribute = new ParagraphAttribute(nextItemAttributes, index);
        attributedString = attributedString + paragraphAttribute.paragraphStyle() + '\n';
        attributes.push(paragraphAttribute.parse());
      }

      if(attributes.length > 0) {
        attributedString = attributedString + '\n' + this.addAttributes(
          `NSRange(location: ${start}, length: ${length})`,
          attributeName,
          attributes
        );
      }

      start = start + length;
    }

    return attributedString;
  }

  hasParagraphAttributes(index, ops) {
    if((index + 1) < ops.length) {
      let nextItem = ops[index + 1];
      let attributes = nextItem["attributes"];

      if (attributes && "align" in attributes) {
        return nextItem;
      }

      return false;
    }
  }

  attributes(item) {
    return [
      new FontColor(item).parse(),
      new FontAttribute(item).parse(),
      new BackgroundColor(item).parse(),
      new UnderlineStyle(item).parse()
    ].filter(v => v);
  }

  addAttributes(range, attributeName, attributes) {
    if(attributes.length == 0) { return ""; }

    let cocoaAttributes =  
    `let ${attributeName}: [NSAttributedString.Key : Any] = [\n` +
    `   ${attributes.join(",\n   ")}\n` +
    `]\n` +
    `attributedString.addAttributes(${attributeName}, range: ${range})\n`

    return cocoaAttributes;
  }
}

export default SwiftTranslator;
