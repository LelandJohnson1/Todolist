
import './Todolist.css';
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
//generates calendar 
import calendar from 'calendar-js';
import { format } from 'date-fns';


window.onload=()=>{


//Project Module
const project_creator=(name,date,category)=>{

const LIST_INFO=[];

return {
name,
date,
category,
LIST_INFO
};
}


//Todolist Module
const todolist_item_creator=(name,time,date,checkmark,identifier)=>{

return {
name,
date,
time,
checkmark,
identifier
};
}



//DOM Elements Module 
const DOM_BUILDER=(()=>{

//2 Factory Functions
let your_project;
let your_todolist_item;

const SHORTCUT_BOX_ARRAY=[]; //Stores the links that are displayed in the shortcut box

//Grab all dom elements
const NEW_PROJECT_BUTTON=document.getElementById('NEW_PROJECT_BUTTON');
const SHORTCUT_BOX=document.getElementById('SHORTCUT_BOX');
const PROJECT_BOX=document.getElementById('PROJECT_BOX');
const NEW_PROJECT_INPUTS_CONTAINER=document.getElementById('NEW_PROJECT_INPUTS_CONTAINER');
const TDATA=document.getElementsByTagName('td'); 
const FORWARD_BUTTON=document.getElementById('fwd_btn');
const BACK_BUTTON=document.getElementById('back_btn');
const NEW_PROJECT_INPUTS=document.getElementsByClassName('NEW_PROJECT_INPUTS');
const NEW_PROJECT_SUBMIT=document.getElementById('NEW_PROJECT_SUBMIT');
const CURRENT_PROJECT_INFO=document.getElementById('CURRENT_PROJECT_INFO');
const ADD_MORE_BTN=document.getElementById('ADD_MORE');
const MARK_AS_COMPLETE=document.getElementById('MARK_AS_COMPLETE');
const UNPUBLISH=document.getElementById('UNPUBLISH');
const CANCEL_BUTTON=document.getElementById('CANCEL_BUTTON');
const TODOLIST_SUBMIT=document.getElementById('TODOLIST_SUBMIT');
const ERROR=document.createElement('div');
ERROR.classList.add('error_box');


////////////////////////////////////////////////////////////////
//LOADS THE PROJECT SETUP PAGE
NEW_PROJECT_BUTTON.addEventListener('click', function create_project_setup() {

NEW_PROJECT_BUTTON.style.display='none'; 
NEW_PROJECT_SUBMIT.style.display='block'; 
CANCEL_BUTTON.style.display='block'; 
NEW_PROJECT_INPUTS_CONTAINER.setAttribute('style','display:block;');

let input_arr=Array.from(NEW_PROJECT_INPUTS);
input_arr.forEach(item=> {

item.setAttribute('style', 'display:block;');

});
});
////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////
//CREATES OBJECTS USED FOR STORING AND DISPLAYING LINKS FROM THE CALENDAR BOXES/GENERATOR TRIGGERS THE LINK PLACEMENT ACTION

const OBJECT_ARR=[]; //Stores the objects
let important_number=0;

const DATE_OBJ_CREATOR=(pass1,pass2,year,month,dayofweek)=> {

let iterator=0;
let input_arr=Array.from(NEW_PROJECT_INPUTS);
let your_project_date;
const MONTHS=calendar().months();


if (pass1==null && pass2==true) {
  your_project_date=format(new Date(parseInt(your_project.date.slice(0,4)), parseInt(your_project.date.slice(6,7))-1), 'MMMM y');  
}

function project_display(i,j,pass1) { 

let div_storage=Array.from(TDATA)[iterator];

if (pass1==undefined) {
while (div_storage.children) {  //cleans out the divs that are created in the below for loop to avoid duplicate divs 
//when it loops over the correct match twice.

if (div_storage.lastChild==null) {
  break;
}
if (div_storage.lastChild.nodeName=='DIV') { //Took me hours to figure out that this has to be capitalized 
  div_storage.removeChild(div_storage.lastChild);
}
else { 
break;
}}}

//////////////////////////

for (let key in OBJECT_ARR[i][j].date_info) {

if (OBJECT_ARR[i][j].date_info[key].date==MONTH_YEAR_ITEM.innerHTML && pass1!=true) { 
div_storage.appendChild(document.createElement('div')); 
div_storage.children[parseInt(key)].innerHTML=OBJECT_ARR[i][j].date_info[key].title;
div_storage.children[parseInt(key)].setAttribute('style', 'cursor:pointer;');
div_storage.children[parseInt(key)].addEventListener('click', function () { // link-repopulate page 
REPOPULATE(this.innerHTML);
});     
}
if (OBJECT_ARR[i][j].date_info[key].date==your_project_date && OBJECT_ARR[i][j].date_info[key].title==your_project.name && pass1==true) { 
//for mark as complete,unpublish functions-deletes your project from dom
  div_storage.removeChild(div_storage.children[important_number]);
  pass1=false;
  important_number=0;
break;
}
else if (pass1==true) { important_number++} //only iterate this number when pass1 is true
}
iterator++;
}

///////////////////////////

for (let i=0;i<5; i++) {

if (pass1==undefined) {
  OBJECT_ARR.push([]); 
}

for (let j=0;j<7; j++) {
if (pass1==true) { 

let month_day_arr=calendar().detailed(year,month-1).calendar;

if (month_day_arr[i][j].day==dayofweek && month_day_arr[i][j].isInPrimaryMonth!=false) { 
  OBJECT_ARR[i][j].date_info.push({title:input_arr[0].value, date:MONTHS[month-1] + " " + year.toString()});
}

project_display(i,j);  

}

else if (pass1==false) {project_display(i,j);}

else if (pass2==true || pass1===null) { //for mark as complete, unpublish functions-deletes your project from date info array

project_display(i,j,true);
important_number=0;

if (OBJECT_ARR[i][j].date_info[important_number]!=undefined) {

if (OBJECT_ARR[i][j].date_info[important_number].date==your_project_date && OBJECT_ARR[i][j].date_info[important_number].title==your_project.name) { 
  OBJECT_ARR[i][j].date_info.splice(important_number,1); 
break;

}}}

else {
let innerobj=Object.create({});
innerobj.index={day:j,week:i};
innerobj.date_info=[];
OBJECT_ARR[i].push(innerobj);

}}}}

DATE_OBJ_CREATOR();

////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////
//Vars for Calendar functions

const MONTH_YEAR_ITEM=document.getElementById('month_year_item');
const DATE=new Date();
let year_iterator=DATE.getFullYear();

const MONTHS=calendar().months();
let month_store=DATE.getMonth();

MONTH_YEAR_ITEM.innerHTML= MONTHS[DATE.getMonth()]+ " "+ year_iterator; //default display date 
BACK_BUTTON.style.display='none';

////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////
//CALENDAR FUNCTION / PUTS THE CORRECT NUMBERS IN THE BOXES PER THE DATE

const CALENDAR_GENERATOR=()=>{ 

let table_box_iterator=0;
let month_day_arr=calendar().detailed(year_iterator,month_store).calendar;

for (let arr of month_day_arr) { 

for (let k=0; k<arr.length; k++) {  

if (arr[k].isInPrimaryMonth==false) {
  Array.from(TDATA)[table_box_iterator].innerHTML='';
}

else if (Array.from(TDATA)[table_box_iterator]==undefined) {
  break;
} 

else { 
  Array.from(TDATA)[table_box_iterator].innerHTML=parseInt(arr[k].day);    
} 

table_box_iterator++;
}}}

//For the default current date
CALENDAR_GENERATOR();

////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////
//FORWARD AND BACK BUTTONS
FORWARD_BUTTON.addEventListener('click', function next_date() {


if (MONTH_YEAR_ITEM.innerHTML==MONTHS[DATE.getMonth()]+ " "+ DATE.getFullYear()) {
  BACK_BUTTON.style.display='block';
}

if (MONTH_YEAR_ITEM.innerHTML=='December 2039') {
  FORWARD_BUTTON.style.display='none';
}

else if (month_store>=11) {
month_store=0;
year_iterator+=1;
MONTH_YEAR_ITEM.innerHTML= (MONTHS[month_store]+" "+ year_iterator).toString();
}

else {
month_store+=1;
MONTH_YEAR_ITEM.innerHTML= (MONTHS[month_store]+" "+ year_iterator).toString();
} 

CALENDAR_GENERATOR();
DATE_OBJ_CREATOR(false);

});

BACK_BUTTON.addEventListener('click', function previous_date() {

//the plus one prevents spillover from a month before the current month
if (MONTH_YEAR_ITEM.innerHTML==MONTHS[DATE.getMonth()+1]+ " "+ DATE.getFullYear()) {
BACK_BUTTON.style.display='none';
}

if (MONTH_YEAR_ITEM.innerHTML=='January 2040') {
FORWARD_BUTTON.style.display='block';
}

else if (month_store<=0) {
month_store=11;
year_iterator-=1;
MONTH_YEAR_ITEM.innerHTML= (MONTHS[month_store]+" "+ year_iterator).toString();
}

else {
month_store-=1;
MONTH_YEAR_ITEM.innerHTML= (MONTHS[month_store]+" "+ year_iterator).toString(); 
}    

CALENDAR_GENERATOR();
DATE_OBJ_CREATOR(false);
});
////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////
//VARS FOR SUBMIT BUTTONS

let todolist_items_array=[]; //Stores the individual todolist boxes

let todolist_item_master_container;
let todolist_item_container;
let todolist_item_container_after;

let value_match=true; //checks to see if a match was found in shortcutbox array

////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////
//LOADS THE TODOLIST PAGE / VALIDATES THE PROJECT DATE
NEW_PROJECT_SUBMIT.addEventListener('click', function create_todolist_page() {

let input_arr=Array.from(NEW_PROJECT_INPUTS);

//date validation
try {


for (let i=0; i<SHORTCUT_BOX_ARRAY.length;i++) {

if (input_arr[0].value==SHORTCUT_BOX_ARRAY[i].name) {

throw 'That project aready exists';
}
}

if (input_arr[1].value.match(/[^0-9]/g)!=null && input_arr[1].value.match(/-/g)==null) { 

input_arr[1].value=''; throw 'Please use numbers only';
}

if (input_arr[1].value.length!=10 || input_arr[1].value.length>10) {

input_arr[1].value=''; throw 'You have a length issue';
}

let date_arr=Array.from(input_arr[1].value);
let date_separator=date_arr.splice(0,4);
let date_string=date_separator.join('');
let date_number=parseInt(date_string);
let year=date_number;

if (date_number<DATE.getFullYear() || date_number>2040 || date_string.match(/-/g)=='-') {

input_arr[1].value=''; throw 'Year problem';
}

date_separator=date_arr.splice(1,2);
date_string=date_separator.join('');
date_number=parseInt(date_string);
let month=date_number;

if (date_number>12 || date_string=='00'|| date_string.match(/\b[2-9]/)!=null || date_string.match(/-/g)=='-') {

input_arr[1].value=''; throw 'Month problem';
}

date_separator=date_arr.splice(2,2);
date_string=date_separator.join('');
date_number=parseInt(date_string);
let dayofweek=date_number;

if (date_number>31 || month-1<DATE.getMonth() || date_string.match(/-/g)=='-') {

input_arr[1].value=''; throw 'Day problem';
}

if (input_arr[1].value[4]!='-' || input_arr[1].value[7]!='-') {

input_arr[1].value=''; throw 'You have a braket issue';
}

let validate=calendar().validate(year, month-1, dayofweek);

if (validate==false) {

throw 'Date does not exist';
}

if (input_arr[2].value=='') {

throw 'Please define a category';
} 


else {     

//call the project module
your_project=project_creator(input_arr[0].value, input_arr[1].value,input_arr[2].value);

CATEGORY_CREATOR();
DATE_OBJ_CREATOR(true,null,year,month,dayofweek);

input_arr.forEach(item=>{item.style.display='none';});

NEW_PROJECT_SUBMIT.style.display='none'; 


//create a div that overheads your current project info
CURRENT_PROJECT_INFO.style.display='block';
CURRENT_PROJECT_INFO.innerHTML=your_project.name + " " + your_project.date + " " + your_project.category;

TODOLIST_SUBMIT.style.display='inline-block';

ADD_MORE_BTN.style.display='inline-block'; //CREATE TODOLIST ITEM ADD MORE BUTTON

MARK_AS_COMPLETE.style.display='inline-block';
MARK_AS_COMPLETE.value='Done!';

UNPUBLISH.style.display='inline-block';
UNPUBLISH.value='Unpublish';

todolist_item_master_container=document.createElement('div');
todolist_item_master_container.classList.add('todolist_item_master_container');
//creates the todolist boxes and submit button
todolist_item_container=document.createElement('div');
todolist_item_container.classList.add('todolist_box');
//creates the div after the todolist box
todolist_item_container_after=document.createElement('div');
todolist_item_container_after.classList.add('todolist_box_after');

PROJECT_BOX.appendChild(todolist_item_master_container);
todolist_item_master_container.appendChild(todolist_item_container);
todolist_item_master_container.appendChild(todolist_item_container_after);

todolist_items_array.push(todolist_item_master_container); //Default first todolist box

const TODOLIST_DESCRIPTION_BOX=document.createElement('textarea');
TODOLIST_DESCRIPTION_BOX.value='Description';
const TODOLIST_TIME_BOX=document.createElement('input');
TODOLIST_TIME_BOX.value='Time';
const TODOLIST_DATE_BOX=document.createElement('input');
TODOLIST_DATE_BOX.value='Date';
const TODOLIST_CHECKBOX=document.createElement('input');
TODOLIST_CHECKBOX.type='checkbox';

//animation
let width=0;
TODOLIST_CHECKBOX.addEventListener('click', function () {
let arr=Array.from(todolist_item_container.children);
arr.forEach(item=>{item.style['background-color']='rgb(71, 58, 64)';});
let id = null; //stores the timer value
let elem=document.getElementById("dash-animated_object");   
let elem_container=document.getElementById("dash-animation_container");   
todolist_item_container.appendChild(elem_container);

function myMove() {
elem.style.display='block';
elem_container.style.display='block';
clearInterval(id); //clear the timer value
id = setInterval(frame, 0.1);

function frame() {
if (TODOLIST_CHECKBOX.checked==true) {
if (width==60) {
clearInterval(id);
} 
else {
width+=1; 
elem.style.width=width + '%'; 
}}

if (TODOLIST_CHECKBOX.checked==false) {
if (width==0) {
  arr=Array.from(todolist_item_container.children);
  arr.forEach(item=>{item.style['background-color']='rgb(255, 208, 0)';});
    clearInterval(id);
    } 
else {
      width-=1; 
      elem.style.width=width + '%'; 
      }
}}}

myMove();});

const DELETE=document.createElement('button');
DELETE.innerHTML='X';
DELETE.addEventListener('click', function () {
  console.log(this.parentNode)
  delete_box(this.parentNode);
});

todolist_item_container.appendChild(TODOLIST_DESCRIPTION_BOX).classList.add('todolist_box_inputs');
todolist_item_container.appendChild(TODOLIST_TIME_BOX).classList.add('todolist_box_inputs');
todolist_item_container.appendChild(TODOLIST_DATE_BOX).classList.add('todolist_box_inputs');
todolist_item_container_after.appendChild(DELETE).classList.add('todolist_box_delete_box');
todolist_item_container_after.appendChild(TODOLIST_CHECKBOX);

ERROR.style.display='none';

}     
}
catch (err) {

  PROJECT_BOX.appendChild(ERROR);
  ERROR.innerHTML=err;

  PROJECT_BOX.insertBefore(ERROR,CANCEL_BUTTON);
  ERROR.style.display='block';
  
  }
});

////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////
//ADDS MORE TODOLIST ITEM BOXES
ADD_MORE_BTN.addEventListener('click', function add_new_item() {

let iterator=todolist_items_array.length;
todolist_items_array.push(document.createElement('div'));

const TODOLIST_CHECKBOX=document.createElement('input');
TODOLIST_CHECKBOX.type='checkbox';
const DELETE=document.createElement('button');

while (iterator<todolist_items_array.length) {

PROJECT_BOX.appendChild(todolist_items_array[iterator]);

 let todolist_box=todolist_items_array[iterator].appendChild(document.createElement('div'));
 let todolist_box_after=todolist_items_array[iterator].appendChild(document.createElement('div'));

 todolist_box.classList.add('todolist_box');
 todolist_box_after.classList.add('todolist_box_after');

todolist_items_array[iterator].classList.add('todolist_item_master_container');
todolist_box.appendChild(document.createElement('textarea')).classList.add('todolist_box_inputs');
todolist_box.appendChild(document.createElement('input')).classList.add('todolist_box_inputs');
todolist_box.appendChild(document.createElement('input')).classList.add('todolist_box_inputs');
todolist_box_after.appendChild(DELETE).classList.add('todolist_box_delete_box');
todolist_box_after.appendChild(TODOLIST_CHECKBOX);

//animation
let width=0;
let elem=document.createElement('div');  
elem.classList.add('dash-animated_object');
let elem_container=document.createElement('div'); 
elem_container.classList.add('dash-animation_container');  

TODOLIST_CHECKBOX.addEventListener('click', function () {
let arr=Array.from(todolist_box.children);
arr.forEach(item=>{item.style['background-color']='rgb(71, 58, 64)';});
let id = null; //stores the timer value
elem_container.appendChild(elem);
todolist_box.appendChild(elem_container);

function myMove() {
elem.style.display='block';
elem_container.style.display='block';
clearInterval(id); //clear the timer value
id = setInterval(frame, 0.1);

function frame() {
if (TODOLIST_CHECKBOX.checked==true) {
if (width==60) {
clearInterval(id);
} 
else {
width+=1; 
elem.style.width=width + '%'; 
}}

if (TODOLIST_CHECKBOX.checked==false) {
if (width==0) {
    clearInterval(id);
    } 
else {
  arr=Array.from(todolist_box.children);
  arr.forEach(item=>{item.style['background-color']='rgb(255, 208, 0)';});
      width-=1; 
      elem.style.width=width + '%'; 
      }
}}}

myMove();});


DELETE.innerHTML='X';
DELETE.addEventListener('click', function () {  
  delete_box(this.parentNode);
});

break;
}
});
/////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////
//CREATES THE LINKS AND CATEGORIES
const CATEGORY_CREATOR=(pass)=> { 

if (pass==undefined) {
  let input_arr=Array.from(NEW_PROJECT_INPUTS);
  const SHORTCUT_BOX_link=document.createElement('p');
  SHORTCUT_BOX_link.setAttribute('style', 'cursor:pointer;');
  
if (SHORTCUT_BOX_ARRAY.length!=0) { //Post to category that already exist
  console.log(SHORTCUT_BOX_ARRAY);

for (let i=0; i<SHORTCUT_BOX_ARRAY.length;i++) {

if (input_arr[2].value==SHORTCUT_BOX_ARRAY[i].category) { 
  console.log('yes');
  SHORTCUT_BOX.children[i+1].appendChild(SHORTCUT_BOX_link); 
  SHORTCUT_BOX_link.innerHTML=input_arr[0].value;
  value_match=true;
  SHORTCUT_BOX_ARRAY.push(your_project);
  break;
}

else if (i==SHORTCUT_BOX_ARRAY.length-1) {
  value_match=false; 
}}}

/////////////////////////

if (value_match==false || SHORTCUT_BOX_ARRAY.length==0 ) { //Create a new category

SHORTCUT_BOX_ARRAY.push(your_project);

if (value_match==true) { 
  
  let default_div_container=SHORTCUT_BOX.appendChild(document.createElement('div')); //create most recent
  default_div_container.innerHTML='MOST RECENT PROJECTS';
}

let div_container=SHORTCUT_BOX.appendChild(document.createElement('div'));   //Creates new category
div_container.innerHTML=input_arr[2].value;
div_container.appendChild(SHORTCUT_BOX_link);
SHORTCUT_BOX_link.innerHTML=input_arr[0].value;
}

const DEFAULT_link=document.createElement('p'); //Auto places your category to the Most recent projects section
DEFAULT_link.setAttribute('style', 'cursor:pointer;');
console.log(SHORTCUT_BOX.children); //use children instead if problems persist
SHORTCUT_BOX.children[0].appendChild(DEFAULT_link); //this is the problem-for some reason two extra text nodes exist at begin of project
DEFAULT_link.innerHTML=input_arr[0].value;

SHORTCUT_BOX_link.addEventListener('click', function () {
  REPOPULATE(this.innerHTML);
});

DEFAULT_link.addEventListener('click', function () {
  REPOPULATE(this.innerHTML);
});
}

/////////////////////////
//MARK AS COMPLETE
else if  (pass==true) { // delete project names from the dom and shortcut box array

let j=0;
let shortcut_box_categories=Array.from(SHORTCUT_BOX.children);

while (j<shortcut_box_categories.length) {

for (let k=0; k<shortcut_box_categories[j].children.length; k++) {

if (shortcut_box_categories[j].children[k].innerHTML==your_project.name) { 
if (j==0) { //DO ONCE
  SHORTCUT_BOX_ARRAY.splice(k,1);
}
shortcut_box_categories[j].children[k].remove();
if (shortcut_box_categories[j].children.length==0) { //Delete the category if nothing is inside of it
  shortcut_box_categories[j].remove();
} 

}}
j++; }
pass=undefined;}
}
/////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////
//YOU FINISHED YOUR TODOLIST BUTTON

MARK_AS_COMPLETE.addEventListener('click', function () {

let id = null;
let width=0;
let height=0;
let border=100;
let elem=document.getElementById("animated_object");   
let elem_container=document.getElementById("animation_container");   

function myMove() {

elem.style.display='block';
elem_container.style.display='block';

clearInterval(id); //clear the timer value
id = setInterval(frame, 0.01);

function frame() {

if (width==100) {
clearInterval(id);
let congrats_message=document.createElement('p');
congrats_message.innerHTML='Congragulations on finishing your project!';
congrats_message.classList.add('congrats_message');
elem.appendChild(congrats_message);
elem_container.style.height='100vh';
} 

else {
width+=5; 
height+=5;
border-=10;
elem.style['border-radius']=border + '%';
elem_container.style['border-radius']=border + '%';
elem.style.width=width + '%'; 
elem.style.height=height + '%'; 
}}}

myMove();

setTimeout(function() {elem_container.style.display='none'}, 2000);

CATEGORY_CREATOR(true);
DATE_OBJ_CREATOR(null,true);
RESET_ALL();

});
/////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////
//YOU FINISHED YOUR TODOLIST BUTTON

UNPUBLISH.addEventListener('click', function () {

CATEGORY_CREATOR(true);
DATE_OBJ_CREATOR(null,true);
RESET_ALL();

});
/////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////
//CANCEL
CANCEL_BUTTON.addEventListener('click', function () {

RESET_ALL();

});
/////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////
//DELETE TODOLIST BOX
const delete_box=(value)=>{

for (let i=0;i<todolist_items_array.length;i++) { 
  
if (value.parentNode==todolist_items_array[i]) {
  todolist_items_array.splice(i,1);
  value.parentNode.remove(); }
}}
/////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////
//REPOPULATE THE PAGE WITH CREATED TODOLIST LINK

const REPOPULATE=(value)=> {

RESET_ALL();

//PROJECT_BOX.setAttribute('style','min-height:80%;');
//CALENDAR_BOX.setAttribute('style','height:20%;');
NEW_PROJECT_BUTTON.style.display='none'; 

//CREATE TODOLIST ITEM ADD MORE BUTTON
CANCEL_BUTTON.style.display='block';
ADD_MORE_BTN.style.display='inline-block';
MARK_AS_COMPLETE.style.display='inline-block';
UNPUBLISH.style.display='inline-block';
TODOLIST_SUBMIT.style.display='inline-block';

for (let i=0; i<SHORTCUT_BOX_ARRAY.length; i++) {

if (SHORTCUT_BOX_ARRAY[i].name==value) {
  your_project=SHORTCUT_BOX_ARRAY[i]; //create a div that overheads your current project info
  CURRENT_PROJECT_INFO.style.display='block';
  CURRENT_PROJECT_INFO.innerHTML=your_project.name + " " + your_project.date + " " + your_project.category; 

for (let j=0; j<your_project.LIST_INFO.length; j++) {

//creates the todolist boxes and submit button
todolist_item_master_container=document.createElement('div');
todolist_item_master_container.classList.add('todolist_item_master_container');
//creates the todolist boxes and submit button
todolist_item_container=document.createElement('div');
todolist_item_container.classList.add('todolist_box');
//creates the div after the todolist box
todolist_item_container_after=document.createElement('div');
todolist_item_container_after.classList.add('todolist_box_after');
PROJECT_BOX.appendChild(todolist_item_master_container);

todolist_items_array.push(todolist_item_master_container); //Default first todolist box

const TODOLIST_DESCRIPTION_BOX=document.createElement('textarea');
TODOLIST_DESCRIPTION_BOX.classList.add('todolist_box_inputs');
const TODOLIST_TIME_BOX=document.createElement('input');
TODOLIST_TIME_BOX.classList.add('todolist_box_inputs');
const TODOLIST_DATE_BOX=document.createElement('input');
TODOLIST_DATE_BOX.classList.add('todolist_box_inputs');
const DELETE=document.createElement('button');
DELETE.classList.add('todolist_box_delete_box');
const TODOLIST_CHECKBOX=document.createElement('input');
TODOLIST_CHECKBOX.type='checkbox';

TODOLIST_DESCRIPTION_BOX.value=your_project.LIST_INFO[j].name;
TODOLIST_TIME_BOX.value=your_project.LIST_INFO[j].time;
TODOLIST_DATE_BOX.value=your_project.LIST_INFO[j].date;
TODOLIST_CHECKBOX.checked=your_project.LIST_INFO[j].checkmark;


let width=0;
TODOLIST_CHECKBOX.addEventListener('click', function () {
let arr=Array.from(todolist_item_container.children);
arr.forEach(item=>{item.style['background-color']='rgb(71, 58, 64)';});
let id = null; //stores the timer value
let elem=document.getElementById("dash-animated_object");   
let elem_container=document.getElementById("dash-animation_container");   
todolist_item_container.appendChild(elem_container);

function myMove() {
elem.style.display='block';
elem_container.style.display='block';
clearInterval(id); //clear the timer value
id = setInterval(frame, 0.1);

function frame() {
if (TODOLIST_CHECKBOX.checked==true) {
if (width==60) {
clearInterval(id);
} 
else {
width+=1; 
elem.style.width=width + '%'; 
}}

if (TODOLIST_CHECKBOX.checked==false) {
if (width==0) {    
  arr=Array.from(todolist_item_container.children);
  arr.forEach(item=>{item.style['background-color']='rgb(255, 208, 0)';})
    clearInterval(id);
    } 
else {
    width-=1; 
    elem.style.width=width + '%'; 
      }
}}}

myMove();});

todolist_item_container.appendChild(TODOLIST_DESCRIPTION_BOX);
todolist_item_container.appendChild(TODOLIST_DATE_BOX);
todolist_item_container.appendChild(TODOLIST_TIME_BOX);
todolist_item_container_after.appendChild(DELETE);
todolist_item_container_after.appendChild(TODOLIST_CHECKBOX);

todolist_item_master_container.appendChild(todolist_item_container);
todolist_item_master_container.appendChild(todolist_item_container_after);


DELETE.innerHTML='X';
DELETE.addEventListener('click', function () {
  delete_box(this.parentNode);
});

PROJECT_BOX.insertBefore(todolist_item_master_container, ADD_MORE_BTN);
PROJECT_BOX.insertBefore(ADD_MORE_BTN,TODOLIST_SUBMIT);
PROJECT_BOX.insertBefore(TODOLIST_SUBMIT,MARK_AS_COMPLETE);
PROJECT_BOX.insertBefore(MARK_AS_COMPLETE,UNPUBLISH);

}}}};
/////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////
//RESET FUNCTION TO BRING BACK DEFAULTS
const RESET_ALL=()=> {

let input_arr=Array.from(NEW_PROJECT_INPUTS);
input_arr.forEach(item=> {
  item.setAttribute('style', 'display:none;');
});

NEW_PROJECT_SUBMIT.style.display='none';
CURRENT_PROJECT_INFO.style.display='none';
CURRENT_PROJECT_INFO.innerHTML='';
//todolist_item_container.style.display='none';

let i=0;
while (i<todolist_items_array.length) { //make sure that each box is deleted
  todolist_items_array[i].style.display='none';
i++;
}

TODOLIST_SUBMIT.style.display='none';
input_arr[0].value='';
input_arr[1].value='';
input_arr[2].value='';
NEW_PROJECT_BUTTON.style.display='block';
ADD_MORE_BTN.style.display='none';
your_project=null; //info paste to the right project
your_todolist_item=null;
todolist_items_array=[];
value_match=true;
MARK_AS_COMPLETE.style.display='none';
UNPUBLISH.style.display='none';
CANCEL_BUTTON.style.display='none';
}

/////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////
//Erase the dom and publish your to do list items...associate them with current project 
TODOLIST_SUBMIT.addEventListener('click', function publish_todolist_items() {

//make sure that LIST_INFO is clean before each push to avoid duplicate boxes
your_project.LIST_INFO=[];

let iterator=0;

while (iterator<todolist_items_array.length) {
 
  console.log(todolist_items_array[iterator].lastChild.children[1].value)

your_todolist_item=todolist_item_creator( 
todolist_items_array[iterator].firstChild.children[0].value,
todolist_items_array[iterator].firstChild.children[1].value,
todolist_items_array[iterator].firstChild.children[2].value,
todolist_items_array[iterator].lastChild.children[1].value,
your_project.name); 

if (your_todolist_item.identifier==your_project.name) { //PUSHES YOUR INFO INTO THE SHORTCUT BOX
  your_project.LIST_INFO.push(your_todolist_item); //pushes your todolist item info into an object within the project module   
};

todolist_items_array[iterator].style.display='none'; //get rid of the excess todolist boxes
iterator++;

}
console.log(your_project);
RESET_ALL();
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







