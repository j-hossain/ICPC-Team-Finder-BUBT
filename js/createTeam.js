getAllTeam();
let AllData = [];

function getAllTeam(){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = async function() {
        let res = JSON.parse(xhttp.responseText);
        AllData = res[0].data;
    }
    xhttp.open("GET", teamInfoUrl);
    xhttp.send();
}

function createTeam(){
    // first check if all fields are filled
    document.querySelector(".loaderImage").style.display="block";
    let allinput = document.querySelectorAll(".form-control");
    let flag=1;
    let info = {}
    allinput.forEach(i=>{
        if(i.value==""){
            flag=0;
        }
        info[i.id]=i.value;
    })
    if(flag==0){
        document.querySelector(".loaderImage").style.display="none";
        alert("Enter all values...");
        return;
    }
    checkTeam(info);
}

function checkTeam(info){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = async function() {
        let res = JSON.parse(xhttp.responseText);
        let teamData = res[0].data;
        console.log(teamData);
        let flag=1;
        teamData.forEach(team=>{
            for(let i=1;i<=3;i++){
                for(let j=1;j<=3;j++){
                    if(info["mem"+i+"_id"]==team["mem"+j+"_id"] && team["team_name"]!=info["team_name"]){
                        alert("Member "+i+" is present in another team "+team["team_name"]);
                        flag=0;
                        document.querySelector(".loaderImage").style.display="none";
                        return;
                    }
                }
            }
        });
        if(flag){
            sendTeam(info);
        }
    }
    xhttp.open("GET", teamInfoUrl);
    xhttp.send();
}

function sendTeam(info){
    fetch(teamInfoUrl, {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify(info) // body data type must match "Content-Type" header
      }).then(()=>{
        deletPersonInfo(info);
      }).catch((e)=>{
        console.log(e);
      });
}

function deletPersonInfo(info){
    fetch(teamFinderUrl, {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify({"st_id1":info["mem1_id"],"st_id2":info["mem2_id"],"st_id3":info["mem3_id"]}) // body data type must match "Content-Type" header
      }).then(()=>{
        document.querySelector(".loaderImage").style.display="none";
        window.location = "./";
        alert("Team Confirmed");
      }).catch((e)=>{
        console.log(e);
      });
}