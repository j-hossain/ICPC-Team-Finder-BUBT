getAllTeam();
let AllData = [];

function getAllTeam() {
    // document.querySelector(".loaderImage").style.display = "block";
    const xhttp = new XMLHttpRequest();
    xhttp.onload = async function () {
        let res = JSON.parse(xhttp.responseText);
        AllData = res[0].data;
        setTeamOptions();
        // document.querySelector(".loaderImage").style.display = "none";
    }
    xhttp.open("GET", teamInfoUrl);
    xhttp.send();
}

function getTeamInfo() {
    let teamName = document.getElementById("team_name").value;
    let f = false;
    AllData.forEach(team => {
        if (team["team_name"] == teamName) {
            f = true;
            let allinput = document.querySelectorAll(".form-control");
            allinput.forEach(i => {
                if (i.id != "phone") i.value = team[i.id];
            });
            return;
        }
    })
    if (!f) {
        let allinput = document.querySelectorAll(".form-control");
        allinput.forEach(i => {
            if (i.id != "team_name") i.value = "";
        });
    }
}


function setTeamOptions() {
    let dataList = document.getElementById('team_options');
    AllData.forEach(team => {
        let option = document.createElement('option');
        option.value = team["team_name"];
        option.innerHTML = team["team_name"];
        dataList.appendChild(option);
    });
}

function editTeam() {
    // alert("Registration is closed !! be more careful next year");
    // return;
    // first check if all fields are filled
    document.querySelector(".loaderImage").style.display = "block";
    let allinput = document.querySelectorAll(".form-control");
    let flag = 1;
    let info = {}
    allinput.forEach(i => {
        if (i.value == "") {
            flag = 0;
        }
        info[i.id] = i.value;
    })
    if (flag == 0) {
        document.querySelector(".loaderImage").style.display = "none";
        alert("Enter all values...");
        return;
    }
    checkTeam(info);
}

function checkTeam(info) {
    let flag = 1;
    let teamNameBool = false;
    AllData.forEach(team => {
        if (flag == 1) {
            if (info["team_name"].toString() == team["team_name"]) {
                teamNameBool = true;
            }
            for (let i = 1; i <= 3; i++) {
                for (let j = 1; j <= 3; j++) {
                    if (info["mem" + i + "_id"] == team["mem" + j + "_id"] && team["team_name"] != info["team_name"]) {
                        alert("Member " + i + " is present in " + team["team_name"]);
                        flag = 0;
                        document.querySelector(".loaderImage").style.display = "none";
                        return;
                    }
                }
            }
        }
    });
    if (!teamNameBool) {
        alert("You cannot change the team name");
        flag = 0;
        document.querySelector(".loaderImage").style.display = "none";
        return;
    }
    if (flag) {
        if (confirm("If the phone number and the team name previously entered do not match, there won't be any update. Are you sure about this team ?")) {
            sendTeam(info);
        }
        else {
            document.querySelector(".loaderImage").style.display = "none";
        }
    }
}

function sendTeam(info) {
    fetch(teamInfoUrl, {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify(info) // body data type must match "Content-Type" header
    }).then(data => {
        // let res = JSON.parse(data.text);
        console.log(data);
        // deletPersonInfo(info);
    }).catch((e) => {
        console.log(e);
    });
}

function deletPersonInfo(info) {
    fetch(teamFinderUrl, {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify({ "st_id1": info["mem1_id"], "st_id2": info["mem2_id"], "st_id3": info["mem3_id"] }) // body data type must match "Content-Type" header
    }).then(() => {
        document.querySelector(".loaderImage").style.display = "none";
        window.location = "./";
        alert("Team Confirmed");
    }).catch((e) => {
        console.log(e);
    });
}