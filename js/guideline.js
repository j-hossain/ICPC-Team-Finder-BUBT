let data = {
    points:[
        "Use BUBT_ before your team name. Since you representing your University here",
        "This is not the registration site !! Take your team info to your coach and let him create the team for you",
        "Participant cannot be a coach !! Coach must be a faculty of the university",
        "If you cant find a team member, look in the <a href=\"./showAvailable.html\">available members</a> section",
        "If you cant find anyone, list your information <a target=\"_blank\" href=\"https://docs.google.com/forms/d/e/1FAIpQLSda_j28F0ABCQq71I8aSa1MTHfCIVFMAe4m2AiR_1r7KYdIWA/viewform?usp=sf_link\">here</a>",
        "You cannot delete or update any team information currently, contact me if you need to",
        "One participant cannot be in multiple teams !!"
    ]
}

createPoints();

function createPoints(){
    console.log(data);
    let parent = document.getElementById("listParent");
    data["points"].forEach(point=>{
        let li = document.createElement("li");
        li.innerHTML = point
        parent.appendChild(li);
    });
}