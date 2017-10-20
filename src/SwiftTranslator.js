function translator(text, delta) {
  let accumStart = 0

  let attributedString = `let attributedString = NSAttributedString(string: "${text}")`

  delta["ops"].forEach(function (item, index) {
    let attributes = item["attributes"];
    let piece = item["insert"];
    let length =  piece.length;
    let start = accumStart;

    let attributesName = `attributes${index}`
    let range = `NSMakeRange(${start}, ${length})`
    let cocoaAttributes = `
      let ${attributesName}: [NSAttributedStringKey : Any] = [
            NSAttributedStringKey.font: ${fontAttribute(attributes)},
            NSAttributedStringKey.foregroundColor: ${fontColor(attributes)}
      ]

      attributedString.addAttributes(${attributesName}, range: ${range})
    `

    accumStart = accumStart + length;
    attributedString = attributedString + '\n' + cocoaAttributes
  });

  return attributedString
}

function fontAttribute(attributes) {
  if(!attributes) { return }

  if ("font" in attributes && "size" in attributes) {
    let fontName = attributes["font"];
    let fontSize = attributes["size"];
    return `UIFont(name: "${fontName}", size: ${fontSize})`;
  }

  return
}

function hexToRgb(hex) {
  return hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
             ,(m, r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1).match(/.{2}/g)
    .map(x => parseInt(x, 16))
}

function fontColor(attributes) {
  if(!attributes) { return }
  if ("color" in attributes) {
    let [red, green, blue] = hexToRgb(attributes["color"]);


    return `UIColor(red: ${red}/255, green: ${green}/255, blue: ${blue}/255, alpha: 1.0)`
  }  
}

function attributesTranslator(attributes) {
  attributes.forEach(function (attribute) {

  })
}

export default translator

let contents = {
  "ops": [
    {
      "attributes": {
        "bold": true,
        "italic": true,
        "size": "large",
        "font": "fafafa",
        "color": "#0033ff"
      },
      "insert": "fafafa"
    },
    {
      "insert": "\n"
    },
    {
      "attributes": {
        "italic": true
      },
      "insert": "fafafa"
    },
    {
      "insert": "\n"
    },
    {
      "attributes": {
        "italic": true,
        "bold": true
      },
      "insert": "fafafa"
    },
    {
      "insert": "\n"
    },
    {
      "attributes": {
        "underline": true,
        "italic": true,
        "bold": true
      },
      "insert": "fafafa"
    },
    {
      "insert": "\n"
    }
  ]
};

let text = "fafafa\nfafafa\nfafafa\nfafafa\n"

console.log(translator(text, contents))

