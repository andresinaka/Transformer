import Attribute from '../Attribute';

class FontColor extends Attribute {
  parse() {
    let attributes = this.attributes
    if (attributes && "color" in attributes) {
      let [red, green, blue] = this.hexToRgb(attributes["color"]);

      let color = `[[UIColor alloc] initWithRed: ${red}.0/255 green: ${green}.0/255 blue: ${blue}.0/255 alpha: 1.0]`;
      return `NSForegroundColorAttributeName: ${color}`;
    }
  }
}

export default FontColor;