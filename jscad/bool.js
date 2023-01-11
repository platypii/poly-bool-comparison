const jscad = require('@jscad/modeling')
const { intersect, subtract, union } = jscad.booleans
const { geom2 } = jscad.geometries
const fs = require('fs')

const args = process.argv.slice(2)
const g1 = fromOutlines(JSON.parse(fs.readFileSync(args[0], 'utf8')))
const g2 = fromOutlines(JSON.parse(fs.readFileSync(args[1], 'utf8')))
const m = args[2].toLowerCase()
var result
switch(m) {
    case "x":
        result = subtract(union(g1, g2), intersect(g1, g2))
        break
    case "i":
        result = intersect(g1, g2)
        break
    case "u":
        result = union(g1, g2)
        break
    case "d":
        result = subtract(g1, g2)
        break
    default:
        result = intersect(g1, g2)
        break;
}
result = geom2.toOutlines(result)
console.log(JSON.stringify(result, null, "  "))


function fromOutlines (outlines) {
  const sides = []
  outlines.forEach((outline) => {
    outline.forEach((point, i) => {
      const j = (i + 1) % outline.length
      sides.push([point, outline[j]])
    })
  })
  return geom2.create(sides)
}
