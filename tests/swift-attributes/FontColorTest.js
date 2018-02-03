import test from 'ava';
import FontColor from '../../src/swift-attributes/FontColor';

test("Font color", t => {
  let item = {"color": "#ffffff"};
  let fontColor = new FontColor(item).parse()

  t.deepEqual(
    ".foregroundColor: UIColor(red: 255/255, green: 255/255, blue: 255/255, alpha: 1.0)",
    fontColor
  );
});