var get_but = document.getElementById("get");
var post_but = document.getElementById("post");
var update_but = document.getElementById("update");
var delete_but = document.getElementById("delete");


post_but.addEventListener('click', ()=>{
    var request1 = new XMLHttpRequest();
    var form = document.getElementById("form");
    var form_data = new FormData(form);
    var json_data = {};
    form_data.forEach((value, key) => (json_data[key] = value));
    json_data = JSON.stringify(json_data);
    console.log(json_data);
    request1.open('POST', 'http://localhost:3000/post');
    request1.setRequestHeader("Content-Type", "application/json");
    request1.onload = function(){
        var data = request1.responseText;
        data = JSON.parse(data)
        console.log(data.res1);
        document.getElementById("taulu").innerHTML = data.res1
        
    };
request1.send(json_data);
});

get_but.addEventListener('click', ()=>{
    var request2 = new XMLHttpRequest();
    var dest = `http://localhost:3000/get`;
    request2.open('GET', dest);
    request2.setRequestHeader("Content-Type", "application/json");
    request2.onload = function(){
        
        var data = JSON.parse(this.responseText).data;
        console.log(data);
        let taulukko = "<table border='1'>";
        var otsikot = "<tr><th>" + 'id' + "</td><td>" + 'name' + "</td><td>" + 'number' +"</th></tr>";
        taulukko += otsikot;

        for (let row in data) {
            var rivi = "<tr><td>" + data[row].id+ "</td><td>"+ data[row].nimi + "</td><td>" + data[row].puhelin +"</td></tr>";
            taulukko += rivi;
          }
          taulukko += "</table>"
          document.getElementById("taulu").innerHTML = taulukko;
        
    };
request2.send();
});

get_but.addEventListener('click', ()=>{
    var request2 = new XMLHttpRequest();
    var form = document.getElementById("form");
    var form_data = new FormData(form);
    var json_data = {};
    form_data.forEach((value, key) => (json_data[key] = value));
    var id = json_data.nimi;
    console.log(id);
    var dest = `http://localhost:3000/get/${id}`;
    request2.open('GET', dest);
    request2.setRequestHeader("Content-Type", "application/json");
    request2.onload = function(){
        
        var data = JSON.parse(this.responseText).data;
        console.log(data);
        let taulukko = "<table border='1'>";
        var otsikot = "<tr><th>" + 'id' + "</td><td>" + 'name' + "</td><td>" + 'number' +"</th></tr>";
        taulukko += otsikot;

        for (let row in data) {
            
            var rivi = "<tr><td>" + data[row].id+ "</td><td>"+ data[row].nimi + "</td><td>" + data[row].puhelin +"</td></tr>";
            taulukko += rivi;
          }
          taulukko += "</table>"
          document.getElementById("taulu").innerHTML = taulukko;
        
    };
request2.send();
});

update_but.addEventListener('click', ()=>{
    var request2 = new XMLHttpRequest();
    var form = document.getElementById("form");
    var form_data = new FormData(form);
    var json_data = {};
    form_data.forEach((value, key) => (json_data[key] = value));
    json_data = JSON.stringify(json_data);
    console.log(json_data);
    var dest = `http://localhost:3000/put`;
    request2.open('PUT', dest);
    request2.setRequestHeader("Content-Type", "application/json");
    request2.onload = function(){
        var data = request2.responseText;
        data = JSON.parse(data)
        console.log(data.res1);
        document.getElementById("taulu").innerHTML = data.res1
        
    };
request2.send(json_data);
});

delete_but.addEventListener('click', ()=>{
    var request2 = new XMLHttpRequest();
    var form = document.getElementById("form");
    var form_data = new FormData(form);
    var json_data = {};
    form_data.forEach((value, key) => (json_data[key] = value));
    var id = json_data.id;
    console.log(id);
    var dest = `http://localhost:3000/delete/${id}`;
    request2.open('DELETE', dest);
    request2.setRequestHeader("Content-Type", "application/json");
    request2.onload = function(){
        var data = request2.responseText;
        data = JSON.parse(data)
        console.log(data.res1);
        document.getElementById("taulu").innerHTML = data.res1
        
    };
request2.send();
});

