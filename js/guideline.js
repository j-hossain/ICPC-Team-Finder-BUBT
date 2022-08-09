fetch("../res/guidline.json")
    .then((response) => response.json())
    .then((json) => createPoints(json));

function createPoints(data){
    let parent = document.getElementById("listParent");
    data["points"].forEach(point=>{
        let li = document.createElement("li");
        li.innerHTML = point
        parent.appendChild(li);
    });
}