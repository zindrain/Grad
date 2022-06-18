function includes(outer,inner) {
  b =false
  for (var i = 0; i < outer.length; i++) {
    if (ArrEq(outer[i],inner)) {
      b = true;
      break
    }
  }
  return b;
}
function ArrEq(arr1,arr2) {
  let b = true;
  if (arr1.length!=arr2.length) {b=false}
  for (let i = 0; i < arr1.length; i++) {
    if(arr1[i]!=arr2[i]){b=false}
  }
  return b;
}

function Distance(curr,goal) {
  let d = 0.0
  let total = 0.0
  for (let i = 0; i < curr.length; i++) {
    total+=(goal[i]-curr[i])**2
  }
  return Math.sqrt(total)
}

function RandomArray(dim,size) { //dim for dimension, size for size of maze
  let x = new Array(dim).fill(1)
  for (let i = 0; i < x.length; i++) {
    x[i] = Math.floor(Math.random() * size)+1; //gives random integer up to the size of the maze
  }
  return x;
}


function GoalMaker(dim,size) {
  //let y=(Math.sqrt(dim)*size)/(dim-1) //sets minimum size for goal's distance from origin
  let y=3
  let origin = new Array(dim).fill(1);
  let goal = [];
  while (true) {
    let dist=0.0
     goal = RandomArray(dim,size);
    dist = Distance(origin,goal);

    if (dist>y){

      break
    }
  }
  return goal
}

function WallMaker(dim,size) {
  let x=63  //this works for 4 dimensions
  let walls = []

  for (let i = 0; i < x; i++) {
    let temp = RandomArray(dim,size);
    let b = true;
    if(ArrEq(temp,goal)){b=false}
    if(ArrEq(temp,[1,1,1,1])){b=false}
    if(ArrEq(temp,[2,1,1,1])){b=false}

    if(b){walls.push(temp)}
    }

  return walls
}

function Move(dir,sign) {
  let next = GetNext(dir,sign)
  if(!(includes(walls,next))){
    play.curr[dir] = play.curr[dir]+(1*sign);
  }
  Show();
}

function ChangeDir(newDir) {
  play.dir = newDir;
  Show();
}

function ChangeSign(){
  play.sign = play.sign*-1;
  Show();
}

function ChangeColor(dir,sign) {
  let view = document.getElementById('view')
  let color = '#000000'
  let forward = ["yellow","blue","red","green"]
  let backward = ["#fffc96","#96d2ff","#ff9696","#96ffa1"]
  if(sign==1){color = forward[dir]}
  else{color = backward[dir]}
  view.style.backgroundColor = color;

}

function GetNext(dir,sign) {
  let next =[...play.curr];
  next[dir] = play.curr[dir]+(1*sign);
  return next;
}

function Show() {
  ChangeColor(play.dir,play.sign);

  let pos = document.getElementById('pos');
  pos.innerHTML = "Current Position: " + play.curr.toString()

  let dis = document.getElementById('dis');
  dis.innerHTML ="Current Distance: " + (Math.round(Distance(goal,play.curr)*100)/100).toString();

  let next = GetNext(play.dir,play.sign);
  let wall = document.getElementById('wall')
  let warn = document.getElementById('warn')
  if(includes(walls,next)){
    wall.style.visibility = "visible";
    warn.style.visibility = "visible";
  }
  else {
    wall.style.visibility = "hidden";
    warn.style.visibility = "hidden";
  }

  let win = document.getElementById('win')
  if(ArrEq(play.curr,goal)){
    wall.style.visibility = "hidden";
    warn.style.visibility = "hidden";
    win.style.visibility = "visible";

  }else{win.style.visibility = 'hidden'}
}

document.addEventListener('keydown', (event) => {
  if(event.code == 'KeyQ'){ChangeSign()};
  if(event.code == 'KeyA'){ChangeDir(0)};
  if(event.code == 'KeyS'){ChangeDir(1)};
  if(event.code == 'KeyD'){ChangeDir(2)};
  if(event.code == 'KeyF'){ChangeDir(3)};
  if(event.code == 'KeyG'){Move(play.dir,play.sign)};

}, false);


let dim = 4;
let size = 3;
let start = new Array(dim).fill(1);
let goal = GoalMaker(dim,size);
let walls = WallMaker(dim,size);

let play={dir:0,sign:1,curr:start}


Show();
