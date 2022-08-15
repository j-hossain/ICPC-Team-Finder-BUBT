// closeInfo();
getAllTeam();
let AllData = [];

function getAllTeam(){
    // document.querySelector(".loaderImage").style.display="block";
    const xhttp = new XMLHttpRequest();
    xhttp.onload = async function() {
        document.querySelector(".loaderImage").style.display="none";
        let res = JSON.parse(xhttp.responseText);
        AllData = res[0].data;
        if(AllData.length==0){
            document.querySelector(".no_data").style.display = "block";
        }
        else{
            document.querySelector(".no_data").style.display = "none";
            document.getElementById("total_team").innerHTML = AllData.length;
            createTable(res[0].data);
        }
    }
    xhttp.open("GET", teamInfoUrl);
    xhttp.send();
}

function createTable(data){
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
    if(data["reg_status"]=="")
    listItem.querySelector(".reg_status").innerHTML = "Coach did not create the team yet";
    if(data["reg_status"]=="pending")
    listItem.querySelector(".reg_status").innerHTML = "Waiting for clearing ineligibility";
    listItem.querySelector(".btn").addEventListener("click",function(){loadTeam(i)});
}

function loadTeam(i){
    let parent = document.getElementById("personInfo");
    // console.log(parent.querySelector(".team_name"));
    openInfo();
    for(keys in AllData[i]){
        parent.querySelector("."+keys.toString()).innerHTML = AllData[i][keys];
    }
}

function openInfo(){
    document.getElementById("personInfo").style.display="block";
}

function closeInfo(){
    document.getElementById("personInfo").style.display="none";
}