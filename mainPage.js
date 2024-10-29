const role = "role";
const valueRole = ["create", "read", "update", "delete", "admin"]; //{id, nom}
const valueUser = ["user 1", "user 2", "user 3", "user 4", "user 5"];//{id, nom, id-role}
const user = "user";
const item = "item"

const controlIfRoleExist = () => {
  const getResult = localStorage.getItem(role);
  if (getResult == null) {
    localStorage.setItem(role, valueRole);
    console.log("created ...");
  }
  const getUsers = localStorage.getItem(user);
  if (getUsers == null) {
    localStorage.setItem(user, valueUser);
  }
};

const errorMessage = document.getElementById("error-message-user");
errorMessage.style.display = "none";
const readElement = document.getElementById("read-element");
const createElement = document.getElementById("create-element");
const updateElement = document.getElementById("update-element");
const deleteElement = document.getElementById("delete-element");
const getUserElement = document.getElementById("get-user-name");
const titleElement = document.getElementById("title-text");
const createInput = document.getElementById("create-input");
const createButton = document.getElementById("create-button");

const checkUser = () => {
  const user = document.getElementById("username").value;
  if (valueUser.includes(user)) {
    errorMessage.style.display = "none";
    getUserElement.style.display = "none";
    erraceBlocks();
    switch (user) {
      case valueUser[0]:
        createElement.style.display = "flex";
        createButton.innerText = "Create";
        titleElement.innerText = "Welcome Create Element";
        break;
      case valueUser[1]:
        readElement.style.display = "flex";
        titleElement.innerText = "Welcome Read Element";
        break;
      case valueUser[2]:
        createElement.style.display = "flex";
        titleElement.innerText = "Welcome Update Element";
        createInput.placeholder = "id element to update";
        createButton.innerText = "select";
        break;
      case valueUser[3]:
        createElement.style.display = "flex";
        titleElement.innerText = "Welcome Delete Element";
        createInput.placeholder = "id element to delete";
        createButton.innerText = "delete";
        break;
      case valueUser[4]:
        displayBlocks();
        createButton.innerText = "Create";
        titleElement.innerText = "Welcome Admin";
        createElement.placeholder = "Enter element name";
        break;
      default:
        createButton.innerText = "Create";
        break;
    }
  } else {
    errorMessage.style.display = "block";
    errorMessage.innerText = "Not Authorise";
  }
};

const actionFunction = () => {
    
}

const erraceBlocks = () => {
  createElement.style.display = "none";
  readElement.style.display = "none";
  updateElement.style.display = "none";
  deleteElement.style.display = "none";
};

const displayBlocks = () => {
  createElement.style.display = "flex";
  readElement.style.display = "flex";
  updateElement.style.display = "block";
  deleteElement.style.display = "block";
};

controlIfRoleExist();
