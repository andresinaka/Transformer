import Attribute from '../Attribute';

class UnderlineAttribute extends Attribute {

  parse() {
    let attributes = this.attributes
    if (attributes && "underline" in attributes) {
      let underline = this.valueFromClass(attributes["underline"]);

      if(!underline) { return null }

      return `NSUnderlineStyleAttributeName: [NSNumber numberWithInteger:${underline}]`;
    }
  }

  valueFromClass(valueClass) {
    switch (valueClass) {
      case "style-single":
        return "NSUnderlineStyleSingle";
      case "style-thick":
        return "NSUnderlineStyleThick";
      case "style-double":
        return "NSUnderlineStyleDouble";
      case "pattern-dot":
        return "NSUnderlinePatternDot";
      case "pattern-dash":
        return "NSUnderlinePatternDash";
    }
  }
}

export default UnderlineAttribute;