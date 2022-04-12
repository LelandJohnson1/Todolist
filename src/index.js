import './Todolist.css';
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

window.onload=()=>{

const new_project_button=document.getElementById('new_project_button');

new_project_button.addEventListener('click', function create_project() {

    const box=document.getElementById('shortcut_box');
    box.setAttribute('style','width:100%; height:15%; display:block; position:fixed;');

    const box2=document.getElementById('right_boxes_container');
    box2.setAttribute('style','width:100%; height:100%;');

    const box3=document.getElementById('project_box');
    box3.setAttribute('style','height:85%;');

    const box4=document.getElementById('calendar_box');
    box4.setAttribute('style','height:15%;');

    });

}

/*
var id = null;
function myMove() {
  var elem = document.getElementById("myAnimation");   
  var pos = 0;
  clearInterval(id);
  id = setInterval(frame, 10);
  function frame() {
    if (pos == 350) {
      clearInterval(id);
    } else {
      pos++; 
      elem.style.top = pos + 'px'; 
      elem.style.left = pos + 'px'; 
    }
  }
}
*/





