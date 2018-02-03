import test from 'ava';
import UnderlineAttribute from '../../src/swift-attributes/UnderlineAttribute';

test("Underline", t => {
  let item = {"underline": "style-single"};
  let underline = new UnderlineAttribute(item).parse()

  t.deepEqual(
    ".underlineStyle: NSUnderlineStyle.styleSingle.rawValue",
    underline
  );
});