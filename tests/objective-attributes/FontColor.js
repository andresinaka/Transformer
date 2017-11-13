import test from 'ava';
import FontColor from '../../src/objective-attributes/FontColor';

test("Font color", t => {
  let item = {"color": "#ffffff"};
  let fontColor = new FontColor(item).parse()

  t.deepEqual(
    "NSForegroundColorAttributeName: [[UIColor alloc] initWithRed: 255.0/255 green: 255.0/255 blue: 255.0/255 alpha: 1.0]",
    fontColor
  );
});