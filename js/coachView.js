// closeInfo();
getAllTeam();
let filterdData = [];
let AllData = [];

function updateTable() {
    const teamNameFilter = document.getElementById("teamNameFilter").value.toLowerCase();
    const sectionFilter = document.getElementById("sectionFilter").value;
    const intakeFilter = document.getElementById("intakeFilter").value;
    const idFilter = document.getElementById("idFilter").value;
    const registrationStatusFilter = document.getElementById("registrationStatusFilter").value;
    const coachNameFilter = document.getElementById("coachNameFilter").value;

    filterdData = AllData.filter(team => {
        return (
            team["team_name"].toLowerCase().includes(teamNameFilter) &&
            (team["mem1_id"].toString().includes(idFilter) || team["mem2_id"].toString().includes(idFilter) || team["mem2_id"].toString().includes(idFilter)) &&
            (registrationStatusFilter === "ALL" || team["reg_status"] === registrationStatusFilter) &&
            (coachNameFilter === "ALL" || team["Coach"] === coachNameFilter)
        );
    });
    filterdData = filterdData.filter(team => {
        return checkIntakeSection(intakeFilter, sectionFilter, team);
    });
    createTable(filterdData);
}

function checkIntakeSection(intakeFilter, sectionFilter, team) {
    if (sectionFilter === "ALL" && intakeFilter === "ALL") return true;
    if (sectionFilter === "ALL") return (intakeFilter === "ALL" || team["mem1_intake"] == intakeFilter || team["mem2_intake"] == intakeFilter || team["mem3_intake"] == intakeFilter);
    if (intakeFilter === "ALL") return (sectionFilter === "ALL" || team["mem1_sec"] == sectionFilter || team["mem2_sec"] == sectionFilter || team["mem3_sec"] == intakeFilter);
    return ((team["mem1_intake"] == intakeFilter && team["mem1_sec"] == sectionFilter) || (team["mem2_intake"] == intakeFilter && team["mem2_sec"] == sectionFilter) || (team["mem3_intake"] == intakeFilter && team["mem3_sec"] == sectionFilter))
}

function resetFilter() {
    document.getElementById("teamNameFilter").value = "";
    document.getElementById("intakeFilter").value = "ALL";
    document.getElementById("sectionFilter").value = "ALL";
    document.getElementById("registrationStatusFilter").value = "ALL";
    document.getElementById("coachNameFilter").value = "ALL";
    updateTable();
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
        populateOptions(AllData);
    }
    xhttp.open("GET", teamInfoUrl + "?coachView=true");
    xhttp.send();
}

function populateOptions(data) {
    let intakes = new Set();
    let sections = new Set();
    let stats = new Set();
    let coaches = new Set();
    AllData.forEach(team => {
        intakes.add(team["mem1_intake"]);
        intakes.add(team["mem2_intake"]);
        intakes.add(team["mem3_intake"]);
        sections.add(team["mem1_sec"]);
        sections.add(team["mem2_sec"]);
        sections.add(team["mem3_sec"]);
        stats.add(team["reg_status"]);
        coaches.add(team["Coach"]);
    });

    populateThis(Array.from(intakes).sort((a, b) => a - b), "intakeFilter");
    populateThis(Array.from(sections).sort((a, b) => a - b), "sectionFilter");
    populateThis(stats, "registrationStatusFilter");
    populateThis(Array.from(coaches).sort(), "coachNameFilter");
    document.getElementById("teamNameFilter").addEventListener("input", updateTable);
    document.getElementById("idFilter").addEventListener("input", updateTable);
}

function populateThis(options, divId) {
    let div = document.getElementById(divId);
    div.addEventListener("change", updateTable);
    div.innerHTML = '<option value="ALL">All</option>';
    options.forEach(option => {
        let opt = document.createElement('option');
        opt.value = option;
        opt.innerHTML = option || "Null";
        div.appendChild(opt);
    });
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
    listItem.innerHTML = '<tr> <td rowspan="3" class=""> <p class="team_name copyText"></p> <span class="phone copyText"></span> </td> <td class="mem1_email copyText"></td> <td class="mem1_name"></td> <td class="mem1_id"></td> <td class="mem1_intake"></td> <td class="mem1_sec"></td> <td rowspan="3"> <p class="reg_status"></p> <button class="btn"> Change</button> </td> <td rowspan="3" class="Coach"></td> </tr> <tr> <td class="mem2_email copyText"></td> <td class="mem2_name"></td> <td class="mem2_id"></td> <td class="mem2_intake"></td> <td class="mem2_sec"></td> </tr> <tr> <td class="mem3_email copyText"></td> <td class="mem3_name"></td> <td class="mem3_id"></td> <td class="mem3_intake"></td> <td class="mem3_sec"></td> </tr>';
    for (keys in data) {
        listItem.querySelector("." + keys.toString()).innerHTML = data[keys];
    }
    let copyEnabled = listItem.querySelectorAll('.copyText');
    copyEnabled.forEach(text => {
        text.title = "Click to Copy";
        text.addEventListener('click', (e) => {
            let textToCopy = e.target.innerHTML;
            let copyText = document.createElement('textarea');
            copyText.value = textToCopy;
            copyText.select();
            copyText.setSelectionRange(0, 99999); // For mobile devices

            // Copy the text inside the text field
            navigator.clipboard.writeText(copyText.value);

            // Alert the copied text
            showSnackBar("Copied the text: " + copyText.value);
        })
    })
    if (data["reg_status"] == "") {
        listItem.querySelector(".reg_status").innerHTML = "Null";
        listItem.classList.add("notyet");
    }
    if (data["reg_status"] == "pending") {
        listItem.classList.add("pending");
    }
    listItem.querySelector(".btn").addEventListener("click", function () {
        if (data["reg_status"] == "") setStatusToPending(i);
        else if (data["reg_status"] == "pending") setStatusToComplete(i);
        else {
            showSnackBar("This team information is already completed");
        }
    });
}

function setStatusToPending(i) {
    let coachName = prompt("Please enter the Coach Name:");
    if (coachName != null && coachName != "") {
        let info = {};
        for (key in filterdData[i]) {
            info[key] = filterdData[i][key];
        }
        info["reg_status"] = "pending";
        info["Coach"] = coachName;
        document.querySelector(".loaderImage").style.display = "block";
        sendTeam(info, () => {
            filterdData[i]["reg_status"] = "pending";
            filterdData[i]["Coach"] = coachName;
            createTable(filterdData);
            document.querySelector(".loaderImage").style.display = "none";
        });
    }
}

function sendTeam(info, callback) {
    fetch(teamInfoUrl + "?coachView=true", {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify(info) // body data type must match "Content-Type" header
    }).then((e) => {
        console.log(e);
        // deletPersonInfo(info);
        callback();

    }).catch((e) => {
        console.log(e);
    });
}

function setStatusToComplete(i) {
    if (confirm("Are you sure this team has all the information completed ??\nThe Press ok")) {
        let info = {};
        for (key in filterdData[i]) {
            info[key] = filterdData[i][key];
        }
        document.querySelector(".loaderImage").style.display = "block";
        info["reg_status"] = "complete";
        sendTeam(info, () => {
            filterdData[i]["reg_status"] = "complete";
            createTable(filterdData);
            document.querySelector(".loaderImage").style.display = "none";
        });
    }
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
