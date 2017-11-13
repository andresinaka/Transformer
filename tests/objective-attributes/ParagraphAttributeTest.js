import test from 'ava';
import ParagraphAttribute from '../../src/objective-attributes/ParagraphAttribute';

test("Paragraph", t => {
  let item = {"align": "center"};
  let paragraphAttribute = new ParagraphAttribute(item, 1);

  t.deepEqual(
    "\nNSMutableParagraphStyle *paragraphStyle1 = [[NSMutableParagraphStyle alloc] init];\nparagraphStyle1.alignment = NSTextAlignmentCenter;",
    paragraphAttribute.paragraphStyle()
  );

  t.deepEqual(
    "NSParagraphStyleAttributeName: paragraphStyle1",
    paragraphAttribute.parse()
  );
});