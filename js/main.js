

//TODO -- En url som kan tilgås af alle Endpoint --\\
const url = "http://localhost:8080/api";
const teamsEndpoint = "/teams"
const shirtEndpoint = "/shirts"
const ridersEndpoint = "/riders"

//TODO -- Metode der henter (url) og retunerer et json format (og catcher for en sikkerheds skyld) --\\
function fetchData(url){
  return fetch(url).then((res) => res.json().catch(err => alert(err)))
}

//TODO -- Metode der henter riders, teams, shirte. --\\
async function addTableRow() {
  const riders = await fetchData(url + ridersEndpoint);
  const teams = await fetchData(url + teamsEndpoint);
  const shirts = await fetchData(url + shirtEndpoint);
  //TODO -- "LET" bruges til loops og if statements. --\\
  let table = document.getElementById("riders");
  //TODO -- Dette forEach loop køre et rows af gangen med alle de columns der er. --\\
  riders.forEach((rider, index) =>{
    table.innerHTML += `
    <tr>
    <tbody>
    <th scope="row">${index +1}</th>
    <th>${rider.name}</th>
    <th>${rider.age}</th>
    <th>${rider.nationality}</th>
    <th>${rider.yellowShirt}</th>
    <th>${rider.mountainPoints}</th>
    <th>${rider.sprintPoints}</th>
    <th>${rider.timeSeconds}</th>
    <th>${rider.shirts}</th>
    <th>team</th>
    <!-- TODO-- EDIT Button (Style fra Bootstrap) og  -->
    <th><button onclick="editRider(${rider.riderId})" type="button" class="btn btn-outline-warning">EDIT</button></th>
    <th><button onclick="deleteRider(${rider.riderId})" type="button" class="btn btn-outline-danger">DELETE</button></th>
    </tbody>
    </tr> `;
  })
};

//TODO //--EDIT FUNCTION/METHODE --\\
function editRider(id, age, nationality, yellowShirt, mountainPoints, sprintPoints, timeSeconds, shirts, team, edit){
  console.log("Test Edit")
  console.log(id)
  fetch(ridersEndpoint + "/" + id, {
    method: "EDIT",
    //TODO -- Snark med en der ved mere.
    headers:{
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      riderId: id,
      name: name,
      age: age,
      team: {
        id: teamId,
        name: fetchData() + "/" + teamId,
      },
      nationality: nationality,
      timeSeconds: timeSeconds,
      shirts: shirts,
      team: team,
      edit: edit,
      yellowShirt: yellowShirt,
      mountainPoints: mountainPoints,
      sprintPoints: sprintPoints,
    })


  })
    .then(async  res => { res.json()
      .catch(error => console.log(error)) //TODO -- Snark med en der ved mere.
      const bootStrapToastLiveMessage = document.getElementById(('liveToast'));
      const toast = new bootstrap.Toast(bootStrapToastLiveMessage);

      const toastBody = document.getElementById('toastBody');
      toastBody.innerHTML = `Rider is successfully edited: ` + id;

      toast.show()
      await addTableRow()
    })

};

//TODO //-- DELETE FUNCTION/METHODE --\\
function deleteRider(id) {
  //TODO -- Henter den data der ligger via. denne variable (ridersEndpoint)
  fetch(ridersEndpoint + "/" +id, {
    method: "DELETE",
  })
    .then(async res => { res.json()
      .catch((error => console.log(error)))

      const bootStrapToastLiveMessage = document.getElementById('toastBody');
      const toast = boostrao.Toast(bootStrapToastLiveMessage);

      const toastbody = document.getElementById(('toastbody'));
      toastbody.innerHTML = `Rider is successfully DELETED: ` + id;

      toast.show()
      await addTableRow()
    })
};





addTableRow().then();

/*
//-- sanitizeStringWithTableRows(tableRowsString)
//-- <button onClick = "editRider(${rider.riderId}" >EDIT</button>

age, nationality, mountainPoints, sprintPoints, time, shirts, team, edit,
headers:{
     'content-type': 'application/json'
   },
   body: JSON.stringify({
     riderId: id,
       name: name,
     team: {
       id: teamId,
         name: fetchData() + "/" + teamId,
   },
     nationality: nationality,
     time: time,
     shirts: shirts,
     team: team,
     edit: edit,
     mountainPoints: mountainPoints,
     sprintPoints: sprintPoint,
 })

 //.catch(error => console.log(error))
 */











