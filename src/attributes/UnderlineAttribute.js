import Attribute from './Attribute';

class UnderlineAttribute extends Attribute {

  parse() {
    let attributes = this.attributes
    if (attributes && "underline-style") {
      
      let underline = this.valueFromClass(attributes["underline-style"]);

      if(!underline) { return null }

      return `NSAttributedStringKey.underlineStyle: NSUnderlineStyle.${underline}.rawValue`;
    }
  }

  valueFromClass(valueClass) {
    switch (valueClass) {
      case "style-single":
        return "styleSingle";
      case "style-thick":
        return "styleThick";
      case "style-double":
        return "styleDouble";
      case "pattern-dot":
        return "patternDot";
      case "pattern-dash":
        return "patternDash";
    }
  }
}

export default UnderlineAttribute;