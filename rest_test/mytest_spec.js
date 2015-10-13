var frisby = require('frisby');
yaml = require('js-yaml');
fs   = require('fs');

// Get document, or throw exception on error
try {
    var doc = yaml.safeLoad(fs.readFileSync('test.yml', 'utf8'));

    //console.log(doc.response.json);

    var index = 0;
    for (index in doc.tests) {

        frisby.create(doc.tests[index].name)
        // todo post
        .get(doc.tests[index].url)
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON(doc.tests[index].response.json)
        .toss();
    }

} catch (e) {
    console.log(e);
}
