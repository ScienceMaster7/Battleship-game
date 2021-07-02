var view = {
    displayMessage: function (msg) {
      var messageArea = document.getElementById("messageArea");
      messageArea.innerHTML = msg;
    },
    displayHit: function(location) {
      var cell = document.getElementById(location);
      cell.setAttribute("class", "hit");
    },
    displayMiss: function(location) {
      var cell = document.getElementById(location);
      cell.setAttribute("class", "miss");
    }
  }
  var model = {
    boardSize: 7,
    numberShips: 3,
    shipsSunk:0,
    shipLength:3,
    ships: [{locations: [0, 0, 0], hits: ["", "", ""]},
            {locations: [0, 0, 0], hits: ["", "", ""]},
            {locations: [0, 0, 0], hits: ["", "", ""]}],
    fire: function(guess) {
      for (var i = 0; i < this.numberShips; i++) {
        var ship = this.ships[i];
        var index = ship.locations.indexOf(guess);
        if (index >= 0) {
          ship.hits[index] = "hit";
          view.displayHit(guess);
          view.displayMessage("Treffer!");
          if (this.isSunk(ship)) {
            view.displayMessage("Du hasst mein Schiff versenkt!");
            this.shipsSunk++;
          }
          return true;
        }
      }
      view.displayMiss(guess);
      view.displayMessage("Daneben");
      return false;
    },
    isSunk: function (ship) {
        for (var i = 0; i < this.shipLength; i++) {
          if (ship.hits[i] !== "hit") {
            return false;
          }
        }
        return true;
    },
    generateShipLocations: function () {
      var locations;
      for (var i = 0; i < this.numberShips; i++) {
        do {
            locations = this.generateShip();
        } while (this.collision(locations));
        this.ships[i].locations = locations;
      }
    },
    generateShip: function () {
      var direction = Math.floor(Math.random() * 2);
      var row;
      var rowLetters = ["A", "B", "C", "D", "E", "F", "G"];
      var colum;
      if (direction === 1) {
        row = Math.floor(Math.random() * this.boardSize);
        row = rowLetters[row];
        colum = Math.floor(Math.random() * (this.boardSize - (this.shipLength + 1)));
      }
      else {
        row = Math.floor(Math.random() * this.boardSize);
        row = rowLetters[row];
        colum = Math.floor(Math.random() * (this.boardSize - (this.shipLength + 1)));
      }
  
      var newShipLocations = [];
      for (var i = 0; i < this.shipLength; i++) {
        if (direction === 1) {
          newShipLocations.push(row + (colum + i));
        }
        else {
          newShipLocations.push(row + (colum + i));
        }
      }
      return newShipLocations;
    },
    collision: function (locations) {
      for (var i = 0; i < this.numberShips; i++) {
        var ship = this.ships[i];
        for (var j = 0; j < locations.length; j++) {
          if (ship.locations.indexOf(locations[j]) >=0) {
            return true;
          }
        }
      }
      return false;
    }
  };
  var controller = {
    guesses: 0,
    processGuess: function (guess) {
      if (guess === null || guess.length !== 2 ) {
        view.displayMessage("Hopala bitte gib korekte Koordinaten ein.");
      }
  
         if (guess) {
           this.guesses++;
           var hit = model.fire(guess);
           if (hit && model.shipsSunk === model.numberShips) {
             view.displayMessage("Gratuliere du hast all meine Schiffe in " + this.guesses + "versuchen versenkt.");
          }
        }
    }
  };
  function inIt() {
    var fireButton = document.getElementById("fireButton");
    fireButton.onclick = handleFireButton;
    var guessInput = document.getElementById("guessInput");
    guessInput.onkeypress = handleKeyPress;
    model.generateShipLocations();
  }
  function handleKeyPress(e) {
    var fireButton = document.getElementById("fireButton");
    if (e.keyCode === 13) {
      fireButton.click();
      return false;
    }
  }
  function handleFireButton() {
    var guessInput = document.getElementById("guessInput");
    var guess = guessInput.value;
    controller.processGuess(guess);
    controller.value = " ";
  }
  window.onload = inIt;
  