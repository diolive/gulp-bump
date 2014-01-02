var fs = require('fs');
var gutil = require('gulp-util');
var es = require('event-stream');
var fs = require('fs');
var should = require('should');
var bump = require('../');

require('mocha');


describe('gulp-bump', function() {
  it('should bump minor by default', function(done) {
    var fakeFile = new gutil.File({
      base: "test/",
      cwd: "test/",
      path: "test/package.json",
      contents: fs.readFileSync('test/package.json')
    });
    var bumpS = bump();
    bumpS.once('data', function(newFile){
      should.exist(newFile);
      should.exist(newFile.path);
      should.exist(newFile.contents);
      String(newFile.contents).should.equal(fs.readFileSync('test/expected/default.json', 'utf8'));
      done();
    });
    bumpS.write(fakeFile);
  });

  it('should bump major if options.bump = major', function(done) {
    var fakeFile = new gutil.File({
      base: "test/",
      cwd: "test/",
      path: "test/package.json",
      contents: fs.readFileSync('test/package.json')
    });
    var bumpS = bump({bump: 'major'});
    bumpS.once('data', function(newFile){
      should.exist(newFile);
      should.exist(newFile.path);
      should.exist(newFile.contents);
      String(newFile.contents).should.equal(fs.readFileSync('test/expected/major.json', 'utf8'));
      done();
    });
    bumpS.write(fakeFile);
  });
  it('should bump minor if options.bump = minor', function(done) {
    var fakeFile = new gutil.File({
      base: "test/",
      cwd: "test/",
      path: "test/package.json",
      contents: fs.readFileSync('test/package.json')
    });
    var bumpS = bump({bump: 'minor'});
    bumpS.once('data', function(newFile){
      should.exist(newFile);
      should.exist(newFile.path);
      should.exist(newFile.contents);
      String(newFile.contents).should.equal(fs.readFileSync('test/expected/minor.json', 'utf8'));
      done();
    });
    bumpS.write(fakeFile);
  });


  it('should ignore and pass "patch" if options.bump is not Semantic', function(done) {
    var fakeFile = new gutil.File({
      base: "test/",
      cwd: "test/",
      path: "test/package.json",
      contents: fs.readFileSync('test/package.json')
    });
    var bumpS = bump({bump: 'invalid'});
    bumpS.once('data', function(newFile){
      should.exist(newFile);
      should.exist(newFile.path);
      should.exist(newFile.contents);
      String(newFile.contents).should.equal(fs.readFileSync('test/expected/default.json', 'utf8'));
      done();
    });
    bumpS.write(fakeFile);
  });


});