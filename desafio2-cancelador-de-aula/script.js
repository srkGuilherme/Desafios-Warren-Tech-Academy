nowTime = document.getElementById("nowTime");
classTime = document.getElementById("classTime");
message = document.getElementById("message");
cancelMessage = document.getElementById("cancelMessage");
studentsInput = document.getElementById("studentsInput");
studentsCounterSpan = document.getElementById("studentsCounterSpan");
lateStudentsCounterSpan = document.getElementById("lateStudentsCounterSpan");
registerButton = document.getElementById("registerButton");

let studentsList = [];
let lateStudents = 0;
let lateStudentsCounter = 0;
let studentsCounter = 0;

function getTime() {
  let date = new Date();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }
  if (second < 10) {
    second = "0" + second;
  }
  let currentTime = hour + ":" + minute + ":" + second;

  return currentTime;
}

function resetClassTime() {
  classTime.value = null;
}

function clearForm() {
  resetClassTime();
  lateStudents = 0;
  lateStudentsCounter = 0;
  studentsList = [];
  studentsCounter = 0;
  message.classList.remove("messageShow");
  cancelMessage.classList.remove("messageShow");
  studentsCounterSpan.innerHTML = "Alunos presentes: " + studentsCounter;
  lateStudentsCounterSpan.innerHTML =
    "Alunos atrasados: " + lateStudentsCounter;
}

function checkClassStart() {
  if (nowTime.value >= classTime.value && classTime.value != 0) {
    message.classList.add("messageShow");
  } else {
    message.classList.remove("messageShow");
    cancelMessage.classList.remove("messageShow");
  }
}
function StudentsUpdate() {
  studentsCounter++;
  studentsCounterSpan.innerHTML = "Alunos presentes: " + studentsCounter;
}

function lateStudentsUpdate() {
  lateStudentsCounter++;
  lateStudentsCounterSpan.innerHTML =
    "Alunos atrasados: " + lateStudentsCounter;
}

function checkCancel() {
  if (lateStudentsCounter >= studentsInput.value) {
    console.log(lateStudentsCounter);
    cancelMessage.classList.add("messageShow");
    cancelMessage.innerHTML =
      "Atenção: Aula cancelada, " +
      lateStudentsCounter +
      " alunos atrasados" +
      '<div id="xCancel" onclick="hideCancelMessage()">X</div>';
    console.log(lateStudentsCounter);
  } else {
    cancelMessage.classList.remove("messageShow");
  }
}
function checkForm() {
  if (classTime.value == undefined || studentsInput.value <= 0) {
    registerButton.disable = true;
    registerButton.classList.add("blockClick");
  } else {
    registerButton.disable = false;
    registerButton.classList.remove("blockClick");
  }
}

function register() {
  checkForm();
  let arriveTime = nowTime.value;
  let classTimeValue = classTime.value;

  if (studentsInput.value < 1) {
  } else {
    StudentsUpdate();
    checkCancel();

    if (arriveTime > classTimeValue) {
      lateStudents++;
      lateStudentsUpdate();

      studentsList.push({ arriveTime, classTimeValue, late: "yes" });
    } else {
      studentsList.push({ arriveTime, classTimeValue, late: "no" });
    }
  }
}

function hideCancelMessage() {
  cancelMessage.classList.remove("messageShow");
  clearForm();
}

setInterval(() => {
  nowTime.value = getTime();
  checkClassStart();
}, 1000);
