import test from 'ava';
import FontAttribute from '../../src/swift-attributes/FontAttribute';

test('Only font parameter', t => {
  let item = {"font": "helvetica-neue"};
  let fontAttribute = new FontAttribute(item).parse();

  t.deepEqual(
    '.font: UIFont(name: "HelveticaNeue", size: 13)!',
    fontAttribute
  );
});

test('Only size parameter', t => {
  let item = {"size": "25"};
  let fontAttribute = new FontAttribute(item).parse();

  t.deepEqual(
    '.font: UIFont(name: "HelveticaNeue", size: 25)!',
    fontAttribute
  );
});

test('name and size parameters', t => {
  let item = {"size": "30", font: "helvetica-neue-bold"};
  let fontAttribute = new FontAttribute(item).parse();

  t.deepEqual(
    '.font: UIFont(name: "HelveticaNeue-Bold", size: 30)!',
    fontAttribute
  );
});