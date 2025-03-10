/* script.js */

document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const startScreen = document.getElementById('start-screen');
    const gameScreen = document.getElementById('game-screen');
    const gameOverScreen = document.getElementById('game-over');
    const startGameButton = document.getElementById('startGame');
    const restartGameButton = document.getElementById('restartGame');
    const pauseGameButton = document.getElementById('pauseGame');
    const playerNameInput = document.getElementById('playerName');
    const displayName = document.getElementById('displayName');
    const playerAvatar = document.getElementById('playerAvatar');
    const currentLocationDisplay = document.getElementById('currentLocation');
    const activityButtonsDiv = document.getElementById('activityButtons');
    const greetingText = document.getElementById('greeting');
    const gameDayDisplay = document.getElementById('gameDay');
    const gameTimeDisplay = document.getElementById('gameTime');
  
    const hungerBar = document.getElementById('hungerBar');
    const energyBar = document.getElementById('energyBar');
    const hygieneBar = document.getElementById('hygieneBar');
    const happinessBar = document.getElementById('happinessBar');
    const moneyDisplay = document.getElementById('moneyDisplay');
    const ceritaBar = document.getElementById('ceritaBar');
  
    const moveUpButton = document.getElementById('moveUp');
    const moveDownButton = document.getElementById('moveDown');
    const moveLeftButton = document.getElementById('moveLeft');
    const moveRightButton = document.getElementById('moveRight');
  
    // Variabel game
    let player = {
      name: '',
      avatar: '',
      hunger: 50,
      energy: 50,
      hygiene: 50,
      happiness: 50,
      cerita: 0,
      money: 50
    };
  
    let currentLocationIndex = 0;
    const locations = ["Tempat 1", "Tempat 2", "Tempat 3", "Tempat 4", "Tempat 5"];
  
    let gameTime = {
      day: 1,
      hour: 6,
      minute: 0
    };
  
    let gameInterval; // Untuk simulasi waktu
  
    // Mulai Game
    startGameButton.addEventListener('click', startGame);
    pauseGameButton.addEventListener('click', pauseGame);
    restartGameButton.addEventListener('click', restartGame);
  
    function startGame() {
      // Ambil nama pemain dan avatar yang dipilih
      const name = playerNameInput.value.trim();
      if (name === "") {
        alert("Masukkan nama kamu terlebih dahulu!");
        return;
      }
      player.name = name;
      displayName.textContent = player.name;
  
      // Ambil avatar yang dipilih
      const avatarRadio = document.querySelector('input[name="avatar"]:checked').value;
      if (avatarRadio === "avatar1") {
        player.avatar = "https://via.placeholder.com/100?text=Avatar+1";
      } else if (avatarRadio === "avatar2") {
        player.avatar = "https://via.placeholder.com/100?text=Avatar+2";
      } else {
        player.avatar = "https://via.placeholder.com/100?text=Avatar+3";
      }
      playerAvatar.src = player.avatar;
  
      // Tampilkan game screen dan sembunyikan start screen
      startScreen.style.display = 'none';
      gameScreen.style.display = 'block';
  
      updateStatusBars();
      updateLocation();
      updateTimeDisplay();
      updateGreeting();
  
      // Simulasi waktu: 1 detik = 1 menit dalam game
      gameInterval = setInterval(simulateGameTime, 1000);
  
      // Tampilkan aktivitas awal
      updateActivities();
    }
  
    function restartGame() {
      location.reload();
    }
  
    // Perbarui tampilan status bars
    function updateStatusBars() {
      hungerBar.style.width = player.hunger + "%";
      hungerBar.textContent = Math.round(player.hunger);
      
      energyBar.style.width = player.energy + "%";
      energyBar.textContent = Math.round(player.energy);
      
      hygieneBar.style.width = player.hygiene + "%";
      hygieneBar.textContent = Math.round(player.hygiene);
      
      happinessBar.style.width = player.happiness + "%";
      happinessBar.textContent = Math.round(player.happiness);
      
      moneyDisplay.textContent = "$" + player.money;
    }
  
    // Perbarui lokasi dan tombol aktivitas sesuai lokasi
    function updateLocation() {
      currentLocationDisplay.textContent = locations[currentLocationIndex];
      updateActivities();
    }
  
    // Perbarui tampilan waktu permainan
    function updateTimeDisplay() {
      let hourStr = gameTime.hour.toString().padStart(2, '0');
      let minuteStr = gameTime.minute.toString().padStart(2, '0');
      gameTimeDisplay.textContent = hourStr + ":" + minuteStr;
      gameDayDisplay.textContent = gameTime.day;
    }
  
    // Perbarui teks greeting berdasarkan waktu
    function updateGreeting() {
      let hour = gameTime.hour;
      let greeting = "";
      if (hour >= 5 && hour < 12) {
        greeting = "Good Morning!";
      } else if (hour >= 12 && hour < 17) {
        greeting = "Good Afternoon!";
      } else if (hour >= 17 && hour < 21) {
        greeting = "Good Evening!";
      } else {
        greeting = "Good Night!";
      }
      greetingText.textContent = greeting;
    }
  
    // Simulasi waktu dan degradasi status
    function simulateGameTime() {
      gameTime.minute++;
      if (gameTime.minute >= 60) {
        gameTime.minute = 0;
        gameTime.hour++;
        if (gameTime.hour >= 24) {
          gameTime.hour = 0;
          gameTime.day++;
        }
      }
      updateTimeDisplay();
      updateGreeting();
  
      // Degradasi status secara berkala (sesuaikan laju degradasinya)
      player.hunger = Math.max(0, player.hunger - 0.5);
      player.energy = Math.max(0, player.energy - 0.3);
      player.hygiene = Math.max(0, player.hygiene - 0.4);
      player.happiness = Math.max(0, player.happiness - 0.2);
  
      updateStatusBars();
  
      // Cek kondisi game over
      if (player.hunger <= 0 || player.energy <= 0 || player.hygiene <= 0 || player.happiness <= 0) {
        endGame();
      }
    }
  
    function endGame() {
      clearInterval(gameInterval);
      gameScreen.style.display = 'none';
      gameOverScreen.style.display = 'block';
    }
  
    // Tombol navigasi
    moveUpButton.addEventListener('click', function () {
        // Ambil posisi top saat ini; jika belum ada, gunakan 0
        let currentTop = parseInt(window.getComputedStyle(playerAvatar).top) || 0;
        // Kurangi nilai top (misalnya 10px) untuk bergerak ke atas
        playerAvatar.style.top = (currentTop - 10) + "px";
      });
      
      moveDownButton.addEventListener('click', function () {
        let currentTop = parseInt(window.getComputedStyle(playerAvatar).top) || 0;
        // Tambahkan nilai top (misalnya 10px) untuk bergerak ke bawah
        playerAvatar.style.top = (currentTop + 10) + "px";
      });
    moveLeftButton.addEventListener('click', function () {
      currentLocationIndex = (currentLocationIndex - 1 + locations.length) % locations.length;
      updateLocation();
    });
    moveRightButton.addEventListener('click', function () {
      currentLocationIndex = (currentLocationIndex + 1) % locations.length;
      updateLocation();
    });
  
    // Navigasi dengan tombol panah keyboard
    document.addEventListener('keydown', function(e) {
      if (gameScreen.style.display === 'block') {
        if (e.key === 'ArrowLeft') {
          currentLocationIndex = (currentLocationIndex - 1 + locations.length) % locations.length;
          updateLocation();
        } else if (e.key === 'ArrowRight') {
          currentLocationIndex = (currentLocationIndex + 1) % locations.length;
          updateLocation();
        }
      }
    });
  
    // Perbarui tombol aktivitas berdasarkan lokasi
    function updateActivities() {
      activityButtonsDiv.innerHTML = "";
      let loc = locations[currentLocationIndex];
      if (loc === "Home") {
        createActivityButton("Get Meal", function() {
          // Mengembalikan Hunger
          player.hunger = Math.min(100, player.hunger + 20);
          updateStatusBars();
        });
        createActivityButton("Take a Bath", function() {
          // Mengembalikan Hygiene
          player.hygiene = Math.min(100, player.hygiene + 20);
          updateStatusBars();
        });
        createActivityButton("Sleep", function() {
          // Mengembalikan Energy
          player.energy = Math.min(100, player.energy + 30);
          updateStatusBars();
        });
        createActivityButton("Do Chores", function() {
          // Menambah uang dan mengurangi Hygiene
          player.money += 10;
          player.hygiene = Math.max(0, player.hygiene - 10);
          updateStatusBars();
        }, true, "Adds $10 but reduces hygiene by 10");
      } else {
        // Lokasi wisata
        createActivityButton("Explore the Area", function() {
          // Meningkatkan Happiness, tapi mengurangi Energy dan Hygiene
          player.happiness = Math.min(100, player.happiness + 15);
          player.energy = Math.max(0, player.energy - 10);
          player.hygiene = Math.max(0, player.hygiene - 10);
          updateStatusBars();
        });
        createActivityButton("Buy Souvenirs", function() {
          // Mengurangi uang, meningkatkan Happiness
          if (player.money >= 15) {
            player.money -= 15;
            player.happiness = Math.min(100, player.happiness + 20);
            updateStatusBars();
          } else {
            alert("Not enough money!");
          }
        }, true, "Costs $15, increases happiness by 20");
        createActivityButton("Eat at Local Restaurant", function() {
          // Mengurangi uang, mengembalikan Hunger
          if (player.money >= 10) {
            player.money -= 10;
            player.hunger = Math.min(100, player.hunger + 25);
            updateStatusBars();
          } else {
            alert("Not enough money!");
          }
        }, true, "Costs $10, restores hunger by 25");
      }
    }
  
    // Fungsi bantu untuk membuat tombol aktivitas
    function createActivityButton(text, action, showInfo = false, infoText = "") {
      let btn = document.createElement('button');
      btn.className = "btn btn-primary m-2";
      btn.textContent = text;
      btn.addEventListener('click', action);
      activityButtonsDiv.appendChild(btn);
      if (showInfo) {
        let infoIcon = document.createElement('span');
        infoIcon.className = "activity-info";
        infoIcon.textContent = "ⓘ";
        infoIcon.title = infoText;
        activityButtonsDiv.appendChild(infoIcon);
      }
    }
  });
  