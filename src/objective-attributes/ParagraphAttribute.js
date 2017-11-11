import Attribute from '../Attribute';

class ParagraphAttribute extends Attribute {

  constructor(attributes, id) {
    super(attributes);
    this.id = id;
    this.paragraphName = `paragraphStyle${id}`;
  }

  paragraphStyle() {
    let attributes = this.attributes;
    if (attributes && "align" in attributes) {
      let alignment = attributes["align"];

      let paragraphStyle = `\nNSMutableParagraphStyle *${this.paragraphName} = [[NSMutableParagraphStyle alloc] init];`
      paragraphStyle = paragraphStyle + `\n${this.paragraphName}.alignment = ${this.valueForAlignment(alignment)};`

      return paragraphStyle
    }
  }

  parse() {
    let attributes = this.attributes;
    if (attributes && "align" in attributes) {      
      return `NSParagraphStyleAttributeName: ${this.paragraphName}`;
    }
  }

  valueForAlignment(value) {
    if(value == "left") {
      return "NSTextAlignmentLeft"
    }

    if(value == "center") {
      return "NSTextAlignmentCenter"
    }

    if(value == "right") {
      return "NSTextAlignmentRight"
    }

    if(value == "justify") {
      return "NSTextAlignmentJustified"
    }
    return value
  }
}

export default ParagraphAttribute