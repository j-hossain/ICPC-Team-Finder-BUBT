// closeInfo();
getAllTeam();
let filterdData = [];
let AllData = [];

function search(){
    let value = document.getElementById("search").value;
    if(value==""){
        filterdData=AllData;
        createTable(filterdData);
        return;
    }
    value = value.toString().toLowerCase();
    filterdData = [];
    AllData.forEach(data=>{
        if(data["team_name"].toString().toLowerCase().match(value))
            filterdData.push(data);
        else if(data["mem1_name"].toString().toLowerCase().match(value))
            filterdData.push(data);
        else if(data["mem2_name"].toString().toLowerCase().match(value))
            filterdData.push(data);
        else if(data["mem3_name"].toString().toLowerCase().match(value))
            filterdData.push(data);
        else if(data["mem1_intake"].toString().toLowerCase().match(value))
            filterdData.push(data); 
        else if(data["mem2_intake"].toString().toLowerCase().match(value))
            filterdData.push(data);
        else if(data["mem3_intake"].toString().toLowerCase().match(value))
            filterdData.push(data);
    });
    createTable(filterdData);
}

function getAllTeam(){
    // document.querySelector(".loaderImage").style.display="block";
    const xhttp = new XMLHttpRequest();
    xhttp.onload = async function() {
        document.querySelector(".loaderImage").style.display="none";
        let res = JSON.parse(xhttp.responseText);
        AllData = res[0].data;
        filterdData = AllData;
        createTable(filterdData);
        
    }
    xhttp.open("GET", teamInfoUrl);
    xhttp.send();
}

function createTable(data){
    let parent = document.getElementById("listContainer");
    parent.innerHTML = '';
    if(filterdData.length==0){
        document.getElementById("total_team").innerHTML = filterdData.length;
        return;
    }
    else{
        document.getElementById("total_team").innerHTML = filterdData.length;
    }
    let n = data.length;
    for(let i=0;i<n;i++){
        createListItem(data[i],i);
    }
}

function createListItem(data,i){
    let parent = document.getElementById("listContainer");
    let listItem = document.createElement("div");
    listItem.classList.add("listItem");
    parent.appendChild(listItem);
    listItem.innerHTML = document.getElementById("listItemTemplate").innerHTML;
    listItem.querySelector(".team_name").innerHTML = data["team_name"];
    listItem.querySelector(".mem1_name").innerHTML = data["mem1_name"];
    listItem.querySelector(".mem2_name").innerHTML = data["mem2_name"];
    listItem.querySelector(".mem3_name").innerHTML = data["mem3_name"];
    listItem.querySelector(".reg_status").innerHTML = data["reg_status"];
    if(data["reg_status"]==""){
        listItem.querySelector(".reg_status").innerHTML = "Coach did not create the team yet";
        listItem.classList.add("notyet");
    }
    if(data["reg_status"]=="pending"){
        listItem.querySelector(".reg_status").innerHTML = "Team created - Waiting for clearing ineligibility";
        listItem.classList.add("pending");
    }
    if(data["reg_status"]=="complete"){
        listItem.querySelector(".reg_status").innerHTML = "Team created";
    }
    listItem.querySelector(".btn").addEventListener("click",function(){loadTeam(i)});
}

function loadTeam(i){
    let parent = document.getElementById("personInfo");
    // console.log(parent.querySelector(".team_name"));
    openInfo();
    for(keys in filterdData[i]){
        parent.querySelector("."+keys.toString()).innerHTML = filterdData[i][keys];
    }
}

function openInfo(){
    document.getElementById("personInfo").style.display="block";
}

function closeInfo(){
    document.getElementById("personInfo").style.display="none";
}