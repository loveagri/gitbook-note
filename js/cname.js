let fs = require('fs');
let path = require('path');


const ROOT = path.dirname(__dirname);
const CNAME = ROOT + '/docs/CNAME';


fs.writeFileSync(CNAME, "note.dotohi.com");







