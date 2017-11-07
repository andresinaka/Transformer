import Attribute from './Attribute';

class FontAttribute extends Attribute {
  parse() {
    let attributes = this.attributes


    if(attributes && "font" in attributes && !("size" in attributes)) {
      attributes["size"] = "13px"
    }

    if(attributes && "size" in attributes && !("font" in attributes)) {
      attributes["font"] = "helvetica-neue"
    }

    if (attributes && "font" in attributes && "size" in attributes) {
      let fontName = this.valueFromClass(attributes["font"]);
      let fontSize = attributes["size"].replace("px", "");

      let font = `UIFont(name: "${fontName}", size: ${fontSize})!`;
      return `NSAttributedStringKey.font: ${font}`;
    }
  }

  valueFromClass(valueClass) {
    switch (valueClass) {
      case "helvetica-neue":
        return "HelveticaNeue";
      case "helvetica-neue-bold":
        return "HelveticaNeue-Bold";
      case "helvetica-neue-light":
        return "HelveticaNeue-Light";
    }
  }
}

export default FontAttribute;
