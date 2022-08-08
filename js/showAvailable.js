// closeInfo();
getAllAvailable();
let AllData = [];

function getAllAvailable(){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = async function() {
        let res = JSON.parse(xhttp.responseText);
        AllData = res[0].data;
        createTable(res[0].data);
        // if(res=="ok"){
        //     alert("User role updated");
        // }
        // else{
        //     alert(res);
        // }
    }
    xhttp.open("GET", "https://script.google.com/macros/s/AKfycbzFRrLbeDdPdjRkQu5W0tuyojDkQhhgsLV00AhS8c8TQ6QVmpn84qNMZB7gkR15bgAOZw/exec");
    xhttp.send();
}

function createTable(data){
    // let headers = ["Codeforces max rating","Department","Email",
    // "Facebook profile link","Full Name","Intake","Phone",
    // "Say anything to you future team mates","Section","Timestamp",
    // "Total number of problems solved in online judges","Discord ID",
    // "StopStalk ID link"];
    let headers = ["Full Name","Intake"]
    let n = data.length;
    for(let i=0;i<n;i++){
        createListItem(data[i],i);
    }
}

function createListItem(data,i){
    // console.log(data);
    let parent = document.getElementById("listContainer");
    let listItem = document.createElement("div");
    listItem.classList.add("listItem");
    parent.appendChild(listItem);
    listItem.innerHTML = document.getElementById("listItemTemplate").innerHTML;
    listItem.querySelector(".name").innerHTML = data["Full Name"];
    listItem.querySelector(".intake").innerHTML = data["Intake"];
    listItem.querySelector(".btn").addEventListener("click",function(){loadPerson(i)});
}

function loadPerson(i){
    let parent = document.getElementById("personInfo");
    parent.querySelector(".name").innerHTML = AllData[i]["Full Name"];
    parent.querySelector(".intake").innerHTML = AllData[i]["Intake"];
    parent.querySelector(".deptartment").innerHTML = AllData[i]["Department"];
    parent.querySelector(".section").innerHTML = AllData[i]["Section"];
    parent.querySelector(".stopstalk").href = AllData[i]["StopStalk ID link"];
    parent.querySelector(".solve").innerHTML = AllData[i]["Total number of problems solved in online judges"];
    parent.querySelector(".cfmax").innerHTML = AllData[i]["Codeforces max rating"];
    parent.querySelector(".phone").innerHTML = AllData[i]["Phone"];
    parent.querySelector(".email").href = "mailto:"+AllData[i]["Email"];
    parent.querySelector(".email").innerHTML = AllData[i]["Email"];
    parent.querySelector(".facebook").href = AllData[i]["Facebook profile link"];
    parent.querySelector(".discord").innerHTML = AllData[i]["Discord ID"];
    parent.querySelector(".comment").innerHTML = AllData[i]["Say anything to you future team mates"];
    
    if(AllData[i]["StopStalk ID link"]=="")
        parent.querySelector(".stopstalk").innerHTML = "";
    if(AllData[i]["Facebook profile link"]=="")
        parent.querySelector(".facebook").innerHTML = "";

    openInfo();
}

function openInfo(){
    document.getElementById("personInfo").style.display="block";
}

function closeInfo(){
    document.getElementById("personInfo").style.display="none";
}