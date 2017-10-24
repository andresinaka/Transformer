import FontColor from './attributes/FontColor';
import FontAttribute from './attributes/FontAttribute';
import BackgroundColor from './attributes/BackgroundColor';

class Translator {
  constructor(text, delta) {
    this.text = text;
    this.delta = delta;
  }

  translate() {
    let text = this.text;
    let delta = this.delta;
    let start = 0;
    let attributedString = `let attributedString = NSMutableAttributedString(string: ${JSON.stringify(text)})`;

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
    `attributedString.addAttributes(${attributeName}, range: ${range})\n`

    return cocoaAttributes;
  }

}

export default Translator;
