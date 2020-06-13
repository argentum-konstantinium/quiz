'use strict';
let divs = document.querySelectorAll('.quiz-content'), i = 0,
  t = divs.length, max = 0, test, test2, btnOver = 0,
  w, z, scheckedId = 1, radioId = 1, elemCheck = 0,
  width = 0, discount = 0, value = width + "%", dis = 0 + "p";
let a, v, b, p;
let answers = [];
let question = '';
let inputText = '';

$('span#prosent').text(value);
$('span#discount').text(dis);

let btnCont = document.querySelector('#onward');
btnCont.addEventListener('click', function () {
  if (btnOver == 1) {
    switchScreen();
  }
});

let btnContPrev = document.querySelector('#back');

function print(i, i_post, width, discount) {
  test = divs[i];
  test2 = divs[i_post];
  $(test).fadeOut();
  $(test2).delay(400).fadeIn(500);
  value = width + "%";
  dis = discount + "p";
  $(".progress-bar").width(value);
  $('span#prosent').text(value);
  $('span#discount').text(dis);
}
function buttonOnAndOff(loginStat) {
  loginStat == 1 ? (
    $("#onward").removeAttr("disabled"), $("#onward").css('cursor', 'pointer'), btnOver = 1, $(".btnCont").css('cursor', 'pointer')) :
    ($("#onward").attr("disabled", "disabled"), $("#onward").css('cursor', 'not-allowed'), btnOver = 0, $(".btnCont").css('cursor', 'not-allowed'));
}
function showCheckBox(nameShow, nameCheckbox) {
  var checkboxes = document.getElementsByClassName(nameShow);
  var checkboxesChecked = []; // можно в массиве их хранить, если нужно использовать
  for (var index = 0; index < checkboxes.length; index++) {

    $(checkboxes).prop('disabled', false);
    if (checkboxes[index].checked) {
      checkboxesChecked.push(checkboxes[index].value); // положим в массив выбранный

      answers.push(`${$(question).text()} \n ответ: ${checkboxes[index].value} \n \n`);
      $(nameCheckbox).val(checkboxesChecked);
    }
  }
}

function twoQuestion() {
  answers.push(`${$(question).text()} \n ответ: хочу в ${$('#userAnswerTwo').keyup().val()} \n \n`);
}


$('#submit-form').click(function (e) {
  let inputPhone = $('#phone').keyup().val();
  let inputEmail = $('#email').keyup().val();
  answers.push(`Мой номер телефона: ${inputPhone} \n мой почтовый ящик: ${inputEmail} \n \n`);


  $.ajax({
    type: "POST",
    data: answers,
    url: "send.php",
    success: function (data) {
      alert(data);
    }
  });
});

function switchScreen() {
  i >= max ? (buttonOnAndOff(0), max = i) : buttonOnAndOff(1);
  switch (i) {
    case 0:
      var valOne = '';
      if ($("#chek1").prop('checked') == true) {
        if (document.getElementById("chek1").value != 'undefined') {
          valOne = document.getElementById("chek1").value + ', ';
        }

      }
      if ($("#chek2").prop('checked') == true) {
        if (document.getElementById("chek2").value != 'undefined') {
          valOne += document.getElementById("chek2").value + ', ';
        }
      }
      if ($("#chek3").prop('checked') == true) {
        if (document.getElementById("chek3").value != 'undefined') {
          valOne += document.getElementById("chek3").value + ', ';
        }
      }
      if ($("#chek4").prop('checked') == true) {
        if (document.getElementById("chek4").value != 'undefined') {
          valOne += document.getElementById("chek4").value + ', ';
        }
      }
      if ($("#chek1").prop('checked') == true) { a = 1; } else { a = 0 }
      if ($("#chek2").prop('checked') == true) { v = 1; } else { v = 0 }
      if ($("#chek3").prop('checked') == true) { b = 1; } else { b = 0 }
      if ($("#chek4").prop('checked') == true) { p = 1; } else { p = 0 }
      question = '#contentItemOne > h2';
      break;
    case 1:
      showCheckBox('BtnOneShowOne', fieldActivity);
      question = '#contentItemTwo > h2';
      break;
    case 2:
      var valTwo = document.getElementById("userAnswerTwo").value;
      inputText = $('#userAnswerTwo').keyup().val();
      if (inputText) {
        twoQuestion(inputText);
        question = '#contentItemThree > h2';
        break;
      } else {
        showCheckBox('BtnOneShowTwo', currentStatus);

      }

    case 3:
      showCheckBox('BtnOneShowThree', advertisingBudget);
      question = '#contentItemFour > h2';
      break;
    case 4:
      showCheckBox('BtnOneShowFour', currentSite);
      question = '#contentItemFive > h2';
      break;

    case 5:
      showCheckBox('BtnOneShowFive', exceptDevelopment);
      break;
    default:
      break;
  }
  if (divs[i + 1] != divs[t - 1]) {
    if (i == 5 && ($('#radioFourTwo').prop('checked') == true)) {
      w = i + 2;
      width += 20;
      discount += 200;
      print(i, w, width, discount);
      i += 2;
    }
    else {
      w = i + 1;
      width += 20;
      discount += 100;
      print(i, w, width, discount);
      i++;
    }
    back.style.display = "block";
    scheckedId = 1,
      radioId = 1;
  }
  else {
    w = i + 1;
    print(i, w, width, discount);
    $('#add_to_cart').click();
    navAll.style.display = "none";
    bar.style.display = "none";

  }
}

function selectCheckboxText(obj, check, radio_name) {
  if ($("#" + check).prop('checked') == false) {
    document.getElementById(radio_name).value = '';
    $("#" + radio_name).removeClass('inputGroupSpeshAfter');
  }
  if ($(obj).prop('checked') == true) {
    if (scheckedId == 1 || scheckedId == obj.id) {
      scheckedId = obj.id;
      $(obj).prop('disabled', true);
      setTimeout(() => {
        switchScreen();
        buttonOnAndOff(0);
      }, 600);
    }
    else if (scheckedId != obj.id) {
      scheckedId = obj.id;
    }
  }
}
function userAnswer(t1, t2) {
  if (document.getElementById(t1).value == '') {
    $("#" + t2).prop('checked', false);
  }
  else {
    $("#" + t2).prop('checked', true);
    $("#" + t1).addClass('inputGroupSpeshAfter');
    buttonOnAndOff(1);
    var val = document.getElementById(t1).value;
    document.getElementById(t2).value = val;
  }
}
function selectText(obj) {
  $("#" + obj.id).keyup(function () {
    $("#" + obj.id).val().length > 0 ? buttonOnAndOff(1) : buttonOnAndOff(0);
  });
}
$("#userAnswerTwo").keyup(function (event) {
  if (event.keyCode == 13) {
    switchScreen();
  }
});
function allRadio(obj) {
  if ($(obj).prop('checked') == true) {
    if (radioId == 1 || radioId == obj.id) {
      radioId = obj.id;
      $(obj).prop('disabled', true);
      setTimeout(() => {
        switchScreen();
      }, 600);
    }
    else if (radioId != obj.id) {
      radioId = obj.id;
    }
  }
}
btnContPrev.onclick = function () {
  if (divs[i - 1] != divs[0]) {
    if (i == 7 && ($('#radioFourTwo').prop('checked') == true)) {
      w = i - 2;
      width -= 20;
      discount -= 200;
      print(i, w, width, discount);
      i -= 2;
    }
    else {
      w = i - 1;
      width -= 20;
      discount -= 100;
      print(i, w, width, discount);
      i--;
    }

    scheckedId = 1,
      radioId = 1;
  }
  else {
    w = i - 1;
    width -= 20;
    discount -= 100;
    print(i, w, width, discount);
    back.style.display = "none";
    i--;
  }
  $('#sqw-' + i).addClass('sqw-after');
  buttonOnAndOff(1);
};
$('#userAnswerOne').keyup(function () {
  if (document.getElementById("userAnswerOne").value != '') {
    $('#radioOneTen').prop('checked', true);
    buttonOnAndOff(1);
    var valOne = document.getElementById("userAnswerOne").value;
    document.getElementById("radioOneTen").value = valOne;
    if (event.keyCode == 13) {
      btnCont.click();
    }
  }
});

function pageRadioFive(c) {
  if (document.querySelector('input[name="checboxScreenFive"]:checked')) {
    buttonOnAndOff(1);
  }
  else {
    buttonOnAndOff(0);
  }
}
$("#userAnswerFour").keyup(function (event) {
  if (document.getElementById("userAnswerFour").value != '') {
    if (event.keyCode == 13) {
      onward.click();
    }
  }
});
$("#userAnswerOne").keyup(function (event) {
  if (document.getElementById("userAnswerOne").value != '') {
    if (event.keyCode == 13) {
      onward.click();
    }
  }
});
