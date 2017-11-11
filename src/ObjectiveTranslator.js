import FontColor from './objective-attributes/FontColor';
import FontAttribute from './objective-attributes/FontAttribute';
import BackgroundColor from './objective-attributes/BackgroundColor';
import UnderlineStyle from './objective-attributes/UnderlineAttribute';
import ParagraphAttribute from './objective-attributes/ParagraphAttribute';

class ObjectiveTranslator {
  constructor(text, delta) {
    this.text = text;
    this.delta = delta;
  }

  translate() {
    let text = this.text;
    let delta = this.delta;
    let start = 0;
    let attributedString = `NSMutableAttributedString *attributedString = [[NSMutableAttributedString alloc] initWithString: @${JSON.stringify(text)}];\n`;

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
          `NSMakeRange(${start}, ${length})`,
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
    `NSDictionary <NSAttributedStringKey, id> *${attributeName} = @{\n` +
    `   ${attributes.join(",\n   ")}\n` +
    `};\n` +
    `[attributedString addAttributes:${attributeName} range: ${range}];\n`

    return cocoaAttributes;
  }
}

export default ObjectiveTranslator;
