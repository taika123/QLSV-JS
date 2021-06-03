var studentArr = [];

var addStudent = function (){
    //dom input -- lay value
    var id = document.querySelector('#txtMaSV').value;
    var name = document.querySelector('#txtTenSV').value;
    var type = document.querySelector('#loaiSV').value;
    var math = document.querySelector('#txtDiemToan').value;
    var schemitry = document.querySelector('#txtDiemLy').value;
    var physical = document.querySelector('#txtDiemHoa').value;
    var training = document.querySelector('#txtDiemRenLuyen').value;

    for(var i = 0 ; i < studentArr.length ; i++){
        if(studentArr[i].id === id){
            console.log('Ma SV da ton tai');
            return ; 
           }
   }
   //tao doi tuong sinh vien 
   var newStudent = new Student(
       id,
       name,
       type,
       math,
       schemitry,
       physical,
       training
   )
       
   
   //push doi tuong sinh vien vao studentArr
       studentArr.push(newStudent)
       createTable();
       saveData();
       console.log(studentArr)
}

//create table save profile sinh vien
var createTable = function(){
    var content =  ''
    for (i = 0; i < studentArr.length ; i++){
        content += `
            <tr>
                <td> ${studentArr[i].id} </td>
                <td> ${studentArr[i].name} </td>
                <td> ${studentArr[i].type} </td>
                <td> 9.6 </td>
                <td> ${studentArr[i].training} </td>
                <td>
                    <button onclick="deleteStudent('${studentArr[i].id}')" class="btn btn-danger"> Xóa </button>
                </td>
            </tr>    
        `
        console.log(content)
    }
    document.querySelector('#tbodySinhVien').innerHTML = content;
}

//save data -> localStorage -> get data -> UI 
var saveData = function(){
    console.log(JSON.stringify(studentArr))
    localStorage.setItem('student', JSON.stringify(studentArr))
}

// get data = fetch

var fetchData = function(){
    var studentJSON = localStorage.getItem ('student')
    if(studentJSON !== null){
        studentArr = JSON.parse(studentJSON)
        createTable();
    }
}
fetchData();

//function 3: Xóa sinh viên ra khỏi ds
var deleteStudent = function (id){
    //tim vi tri theo id 
    var index = findById(id)
    
    if(index !== -1){
        studentArr.splice(index, 1)
        createTable();
    }
}

var findById  = function (id){
    for (var i = 0; i < studentArr.length; ++i){
        if(studentArr[i].id === id){
            return i ;
        }
    }
    return -1;
    //return vi tri, return -1
}