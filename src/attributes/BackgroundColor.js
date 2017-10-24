import Attribute from './Attribute';

class BackgroundColor extends Attribute {
  parse() {
    let attributes = this.attributes;
    if (attributes && "background" in attributes) {
      let [red, green, blue] = this.hexToRgb(attributes["background"]);

      let color = `UIColor(red: ${red}/255, green: ${green}/255, blue: ${blue}/255, alpha: 1.0)`;
      return `NSAttributedStringKey.backgroundColor: ${color}`;
    }
  }
}

export default BackgroundColor;
