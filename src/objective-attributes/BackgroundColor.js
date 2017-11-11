import Attribute from '../Attribute';

class BackgroundColor extends Attribute {
  parse() {
    let attributes = this.attributes;
    if (attributes && "background" in attributes) {
      let [red, green, blue] = this.hexToRgb(attributes["background"]);

      let color = `[[UIColor alloc] initWithRed: ${red}.0/255 green: ${green}.0/255 blue: ${blue}.0/255 alpha: 1.0]`;
      return `NSBackgroundColorAttributeName: ${color}`;
    }
  }
}

export default BackgroundColor;
