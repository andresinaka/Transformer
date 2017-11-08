import Attribute from './Attribute';

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
      let paragraphStyle = `\nlet ${this.paragraphName} = NSMutableParagraphStyle()`
      paragraphStyle = paragraphStyle + `\n${this.paragraphName}.alignment = .${this.valueForAlignment(alignment)}`

      return paragraphStyle
    }
  }

  parse() {
    let attributes = this.attributes;
    if (attributes && "align" in attributes) {      
      return `NSAttributedStringKey.paragraphStyle: ${this.paragraphName}`;
    }
  }

  valueForAlignment(value) {
    if(value == "justify") {
      return "justified"
    }
    return value
  }
}

export default ParagraphAttribute