var WebName = document.getElementById('name');
var WebUrl = document.getElementById('url');
var submit = document.getElementById('submit');
var rows = document.getElementById('rows');
var length = document.getElementById("name").length;
var btnTwo = document.getElementById("btnTwo");
var linkArr = [];

if (localStorage.getItem('links') != null) {
   linkArr = JSON.parse(localStorage.getItem('links'))
   display(linkArr)
}

function button(){
    if(document.getElementById("name").className == "form-control form-success mb-3" && document.getElementById("url").className == "form-control form-success" && document.getElementById("url").value != '' && document.getElementById('name').value != '')
    {
         submit.className = "btn btn-danger w-auto"
         btnTwo.className = 'btn btn-danger w-auto d-none'
    }
    else{
        submit.className = "btn btn-danger w-auto  d-none"
        btnTwo.className = 'btn btn-danger w-auto'
    }
}

submit.onclick = function() {    
        addURL();
        clearform();
};

function addURL(){
    var url = {
        WebName: WebName.value,
        webUrl: WebUrl.value
    }
    linkArr.push(url);
    localStorage.setItem('links', JSON.stringify(linkArr))
    display(linkArr)
}


function display(list) {
    var box = '';
    for (var i = 0; i < list.length; i++) {
       box += `
       <tr>
            <td class="text-center">${i+1}</td>
            <td class="text-center">${list[i].WebName}</td>
            <td class="text-center"><button class="btn btn-success" onclick="window.open('${'https://' + list[i].webUrl}')"><i class="fas fa-eye"></i> Visit</button></td>
            <td class="text-center"><button class="btn btn-danger"  onclick="delFunc(${i})"><i class="fas fa-trash-can"></i> Delete</button></td>
       </tr>
       `
    }
    rows.innerHTML = box;
}


function delFunc(num) {
    linkArr.splice(num, 1)
    localStorage.setItem('links', JSON.stringify(linkArr))
    display(linkArr)
 }

function letCount(input){
    input = String(input.value);
    if(input.length == 3 || input.length > 3){
        document.getElementById("name").className = "form-control form-success mb-3"
    }
    else{
        document.getElementById("name").className = "form-control form-error mb-3"
    }
}

function isValidURL(string) {
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
};
  

function letVal(input){
    input = String(input.value);
    if(isValidURL(input) == true){
        document.getElementById("url").className = "form-control form-success"
    }
    else{
        document.getElementById("url").className = "form-control form-error"
    }
}

function clearform()
{
    WebName.value = ''
    WebUrl.value = ''
}

