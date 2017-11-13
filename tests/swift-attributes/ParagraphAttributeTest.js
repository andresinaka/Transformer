import test from 'ava';
import ParagraphAttribute from '../../src/swift-attributes/ParagraphAttribute';

test("Paragraph", t => {
  let item = {"align": "center"};
  let paragraphAttribute = new ParagraphAttribute(item, 1);

  t.deepEqual(
    "\nlet paragraphStyle1 = NSMutableParagraphStyle()\nparagraphStyle1.alignment = .center",
    paragraphAttribute.paragraphStyle()
  );

  t.deepEqual(
    "NSAttributedStringKey.paragraphStyle: paragraphStyle1",
    paragraphAttribute.parse()
  );
});