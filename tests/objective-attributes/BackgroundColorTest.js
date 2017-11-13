import test from 'ava';
import BackgroundColor from '../../src/objective-attributes/BackgroundColor';

test("BacgroundColor", t => {
  let item = {"background": "#ffffff"};
  let backgroundColor = new BackgroundColor(item).parse()

  t.deepEqual(
    "NSBackgroundColorAttributeName: [[UIColor alloc] initWithRed: 255.0/255 green: 255.0/255 blue: 255.0/255 alpha: 1.0]",
    backgroundColor
  );
});