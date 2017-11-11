import Attribute from '../Attribute';

class FontColor extends Attribute {
  parse() {
    let attributes = this.attributes
    if (attributes && "color" in attributes) {
      let [red, green, blue] = this.hexToRgb(attributes["color"]);

      let color = `UIColor(red: ${red}/255, green: ${green}/255, blue: ${blue}/255, alpha: 1.0)`;
      return `NSAttributedStringKey.foregroundColor: ${color}`;
    }
  }
}

export default FontColor;
