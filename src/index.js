import './Todolist.css';
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

window.onload=()=>{

//Project Module
const project_creator=(name,period,type)=>{
    
    let title=name;
    let date=period;
    let category=type;
    const LIST_INFO=[];

    return {
        title,
        date,
        category,
        LIST_INFO
         };
}



//Todolist Module
const todolist_item_creator=(name,period,range,look,identifier)=>{

    let title=name;
    let date=period;
    let time=range;
    let color=look;
    let id=identifier;

    return {
        title,
        date,
        time,
        color,
        id
         };
}



//DOM Elements Module 
const DOM_BUILDER=(()=>{

      //Grab all dom elements
      const NEW_PROJECT_BUTTON=document.getElementById('NEW_PROJECT_BUTTON');
      const SHORTCUT_BOX=document.getElementById('SHORTCUT_BOX');
      const RIGHT_BOXES_CONTAINER=document.getElementById('RIGHT_BOXES_CONTAINER');
      const PROJECT_BOX=document.getElementById('PROJECT_BOX');
      const CALENDAR_BOX=document.getElementById('CALENDAR_BOX');
      const NEW_PROJECT_INPUTS=document.getElementsByClassName('NEW_PROJECT_INPUTS');
      const NEW_PROJECT_SUBMIT=document.getElementById('NEW_PROJECT_SUBMIT');
      const CURRENT_PROJECT_INFO=document.getElementById('CURRENT_PROJECT_INFO');
      const ADD_MORE_BTN=document.getElementById('ADD_MORE');
      const TODOLIST_SUBMIT=document.getElementById('TODOLIST_SUBMIT');

      //Stores the links that are displayed in the shortcut box
      const SHORTCUT_BOX_ARRAY=[];
      //Stores the individual todolist boxes
      let todolist_items_array=[];
      let todolist_item_container;
      let add_more_iterator=1;
      let todolist_iterator=0;
      let shortcut_iterator=0;
      let input_arr=Array.from(NEW_PROJECT_INPUTS);
      //2 Factory Functions
      let your_project;
      let your_todolist_item;

      ////////////////////////////////////////////////////////////////
      //LOADS THE PROJECT SETUP PAGE
      NEW_PROJECT_BUTTON.addEventListener('click', function create_project_setup() {
        
            PROJECT_BOX.setAttribute('style','min-height:80%;');
            CALENDAR_BOX.setAttribute('style','height:20%;');
            NEW_PROJECT_BUTTON.style.display='none'; 
            NEW_PROJECT_SUBMIT.style.display='block'; 

            input_arr.forEach(item=> {

                  item.setAttribute('style', 'display:block;');
              
            });
          });
      ////////////////////////////////////////////////////////////////

        //LOADS THE TODOLIST PAGE
        NEW_PROJECT_SUBMIT.addEventListener('click', function create_todolist_page() {
    
            //call the project module
            your_project=project_creator(input_arr[0].value, input_arr[1].value,input_arr[2].value);
            input_arr.forEach(item=>{item.style.display='none';});
            NEW_PROJECT_SUBMIT.style.display='none'; 
            
            //create a div that overheads your current project info
            CURRENT_PROJECT_INFO.style.display='block';
            CURRENT_PROJECT_INFO.innerHTML=your_project.title;

            //creates the todolist boxes and submit button
            todolist_item_container=document.createElement('div');
            PROJECT_BOX.appendChild(todolist_item_container);
            todolist_item_container.setAttribute('style','background-color:red; width:50%; height:50%;');
            PROJECT_BOX.insertBefore(todolist_item_container,TODOLIST_SUBMIT);
            todolist_items_array.push(todolist_item_container);

            const TODOLIST_DESCRIPTION_BOX=document.createElement('textarea');
            const TODOLIST_TIME_BOX=document.createElement('input');
            const TODOLIST_DATE_BOX=document.createElement('input');
            const TODOLIST_COLOR_BOX=document.createElement('select');

            todolist_item_container.appendChild(TODOLIST_DESCRIPTION_BOX);
            todolist_item_container.appendChild(TODOLIST_TIME_BOX);
            todolist_item_container.appendChild(TODOLIST_DATE_BOX);
            todolist_item_container.appendChild(TODOLIST_COLOR_BOX);
            TODOLIST_SUBMIT.style.display='block';

            //CREATE TODOLIST ITEM BUTTON
            ADD_MORE_BTN.style.display='block';
            PROJECT_BOX.insertBefore(todolist_item_container,ADD_MORE_BTN);
     ////////////////////////////////////////////////////////////////
          });

          ADD_MORE_BTN.addEventListener('click', function add_new_item() {
          
                todolist_items_array.push(document.createElement('div'));
         
                while (add_more_iterator<todolist_items_array.length) {
          
                      PROJECT_BOX.appendChild(todolist_items_array[add_more_iterator]);
                      todolist_items_array[add_more_iterator].setAttribute('style','background-color:red; width:50%; height:50%;');
                      todolist_items_array[add_more_iterator].appendChild(document.createElement('textarea'));
                      todolist_items_array[add_more_iterator].appendChild(document.createElement('input'));
                      todolist_items_array[add_more_iterator].appendChild(document.createElement('input'));
                      todolist_items_array[add_more_iterator].appendChild(document.createElement('select'));
                      PROJECT_BOX.insertBefore(todolist_items_array[add_more_iterator],ADD_MORE_BTN);
                      add_more_iterator++;
                  }

          });

      /////////////////////////////////////////////////////////////////
          //erase the dom and publish your to do list items...associate them with current project 
          TODOLIST_SUBMIT.addEventListener('click', function publish_todolist_items() {
                  
                todolist_iterator=0;

                while (todolist_iterator<todolist_items_array.length) {
                        your_todolist_item=todolist_item_creator( 
                        todolist_items_array[todolist_iterator].children[0].value,
                        todolist_items_array[todolist_iterator].children[1].value,
                        todolist_items_array[todolist_iterator].children[2].value,
                        todolist_items_array[todolist_iterator].children[3].value,your_project.title); 
                        
                        //PUSHES YOUR INFO INTO THE SHORTCUT BOX
                        if (your_todolist_item.id==your_project.title) { 
                             
                              //pushes your todolist item info into an object within the project module                       
                              your_project.LIST_INFO.push(your_todolist_item); 
                        };
                        //get rid of the excess todolist boxes
                        todolist_items_array[todolist_iterator].style.display='none';
                        todolist_iterator++;
                }

                console.log(your_project);

                SHORTCUT_BOX_ARRAY.push(your_project);
                //CREATES AN ARRAY OF LINKS
                const SHORTCUT_BOX_link=document.createElement('a');
                SHORTCUT_BOX_link.href='#';
                SHORTCUT_BOX.appendChild(SHORTCUT_BOX_link);
                SHORTCUT_BOX_link.innerHTML=SHORTCUT_BOX_ARRAY[shortcut_iterator].title;

                //Put this in the reset function
                shortcut_iterator++;

                //Reset function
                CURRENT_PROJECT_INFO.style.display='none';
                CURRENT_PROJECT_INFO.innerHTML='';
                todolist_item_container.style.display='none';
                todolist_item_container='';
                TODOLIST_SUBMIT.style.display='none';
                // cont. COME BACK TO CREATE LOOP ON THIS PART
                input_arr[0].value='';
                input_arr[1].value='';
                NEW_PROJECT_SUBMIT.style.display='none';
                NEW_PROJECT_BUTTON.style.display='block';
                //info paste to the right project
                your_project=null;
                your_todolist_item=null;
                add_more_iterator=1;
                todolist_items_array=[];
                 
                });
      
        })();

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