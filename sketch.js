var aliens = [];
var alienNames = ["George", "Will", "Ping", "Leo", "Kenny", "Jasper", "Tata", "Bob", "Kat", "Pat", "Jungkook"];
var alienProfiles = [];
var pos = 0;
var questionIndex = 0;
var canvas;
var chat = [[], [], [], [], [], [], [], [], [], [], []];
var capture; // for webcam
var catfish = [];
var button;
var userInput;
var question;
var showCam;
var names;
var questionNumber = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var pageIndex = 1;
var chatIndex =1;
let profileShow = false;
let hangupPlaySound = false;
let textSent = false;

// chat questions & answers
var qna = [
  {
    q: "Hi! What's your name?",
    a: {},
    x: "Nice to meet you!"
  },
  {
    q: "How are you today?",
    a: {
      "good": "Great to hear!",
      "bad": "Aw I'm sorry."
    },
    x: "Interesting..."
  },
  {
    q: "What's your favorite color?",
    a: {
      "pink": "OMG SAME"
    },
    x: "That's cool!"
  },
  {
    q: "Are you French?",
    a: {
      "yes": "I knew it! Because Eiffel for you :)",
      "no": "Oh really? Because Eiffel for you :)"
    },
    x: "Because Eiffel for you :)"
  },
  {
    q: "Incoming call...  accept?",
    a: {},
    x: {},
  }
]

function setup() {
  canvas = createCanvas(500, 600);
  imgCanvas = createGraphics(500,600); // other canvas
  
  // webcam
  capture = createCapture(VIDEO);
  capture.size(500, 600);
  capture.hide();
  showCam = false;
  
  // create question & text box
  question = createP("");
  question.position(20,495);
  userInput = createInput("");
  userInput.position(20,550);
  
  // show current alien's name
  names = createP("");
  names.position(330,0);
  
  // 'Send' button
  button = createButton("Send");
  button.size(60,30);
  button.position(190,545);
  
  // 'Back' button
  back = createButton("Back");
  back.size(70,50);
  back.position(400,0);
  
  // 'Video Call' button
  videocall = createButton ("Video Call");
  videocall.size(100,50);
  videocall.position(370, 70);
  
  // 'Hang Up' button
  hangup = createImg("hangup.png", "hangupcall");
  hangup.size (75,75);
  hangup.position(210,390);
  
  // answer call button
  call = createButton ("Yes");
  call.size(80,45);
  call.position(20, 550);
  call.style("color:green");
  
  // decline call button
  decline = createButton ("No");
  decline.size(80,45);
  decline.position(120,550);
  decline.style("color:red");
  
  // show first canvas
  showCanvas();
  
  // button interactivity
  button.mousePressed(sendText);
  back.mousePressed(showCanvas);
  videocall.mousePressed(showWebcam);
  hangup.mousePressed(hangupCall);
  call.mousePressed(showWebcam);
  decline.mousePressed(showCanvas);
}

function showWebcam() {
  showCam = true;
}

function preload() {
  pluto = loadImage("pluto.png"); // https://www.dafont.com/quantum-4.font
  like = loadImage("like.png"); // https://www.pngfind.com/mpng/ibxRTJT_heart-icon-tinder-green-heart-png-transparent-png/
  nope = loadImage("nope.png"); // https://www.pngitem.com/middle/iixTJRJ_x-do-tinder-png-transparent-png/
  hangupImg = loadImage("hangup.png"); // https://stock.adobe.com/search?k=hang+up&asset_id=372661930
  
  // alien's profile picture
  aliens[0] = loadImage("alien1.png"); // https://pixabay.com/vectors/alien-cartoon-character-comic-1295828/
  aliens[1] = loadImage("alien2.png"); // https://pixabay.com/vectors/alien-cartoon-comic-eye-stalks-2029727/
  aliens[2] = loadImage("alien3.png"); // https://www.pinclipart.com/pindetail/xmxbb_clipart-floating-silly-alien-with-tentacles-cartoon-alien/
  aliens[3] = loadImage("alien4.png"); // https://www.wired.co.uk/article/monster-mashup
  aliens[4] = loadImage("alien5.png"); // https://www.pinterest.com/pin/813110907703830118/
  aliens[5] = loadImage("alien6.png"); // https://aminoapps.com/c/nanatsu-no-taizai/page/blog/the-seven-deadly-sins-goose-goose-duck-edition/L64r_rnI8uM0Lr1Bplz22wr7an2maEljBv
  aliens[6] = loadImage("alien7.png"); // https://www.pinterest.com/pin/707135578982945795/
  aliens[7] = loadImage("alien11.PNG"); // https://www.pngitem.com/middle/JTmwwJ_bob-minion-transparent-free-png-minion-bob-without/
  aliens[8] = loadImage("alien8.png"); // my picture :)
  aliens[9] = loadImage("alien10.PNG"); // https://www.pngkey.com/maxpic/u2q8o0e6e6o0i1w7/
  aliens[10] = loadImage("alien9.PNG"); // https://www.iwmbuzz.com/music/snippets-music/jungkooks-life-change-joining-bts/2020/10/06
 
  // alien's profile created with Canva
  alienProfiles[0] = loadImage("Profile1.PNG");
  alienProfiles[1] = loadImage("Profile2.PNG");
  alienProfiles[2] = loadImage("Profile3.PNG");
  alienProfiles[3] = loadImage("Profile4.PNG");
  alienProfiles[4] = loadImage("Profile5.PNG");
  alienProfiles[5] = loadImage("Profile6.PNG");
  alienProfiles[6] = loadImage("Profile7.PNG");
  alienProfiles[7] = loadImage("Profile8.PNG");
  alienProfiles[8] = loadImage("Profile9.PNG");
  alienProfiles[9] = loadImage("Profile10.PNG");
  alienProfiles[10] = loadImage("Profile11.PNG");
  
  // webcam images/GIFs
  catfish[0] = loadImage("george.gif"); // https://giphy.com/explore/red
  catfish[1] = loadImage("willwhoo.gif"); // https://giphy.com/gifs/dancing-kermit-8m4R4pvViWtRzbloJ1
  catfish[2] = loadImage("ping.jpg"); // my friend's dog
  catfish[3] = loadImage("leo.gif"); // https://wallpapers-clan.com/pfp/meme-gif/
  catfish[4] = loadImage("squishy.gif"); // https://gifdb.com/gif/monsters-university-dance-party-squishy-h9mzj9c7inkdaw8f.html
  catfish[5] = loadImage("spongebob.gif"); // https://giphy.com/gifs/spongebob-squarepants-mocking-QUXYcgCwvCm4cKcrI3
  catfish[6] = loadImage("tata.jpg"); // https://www.pinterest.com/pin/310959549283609192/
  catfish[7] = loadImage("minion.gif"); // https://tenor.com/view/minions-heart-love-gif-26369196
  catfish[8] = loadImage("pedo.jpg"); // https://makeameme.org/meme/fuck-you-you-1a0ce84834
  catfish[9] = loadImage("jigglypuff.gif"); // https://gifer.com/en/73jW
  catfish[10] = loadImage("jungkook.gif"); // https://tenor.com/view/jungkook-hi-hello-wave-gif-14290086
  
  // sound effects
  hangupSound = loadSound("hangupSound.mp3"); // https://www.youtube.com/watch?v=aqiKA_J7SvY
  sendtextSound = loadSound("sendtextSound.mp3"); // https://www.youtube.com/watch?v=T-SNlzSVAzg
  incomingCall = loadSound("incomingCall.mp3"); // https://www.youtube.com/watch?v=AAqrSnKqKTM
}

// class
class catfishcam {
  constructor(name) {
    this.name = name;
  }
  
  display() {
    image(imgCanvas, width/2, height/2);
    imgCanvas.image(this.name, 315, 0, 185, 185); // position images/GIFs
  }
}

// hang up call => play hang up sound effect
function hangupCall() {
  showCanvas();
  hangupPlaySound = true;
}

// send message => play text message sound effect
function sendText() {
  checkText();
  textSent = true;
}

// first canvas
function showCanvas() {
  canvas.show();
  button.hide();
  back.hide();
  hangup.hide();
  question.hide();
  names.hide();
  userInput.hide();
  capture.hide();
  call.hide();
  videocall.hide();
  decline.hide();
  imgCanvas.hide();
  showCam = false;
  incomingCall.stop();
  chatIndex = 1;
  
  // hide chat messages
  for (let i = 0; i < chat[questionIndex].length; i++) {
  chat[questionIndex][i].hide();
  }
}
  
// chat screen
function hideCanvas() {
    userInput.show();
    question.show();
    names.show();
    button.show();
    back.show();
    videocall.show();
    hangup.hide();
    call.hide();
    decline.hide();
    canvas.hide();
    chatIndex = 2;
  
  // show current alien's name
  names.html(alienNames[questionIndex]);
  
  // show chat messages
  question.html(qna[questionNumber[questionIndex]].q);
  for (const message of chat[questionIndex]){
    message.show();
  }
  
  // 'Do you want to call?'(Q4) => answer/decline call buttons show
    if(questionNumber[questionIndex] >= 4){
      userInput.hide();
      button.hide();
      call.show();
      decline.show();
      incomingCall.play();
    }
}

// video call
function webcam() {
  button.hide();
  question.hide();
  names.hide();
  userInput.hide();
  call.hide();
  decline.hide();
  back.hide();
  videocall.hide();
  hangup.show();
  chatIndex = 2;
  incomingCall.stop();
        
  // hide chat messages
  for (let i = 0; i < chat[questionIndex].length; i++) {
  chat[questionIndex][i].hide();
  }
}

function draw() {
  background(176, 119, 109); // cinder rose
  noStroke();
  rectMode(CENTER)
  fill(201, 172, 167); // brown
  rect(width/2, 0, 500, 165);
  
  // instruction
  textAlign(CENTER);
  textFont("Helvetica");
  fill(255); // white
  textSize(15);
  text("(click profile picture to find out more)", width/2, 115);
  
  // like & nope buttons
  imageMode(CENTER);
  image(like, 340, 515, 80, 80);
  image(nope, 160, 515, 80, 80);
  image(pluto, 440, 575, 210, 210);
  
  // alien's name
  textAlign(CENTER);
  textFont("Georgia");
  fill(0);
  textSize(45);
  text(alienNames[pos], width/2, 60);
  
  // alien's picture
  for(i=0; i<aliens.length; i++) {
    imageMode(CENTER);
    image(aliens[pos], width/2, 295, 280, 280);
    
    // alien's profile
    if (profileShow == true) {
      imageMode(CENTER);
      image(alienProfiles[pos], 250, 300, 500, 600);
    }
  } 
  
  // if accept call => turn on webcam
  if(showCam)
  {
    webcam();
  }
  
  // if hang up => play hang up sound
  if (hangupPlaySound == true) {
    hangupSound.play();
    hangupPlaySound = false;
  }
  
  // if click 'Send' button => play message sound
  if (textSent == true) {
    sendtextSound.play();
    textSent = false;
  }
  
  // object
  catfishedWebcam = new catfishcam(catfish[pos]);
  
  if (showCam == true){
    imgCanvas.show();
    let s = 1; // scale
    imageMode(CENTER);
    imgCanvas.image(capture, 0, 0); // webcam
    image(catfish[pos], 315, 0, 185, 185); // animated GIF
    catfishedWebcam.display();
  }
}

// like/nope feature
// if nope => go to next alien
function mouseClicked() {
  // print(questionIndex);
  if (mouseX > 125 && mouseX < 195 && mouseY > 483 && mouseY < 550 && pageIndex == 1 && chatIndex == 1) {
    profileShow = false;
    if (pos == 10) {
       pos = 0;
    } else {
       pos++;
    }
    if (questionIndex == 10){
      questionIndex = 0;
    } else {
      questionIndex++;
    }
  }
  
  // if like => open up chat screen
  if (mouseX > 310 && mouseX < 375 && mouseY > 480 && mouseY < 555 && pageIndex == 1) {
    hideCanvas();
  }

  // click alien's picture => alien's profile shows
  if (mouseX > 110 && mouseX < 375 && mouseY > 155 && mouseY < 435 || mouseX > 423 && mouseX < 466 && mouseY > 549 && mouseY < 588) {
    // click again => hide profile
    profileShow = !profileShow;
    if(profileShow == true) {
      pageIndex = 2;
    } else {
      pageIndex = 1;
    }
  }
}

// chat feature
function checkText(){
  const inp = userInput.value();
  const ans = qna[questionNumber[questionIndex]].a[inp.toLowerCase()] || qna[questionNumber[questionIndex]].x;
  
  // push older parts of conversation
  chat[questionIndex].push(createP(qna[questionNumber[questionIndex]].q));
  chat[questionIndex].push(createP(inp));
  chat[questionIndex].push(createP(ans));

  // clear text box
  userInput.value("");
  
  // go to next question
  if(questionNumber[questionIndex] < qna.length){
    questionNumber[questionIndex]++;
    question.html(qna[questionNumber[questionIndex]].q);
    
    // 'Do you want to call?'(Q5) => answer/decline call buttons show up
    if(questionNumber[questionIndex] >= 4){
      userInput.hide();
      button.hide();
      call.show();
      decline.show();
      incomingCall.play();
    }
  }
}

preload();
setup();
draw();