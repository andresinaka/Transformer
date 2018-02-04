import Attribute from '../Attribute';

class UnderlineAttribute extends Attribute {

  parse() {
    let attributes = this.attributes
    if (attributes && "underline" in attributes) {
      let underline = this.valueFromClass(attributes["underline"]);

      if(!underline) { return null }

      return `.underlineStyle: NSUnderlineStyle.${underline}.rawValue`;
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