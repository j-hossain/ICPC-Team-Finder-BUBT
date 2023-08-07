// closeInfo();
getAllTeam();
let filterdData = [];
let AllData = [];

function search() {
    let value = document.getElementById("search").value;
    if (value == "") {
        filterdData = AllData;
        createTable(filterdData);
        return;
    }
    value = value.toString().toLowerCase();
    filterdData = [];
    AllData.forEach(data => {
        if (data["team_name"].toString().toLowerCase().match(value))
            filterdData.push(data);
        else if (data["mem1_name"].toString().toLowerCase().match(value))
            filterdData.push(data);
        else if (data["mem2_name"].toString().toLowerCase().match(value))
            filterdData.push(data);
        else if (data["mem3_name"].toString().toLowerCase().match(value))
            filterdData.push(data);
        else if (data["mem1_intake"].toString().toLowerCase().match(value))
            filterdData.push(data);
        else if (data["mem2_intake"].toString().toLowerCase().match(value))
            filterdData.push(data);
        else if (data["mem3_intake"].toString().toLowerCase().match(value))
            filterdData.push(data);
    });
    createTable(filterdData);
}

function getAllTeam() {
    // document.querySelector(".loaderImage").style.display="block";
    const xhttp = new XMLHttpRequest();
    xhttp.onload = async function () {
        document.querySelector(".loaderImage").style.display = "none";
        let res = JSON.parse(xhttp.responseText);
        AllData = res[0].data;
        console.log(AllData);
        filterdData = AllData;
        createTable(filterdData);

    }
    xhttp.open("GET", teamInfoUrl + "?coachView=true");
    xhttp.send();
}

function createTable(data) {
    let parent = document.getElementById("listContainerTable");
    parent.innerHTML = '<thead id="tableHeaderTeamplate"> <tr> <th>Team Name & phone</th> <th>Email</th> <th>Name</th> <th>ID</th> <th>Intake</th> <th>Section</th> <th>Reg status</th> <th>Coach</th> </tr> </thead>';
    if (filterdData.length == 0) {
        document.getElementById("total_team").innerHTML = filterdData.length;
        return;
    }
    else {
        document.getElementById("total_team").innerHTML = filterdData.length;
    }
    let n = data.length;
    for (let i = 0; i < n; i++) {
        createListItem(data[i], i);
    }
}

function createListItem(data, i) {
    let parent = document.getElementById("listContainerTable");
    let listItem = document.createElement("tbody");
    listItem.classList.add("teamGroup");
    parent.appendChild(listItem);
    listItem.innerHTML = '<tr> <td rowspan="3" class=""> <p class="team_name"></p> <span class="phone"></span> </td> <td class="mem1_email"></td> <td class="mem1_name"></td> <td class="mem1_id"></td> <td class="mem1_intake"></td> <td class="mem1_sec"></td> <td rowspan="3"> <p class="reg_status"></p> <button class=".changeBtn"> Change</button> </td> <td rowspan="3" class="Coach"></td> </tr> <tr> <td class="mem2_email"></td> <td class="mem2_name"></td> <td class="mem2_id"></td> <td class="mem2_intake"></td> <td class="mem2_sec"></td> </tr> <tr> <td class="mem3_email"></td> <td class="mem3_name"></td> <td class="mem3_id"></td> <td class="mem3_intake"></td> <td class="mem3_sec"></td> </tr>';
    for (keys in data) {
        listItem.querySelector("." + keys.toString()).innerHTML = data[keys];
    }
    // listItem.querySelector(".btn").addEventListener("click", function () { loadTeam(i) });
}

function loadTeam(i) {
    let parent = document.getElementById("personInfo");
    // console.log(parent.querySelector(".team_name"));
    openInfo();
    for (keys in filterdData[i]) {
        parent.querySelector("." + keys.toString()).innerHTML = filterdData[i][keys];
    }
}

function openInfo() {
    document.getElementById("personInfo").style.display = "block";
}

function closeInfo() {
    document.getElementById("personInfo").style.display = "none";
}

function copyToClipboard(text) {
    const copyText = document.createElement('textarea');
    copyText.value = text;
    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);
}