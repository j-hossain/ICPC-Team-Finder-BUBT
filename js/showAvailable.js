// closeInfo();
getAllAvailable();
let AllData = [];
let filterdData = [];

function search(){
    let value = document.getElementById("search").value;
    if(value==""){
        filterdData = AllData;
        createTable(filterdData);
        return;
    }
    filterdData = [];
    AllData.forEach(data=>{
        if(data["Full Name"].toString().toLowerCase().match(value))
            filterdData.push(data);
        if(data["Intake"].toString().toLowerCase().match(value))
            filterdData.push(data);
        if(data["Shift"].toString().toLowerCase().match(value))
            filterdData.push(data);
    });
    createTable(filterdData);
}

function getAllAvailable(){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = async function() {
        document.querySelector(".loaderImage").style.display="none";
        let res = JSON.parse(xhttp.responseText);
        AllData = res[0].data;
        filterdData = AllData;
        if(AllData.length==0){
            document.querySelector(".no_data").style.display = "block";
        }
        else{
            document.querySelector(".no_data").style.display = "none";
            createTable(res[0].data);
        }
    }
    xhttp.open("GET", teamFinderUrl);
    xhttp.send();
}

function createTable(data){
    
    let parent = document.getElementById("listContainer");
    parent.innerHTML = '';
    // let headers = ["Codeforces max rating","Department","Email",
    // "Facebook profile link","Full Name","Intake","Phone",
    // "Say anything to you future team mates","Section","Timestamp",
    // "Total number of problems solved in online judges","Discord ID",
    // "StopStalk ID link"];
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
    parent.querySelector(".shift").innerHTML = AllData[i]["Shift"];
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