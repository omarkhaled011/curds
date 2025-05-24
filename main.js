let title=document.getElementById("title");
let price=document.getElementById("price");
let taxes=document.getElementById("taxes");
let ads=document.getElementById("ads");
let discount=document.getElementById("discount");
let total=document.getElementById("total");
let count=document.getElementById("count");
let category=document.getElementById("category");
let submit=document.getElementById("submit");
let table=document.getElementById("tbody");
let search=document.getElementById("search");


let mode="create";
let tmp;

function getTotal(){
    if(price.value !=""){
        total.innerHTML=(+price.value+ +taxes.value+ +ads.value )- +discount.value;
        total.style.backgroundColor="green"
    }else {
        total.style.backgroundColor="rgb(209, 10, 10)"
    }
};

let arr;
if(localStorage.prodect!=null){
    arr =JSON.parse(localStorage.prodect);
}else{
    arr=[];
}
submit.onclick=function(){
  let obj={
    title:title.value,
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value,
  }

    if(title.value !="" && price.value!="" && category.value !="" && count.value <= 200){
     
      if(mode==="create"){
       
        if(obj.count>1){
          for(let i=0;i<obj.count;i++){
            arr.push(obj);
            total.style.backgroundColor=" rgb(209, 10, 10)";
          }
         
        }else{
          arr.push(obj);
          total.style.backgroundColor=" rgb(209, 10, 10)";
         
        }
       
      }else{
         arr[tmp]=obj;
         mode="create";
         submit.innerHTML="Create";
         count.style.display="block";
         total.style.backgroundColor=" rgb(209, 10, 10)";
         
      }
      localStorage.setItem("prodect",JSON.stringify(arr))
       showdata();
       clearvalue();
    }
    
 
}
function clearvalue(){
    title.value="";
    price.value="";
    taxes.value="";
    ads.value="";
    discount.value="";
    total.innerHTML=""
    count.value="";
    category.value="";
    search.value="";

}
showdata();

function showdata(){
    let tr="";
  for(let i=0;i<arr.length;i++){
     tr +=`
         <tr>
            <td>${i+1}</td>
            <td>${arr[i].title}</td>
            <td>${arr[i].price}</td>
            <td>${arr[i].taxes}</td>
            <td>${arr[i].ads}</td>
            <td>${arr[i].discount}</td>
            <td>${arr[i].total}</td>
            <td>${arr[i].category}</td>
            <td><button id="update" onclick="update(${i})">update</button></td>
            <td><button onclick="deletep(${i})" id="delete">delete</button></td>
            
          </tr>
     `
     
  }
  table.innerHTML=tr;
     if(arr.length>0 && search.value==""){
      
        document.getElementById("del").innerHTML=`<button onclick="deleteAll()">DeleteAll (${arr.length}) </button>`;
      }else{
        document.getElementById("del").innerHTML="";
      }
 
}

function update(i){
  title.value=arr[i].title;
  price.value=arr[i].price;
  taxes.value=arr[i].taxes;
  ads.value=arr[i].ads;
  discount.value=arr[i].discount;
  total.innerHTML=arr[i].total;
  category.value=arr[i].category;
  getTotal();
  submit.innerHTML="Update";
  count.style.display="none";
  scroll({
    top:0,
    behavior:"smooth"
  })
  mode="up";
  tmp=i;
}

function deleteAll(){
    localStorage.clear();
    arr.splice(0);
    showdata();
}


function deletep(i){
   if(title.value == "" && price.value =="" &&category.value ==""){
    

      arr.splice(i,1);
      localStorage.prodect=JSON.stringify(arr);
      showdata();
      clearvalue();
     
   
   }}



let smode="title";
function searchdata(value){
  if(value=="search By Category"){
    smode="category";
  }else{
    smode="title";
  }
    search.focus();
    search.placeholder=value;
    search.value="";
    showdata();
}


function searchProduct(v){
  let tr="";
  

    for(let i=0;i<arr.length;i++){
     
    
      if(arr[i].title.includes(v.toLowerCase()) | arr[i].title.includes(v.toUpperCase())  && smode=="title"){

        tr +=`
            <tr>
               <td>${i+1}</td>
               <td>${arr[i].title}</td>
               <td>${arr[i].price}</td>
               <td>${arr[i].taxes}</td>
               <td>${arr[i].ads}</td>
               <td>${arr[i].discount}</td>
               <td>${arr[i].total}</td>
               <td>${arr[i].category}</td>
               <td><button id="update" onclick="update(${i})">update</button></td>
               <td><button onclick="deletep(${i})" id="delete">delete</button></td>
               
             </tr>
        `
       
      }else if(arr[i].category.includes(v.toLowerCase()) | arr[i].category.includes(v.toUpperCase()) && smode=="category"){
        tr +=`
        <tr>
           <td>${i+1}</td>
           <td>${arr[i].title}</td>
           <td>${arr[i].price}</td>
           <td>${arr[i].taxes}</td>
           <td>${arr[i].ads}</td>
           <td>${arr[i].discount}</td>
           <td>${arr[i].total}</td>
           <td>${arr[i].category}</td>
           <td><button id="update" onclick="update(${i})">update</button></td>
           <td><button onclick="deletep(${i})" id="delete">delete</button></td>
           
         </tr>
    `
  
      }
    }
    table.innerHTML=tr;
   }
   let dark=document.getElementById("dark");
   let light=document.getElementById("light");
   

   dark.addEventListener("click",Darkmodes);
   function Darkmodes(){
     
      document.body.style.backgroundColor="white";
      document.body.style.color="black";
      dark.style.display="none";
      light.style.display="block";
      
    }
    
    light.addEventListener("click",lightmodes);
   function lightmodes(){
  
      document.body.style.backgroundColor="rgb(29, 28, 28)";
      document.body.style.color="white";
      dark.style.display="block";
      light.style.display="none";
    }
    

   
 
 