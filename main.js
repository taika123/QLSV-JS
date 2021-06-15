var studentArr = [];

var addStudent = function (){
    //dom input -- lay value
    var id = document.querySelector('#txtMaSV').value;
    var name = document.querySelector('#txtTenSV').value;
    var type = document.querySelector('#loaiSV').value;
    var math = +document.querySelector('#txtDiemToan').value;
    var schemitry = +document.querySelector('#txtDiemLy').value;
    var physical = +document.querySelector('#txtDiemHoa').value;
    var training = +document.querySelector('#txtDiemRenLuyen').value;

    //validate input 

    checkRequired(id, "#idError") && checkLength (id, "#idError", 6, 10)
    checkRequired(name, "#nameError") && checkLength (id, "#nameError", 4, 30)

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

//create table save profile sinh vien/ hiện ds toàn bộ Sv
var createTable = function(data){
    //cach 1:
    // if(data === undefined){
    //     data = studentArr;
    // }

    //cach 2:
    if(!data){
        data = studentArr;
    }

    var content =  ''

    for (var i = 0; i < data.length ; i++){
        content += `
            <tr>
                <td> ${data[i].id} </td>
                <td> ${data[i].name} </td>
                <td> ${data[i].type} </td>
                <td> 9.6 </td>
                <td> ${data[i].training} </td>
                <td>
                    <button onclick="deleteStudent('${data[i].id}')" class="btn btn-danger"> Xóa </button>
                    <button onclick="getStudentToUpdate('${data[i].id}')" class="btn btn-info"> Sửa </button>
                </td>
            </tr>    
        `
       // console.log(content)
    }
    document.querySelector('#tbodySinhVien').innerHTML = content;
}

//function 3: Xóa sinh viên ra khỏi ds
var deleteStudent = function (id){
    //tim vi tri theo id 
    var index = findById(id)
    
    if(index !== -1){
        studentArr.splice(index, 1)
        createTable();

        saveData();
    }
}

//function 4: lấy sinh viên muốn sửa
var getStudentToUpdate = (id) =>{
    var index = findById(id);
    //=> sinh viên cần sửa: StudentArr[index]

    document.querySelector("#txtMaSV").value = studentArr[index].id;
    document.querySelector("#txtTenSV").value = studentArr[index].name;
    document.querySelector("#loaiSV").value = studentArr[index].type;
    document.querySelector("#txtDiemToan").value = studentArr[index].math;
    document.querySelector("#txtDiemLy").value = studentArr[index].physical;
    document.querySelector("#txtDiemHoa").value = studentArr[index].schemitry;
    document.querySelector("#txtDiemRenLuyen").value = studentArr[index].training;

    //document.querySelector("#txtMaSV").style.backgroundColor = "red";
    //document.querySelector("#txtMaSV").setAttribute("style", "background-color: green");
    //setAttribute: id, class, style, disabled...
   
    document.querySelector("#txtMaSV").setAttribute('disabled', true);
    
    document.querySelector("#btnAdd").style.display = "none";
    document.querySelector("#btnUpdate").style.display = "inline"
    
}
//function 4.2 : lưu thông tin đã chỉnh sửa
var updateStudent = () => {
    var id = document.querySelector('#txtMaSV').value;
    var name = document.querySelector('#txtTenSV').value;
    var type = document.querySelector('#loaiSV').value;
    var math = document.querySelector('#txtDiemToan').value;
    var physical = document.querySelector('#txtDiemLy').value;
    var schemitry = document.querySelector('#txtDiemHoa').value;
    var training = document.querySelector('#txtDiemRenLuyen').value;

    // tìm id của SV 
    var index = findById(id) 
        studentArr[index].name = name;
        studentArr[index].type = type;
        studentArr[index].math = math;
        studentArr[index].physical = physical;
        studentArr[index].schemitry = schemitry;
        studentArr[index].training = training;

        createTable();
        saveData();

        //clear form 
        document.querySelector("#btnReset").click();

        // ẩn btn cập nhật, hiện button add
        document.querySelector("#btnAdd").style.display = "inline";
        document.querySelector("#btnUpdate").style.display = "none";

        //gỡ disabled cho ô mã SV
        document.querySelector("#txtMaSV").removeAttribute("disabled");
} 

//function 5: tìm kiếm sinh viên
var findStudents = function() {
    var result = [];
    var keyword = document.querySelector("#txtSearch").value.toLowerCase();

    for(var i=0; i< studentArr.length; i++){
        var studentName = studentArr[i].name.toLowerCase();
        if(
            studentArr[i].id === keyword || studentName.includes(keyword)
        ){
            result.push(studentArr[i]);
        }
    }

    createTable(result);
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

//save data -> localStorage -> get data -> UI 
var saveData = function(){
    //console.log(JSON.stringify(studentArr))
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

//----Vidations input : required , minlength , maxlength, patter................................
var checkRequired = (value , errorId) => {
    if(value.length > 0){
        document.querySelector(errorId).innerHTML = "";
        return true;
    }
    document.querySelector(errorId).innerHTML = "*Bạn chưa nhập:  <br/> *Hàng này bắt buộc nhập";
    return false;
}

var checkLength = (value, errorId, minLength, maxLength) => {
    if(value.length >= minLength && value.length <= maxLength){
        document.querySelector(errorId).innerHTML = "";
        return true;
    }
    document.querySelector(errorId).innerHTML = `*Giá trị phải từ ${minLength} tới ${maxLength} kí tự`;
    return false;
}