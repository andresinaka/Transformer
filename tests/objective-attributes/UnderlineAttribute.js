import test from 'ava';
import UnderlineAttribute from '../../src/objective-attributes/UnderlineAttribute';

test("Underline", t => {
  let item = {"underline": "style-single"};
  let underline = new UnderlineAttribute(item).parse()

  t.deepEqual(
    "NSUnderlineStyleAttributeName: [NSNumber numberWithInteger:NSUnderlineStyleSingle]",
    underline
  );
});