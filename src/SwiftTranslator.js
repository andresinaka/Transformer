
class Attribute {

  constructor(attributes) {
    this.attributes = attributes;
  }

  parse(){
  }

  hexToRgb(hex) {
    return hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
               ,(m, r, g, b) => '#' + r + r + g + g + b + b)
              .substring(1).match(/.{2}/g)
              .map(x => parseInt(x, 16))
  }
}

class FontAttribute extends Attribute {
  parse() {
    let attributes = this.attributes
    if (attributes && "font" in attributes && "size" in attributes) {
      let fontName = attributes["font"];
      let fontSize = attributes["size"];

      let font = `UIFont(name: "${fontName}", size: ${fontSize})`;
      return `NSAttributedStringKey.font: ${font}`
    }
  }
}

class FontColor extends Attribute {
  parse() {
    let attributes = this.attributes
    if (attributes && "color" in attributes) {
      let [red, green, blue] = this.hexToRgb(attributes["color"]);

      let color = `UIColor(red: ${red}/255, green: ${green}/255, blue: ${blue}/255, alpha: 1.0)`
      return `NSAttributedStringKey.foregroundColor: ${color}`
    }
  }
}

class BackgroundColor extends Attribute {
  parse() {
    let attributes = this.attributes
    if (attributes && "background" in attributes) {
      let [red, green, blue] = this.hexToRgb(attributes["background"]);

      let color = `UIColor(red: ${red}/255, green: ${green}/255, blue: ${blue}/255, alpha: 1.0)`
      return `NSAttributedStringKey.backgroundColor: ${color}`
    }
  }
}

class Translator {
  constructor(text, delta) {
    this.text = text;
    this.delta = delta;
  }

  translate() {
    let text = this.text;
    let delta = this.delta;
    let start = 0;
    let attributedString = `let attributedString = NSAttributedString(string: ${JSON.stringify(text)})`;

    let self = this
    delta["ops"].forEach(function (item, index) {
      attributedString = attributedString + '\n' + self.addAttributes(
        start,
        item["insert"].length,
        `attributes${index}`,
        self.attributes(item["attributes"])
      );

      start = start + item["insert"].length;
    });

    return attributedString;
  }

  attributes(item) {
    return [
      new FontColor(item).parse(),
      new FontAttribute(item).parse(),
      new BackgroundColor(item).parse()
    ].filter(v => v);
  }

  addAttributes(start, length, attributeName, attributes) {
    if(attributes.length == 0) { return ""; }

    let range = `NSMakeRange(${start}, ${length})`;

    let cocoaAttributes =  
    `let ${attributeName}: [NSAttributedStringKey : Any] = [\n` +
    `   ${attributes.join(",\n   ")}\n` +
    `]\n` +
    `attributedString.addAttributes(${attributeName}, range: ${range})\n\n`

    return cocoaAttributes;
  }

}

export default Translator;
