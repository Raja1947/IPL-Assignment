// --------------------- SLIDER FUNCTIONALITY STARTS HERE --------------------- //
$(()=>{
    addHeroCarousel();
     
    
  })
  
  const addHeroCarousel = () => {
    $("#banner").slick({
      autoplay: true,
      autoplaySpeed: 1000,
      arrows: false,
      dots: true,
    });
  };
  
  
  // --------------------- SLIDER FUNCTIONALITY ENDS HERE --------------------- //
  
  // ---------------------  --------------------- //
  
  let detailofTeam = [];
  let detailOfPlayer = [];
  var teamGrid = document.getElementById("container_teams");
  
  if (localStorage.getItem("teamArray") === null)
    localStorage.setItem("teamArray", JSON.stringify(teamData));
  
  if (localStorage.getItem("playerArray") === null)
    localStorage.setItem("playerArray", JSON.stringify(playerData));
  
  detailofTeam = JSON.parse(localStorage.getItem("teamArray"));
  detailOfPlayer = JSON.parse(localStorage.getItem("playerArray"));
  
  // ---------------------  --------------------- //
  
  // --------------------- SEARCH FUNCTIONALITY STARTS HERE --------------------- //
  
  var suggestArray = [];
  for (var i = 0; i < detailofTeam.length; i++) {
    suggestArray.push(detailofTeam[i].sName);
  }
  let searchBar = document.querySelector(".search-input");
  let inputBox = searchBar.querySelector("input");
  let suggBox = searchBar.querySelector(".autocom-box");
  let icon = searchBar.querySelector(".icon");
  
  inputBox.onkeyup = (e) => {
    if (e.keyCode == 13) {
      icon.click();
    }
    let userData = e.target.value;
    let emptyArray = [];
    if (userData) {
      emptyArray = suggestArray.filter((data) => {
        return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
      });
      emptyArray = emptyArray.map((data) => {
        return (data = `<li>${data}</li>`);
      });
      searchBar.classList.add("active");
      showSuggestions(emptyArray);
      let allList = suggBox.querySelectorAll("li");
      for (let i = 0; i < allList.length; i++) {
        allList[i].setAttribute("onclick", "currentLi(this)");
      }
    } else {
      searchBar.classList.remove("active");
    }
  };
  function currentLi(element) {
    let selectData = element.textContent;
    inputBox.value = selectData;
    icon.onclick = () => {
      window.open(`./teams.html?name=${element.textContent}`, "_self");
    };
    searchBar.classList.remove("active");
  }
  function showSuggestions(list) {
    let listData;
    if (!list.length) {
      userValue = inputBox.value;
      listData = `<li>${userValue}</li>`;
    } else {
      listData = list.join("");
    }
    suggBox.innerHTML = listData;
  }
  
  // --------------------- SEARCH FUNCTIONALITY ENDS HERE --------------------- //
  
  // --------------------- CARD RENDERING STARTS HERE --------------------- //
  
  var teamMainBox = document.getElementById("container_teams");
  for (var i = 0; i < detailofTeam.length; i++) {
    teamMainBox.innerHTML += `
  
   <div class="team" onclick="makethisinclick('${i}')">
      <div class="team-img">
          <img src="${detailofTeam[i].teamIcon}" alt="${detailofTeam[i].sName}">
          <div class="overlay"></div>
      </div>
  
      <div class="team-info">
          <p class="team-name">${detailofTeam[i].teamFullName}</p>
          <p class="Count">Won Count : ${detailofTeam[i].WonCount} </p>
      </div>
  </div
  
  `;
  }
  
  
  // --------------------- CARD RENDERING ENDS HERE --------------------- //
  
  // --------------------- CARD CLICK -> TEAM DETAILS PAGE --------------------- //
  
  function makethisinclick(res) {
    var clickedCard = detailofTeam[res].sName;
  
    window.open(`./teams.html?name=${clickedCard}`, "_self");
  }
  
  // ------------------------------------------ //
  
  var addteamclicked = () => {
    window.open("./addTeam.html", "_self");
  };
  var addPlayerClicked = () => {
    window.open("./addPlayer.html", "_self");
  };
  