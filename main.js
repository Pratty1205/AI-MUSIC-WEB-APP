grateful = "";
wma = "";
LeftX = 0;
LeftY = 0;
RightX = 0;
RightY = 0;
leftScore = 0;
rightScore = 0;
song_status = "";

function setup() {
    canvas = createCanvas(550, 400);
    video = createCapture(VIDEO);
    canvas.center();
    video.hide();
    posenet = ml5.poseNet(video, model_loaded);
    posenet.on("pose", getResult);
}

function model_loaded() {
    console.log("Model is not loaded");
}

function preload() {
    grateful = loadSound("Grateful.mp3");
    wma = loadSound("We'll Meet Again.mp3")
}

function draw() {
    image(video, 0, 0, 550, 400);
    song_status = grateful.isPlaying();
    song_status = wma.isPlaying();
    if (leftScore > 0.2) {
        stroke("red");
        fill("red");
        circle(LeftX, LeftY, 30);
        wma.stop()
    }
    if (song_status = false) {
        grateful.play();
        document.getElementById("name").innerHTML = "Song Name : Grateful";
    }

    if (leftScore > 0.2) {
        stroke("red");
        fill("red");
        circle(RightX, RightY, 30);
        grateful.stop()
    }
    if (song_status = false) {
        wma.play();
        document.getElementById("name").innerHTML = "Song Name : We'll Meet Again";
    }
}

function getResult(result) {
    if (result.length > 0) {
        console.log(result);
        LeftX = result[0].pose.leftWrist.x;
        LeftY = result[0].pose.leftWrist.y;
        RightX = result[0].pose.rightWrist.x;
        RightY = result[0].pose.rightWrist.y;
        leftScore = result[0].pose.keypoints[9].score;
        rightScore = result[0].pose.keypoints[10].score;
    }
}