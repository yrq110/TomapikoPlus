
phina.globalize();

var ASSETS = {
  image: {
    tomapiko: 'http://cdn.rawgit.com/phi-jp/phina.js/v0.2.0/assets/images/tomapiko_ss.png',
  },
};



var SCREEN_WIDTH    = 640;
var SCREEN_HEIGHT   = 300;

var PIKO_Y          = 250;
var JUMP_DISTANCE   = 30;
var FLY_DISTANCE    = 50;
var SPEED           = 4;

var PIECE_SIZE      = 40;
var PIECE_SIZE_HALF = PIECE_SIZE/2;

phina.define("MainScene", {

  superClass: 'DisplayScene',

  init: function() {

    this.superInit();

    this.backgroundColor = '#34a853';
    this.piko = Sprite('tomapiko', 64, 64).addChildTo(this);
    this.piko.setPosition(100, PIKO_Y);
    this.piko.frameIndex = 0;
    this.piko.speed = 15;
    this.piko.fly = false;

    this.wordGroup = DisplayElement().addChildTo(this);
  },

  // createWord: function() {
  //   var ascii = [48];
  //   var ch = String.fromCharCode(ascii.pickup());
  //
  //   var word = Word().addChildTo(this.wordGroup);
  //   word.x = Math.randint(PIECE_SIZE_HALF, this.gridX.width-PIECE_SIZE_HALF);
  //   word.y = -100;
  //
  //   return word;
  // },

  // checkHit: function() {
  //   var piko = this.piko;
  //
  //   this.wordGroup.children.some(function(word) {
  //
  //     if (piko.hitTestElement(word)) {
  //       console.log("hit!!!");
  //       word.disappear();
  //       return true;
  //     }
  //   }, this);
  // },

  update: function(app) {

    // this.checkHit();

    // dropWord
    // if (app.frame % 16 === 0) {
    //   this.createWord();
    // }

    var piko = this.piko;
    var e = app.keyboard;
    var p = app.pointer;

    // 68 == 'd' goRight
    if (e.getKey(68)) {

      piko.x += SPEED;
      piko.scaleX = -1;

      if ((app.frame % SPEED*4 === 0)&&(piko.fly === false)) {
        piko.frameIndex = (piko.frameIndex === 12) ? 13:12;
      }

    // 65 == 'a' goLeft
    } else if (e.getKey(65)) {

      piko.x -= SPEED;
      piko.scaleX = +1;

      if ((app.frame % SPEED*4 === 0)&&(piko.fly === false)) {
        piko.frameIndex = (piko.frameIndex === 12) ? 13:12;
        // this.piko.frameIndex = (this.piko.frameIndex === 1) ? 2:1;
      }

    // 83 == 's' getFall or getDown
    } else if (e.getKey(83)) {

      console.log("piki y position is:" + piko.position.y);
      if (piko.position.y === PIKO_Y ) {
        piko.frameIndex = 5;
      } else if (this.piko.fly === true) {
        piko.tweener.clear();
        piko.tweener.to({y: piko.position.y+FLY_DISTANCE}, 300, 'easeInQuad');
        piko.frameIndex = 0;
        piko.fly = false;
        piko.update = function() {}
      }

    // 87 == 'w' getFly
  } else if (e.getKeyDown(87) && !piko.fly ) {
      console.log("piki y position is:" + piko.position.y);
      piko.fly = true;
      piko.tweener.clear();
      piko.tweener.to({y: piko.position.y-FLY_DISTANCE}, 300, 'easeOutQuad');
      piko.update = function() {
        if (app.frame % SPEED*4 === 0) {
          this.frameIndex = (this.frameIndex === 1) ? 2:1;
        }
      }
    } else {
      if (piko.fly === false) {
        piko.frameIndex = 0;
      }
    }

    if (e.getKeyDown(32) && (piko.position.y === PIKO_Y)) {
      // console.log("space" + this.piko.position.y);
      piko.tweener.clear();
      piko.tweener.to({y: piko.position.y-JUMP_DISTANCE}, 300, 'easeOutQuad').to({y: piko.position.y}, 300, 'easeInQuad');

    }

  }

});

// phina.define('Word', {
//   superClass: 'Button',
//
//   init: function() {
//     this.superInit({
//       width: PIECE_SIZE,
//       height: PIECE_SIZE,
//       text: ''
//     });
//     this.enable = true;
//   },
//
//   update: function() {
//     this.y += 8;
//
//     if (this.y > 960) {
//       this.remove();
//     }
//   },
//
//   disappear: function() {
//     this.remove();
//   }
// });

phina.main(function() {

  var app = GameApp({
    query: '#game',
    startLabel: 'main',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    fit: false,
    assets: ASSETS,

  });

  app.run();
});
