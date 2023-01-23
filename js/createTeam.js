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
    // alert("Registration is closed !! be more careful next year");
    // return;
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
    let flag=1;
    if(!info["team_name"].toString().toLowerCase().match("bubt")){
        alert("MUST use BUBT before team name...");
        flag=0;
        document.querySelector(".loaderImage").style.display="none";
        return;
    }
    AllData.forEach(team=>{
        if(flag==1){
            if(team["team_name"]==info["team_name"]){
                alert("This team name is already used, try a unique name !!");
                flag=0;
                document.querySelector(".loaderImage").style.display="none";
                return;
            }
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
        }
    });
    if(flag){
        if(confirm("You cannont update your team information next time. Are you sure about this team ?")){
            sendTeam(info);
        }
        else{
            document.querySelector(".loaderImage").style.display="none";
        }
    }
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