const itemListComponent = document.getElementById("item-list");
const loginComponent = document.getElementById("login-section");
const inputComponent = document.getElementById("input-container");
const itemName = document.getElementById("item-input");
const userNameInput = document.getElementById("user-input");
const title = document.getElementById("title");
const itemButton = document.getElementById("item-button");

let items = [];
let currentIndex;
let singleItem;
let user;
let users;

const getItems = async () => {
  try {
    const response = await fetch("../json/item.json");
    if (response.status == 404) {
      await createItem({}, false);
    } else {
      await response.json().then((data) => (items = Object.values(data)));
    }
  } catch (err) {
    console.log(err);
  }
  displayItems(items);
};

const createItem = async (data, showAlert) => {
  await fetch("/create_item", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (showAlert) alert(data.message);
      console.log(data);
    })
    .catch((err) => {
      if (showAlert) alert("Something went roung try again");
      console.log(err);
    });

  displayItems;
};

const displayItems = (listItem) => {
  let content = "No Item Found";
  if (listItem.length > 0) {
    content = "";
    for (let i in listItem) {
      const name = listItem[i].name;
      content += `<div class="data-item" >
                <div class="item-info">
                    <span style="font-weight: bold">${name}</span>
                    <span>${listItem[i].createdAt}</span>
                </div>
                <div class="action-button">
                    <p style="cursor: pointer;" id='update' data-name='${JSON.stringify(
                      listItem[i]
                    )}' onclick="updateItem(this, ${i})">!</p>
                    <p style="cursor: pointer;" id='delete' onclick="deleteItem(${i}, event)">X</p>
                </div>
            </div>`;
    }
  }
  itemListComponent.innerHTML = content;
};

const addItem = async () => {
  const itemname = itemName.value;

  if (itemname.length < 1) {
    alert("please enter the item name");
    return;
  }

  const date = new Date();
  const createdAt = dateFormat(date);

  const item = {
    name: itemname,
    createdAt: createdAt,
  };

  items.push(item);

  await createItem(items, true);
  console.log(item);
  itemName.value = "";
  displayItems(items);
};

const dateFormat = (date) => {
  const year = date.getFullYear().toString();
  const month = parseInt(date.getMonth()) + 1;
  const d = date.getDate();

  const h = date.getHours();
  const s = date.getMinutes();

  return `${year}-${month}-${d} ${h}:${s} `;
};

const deleteItem = async (index, e) => {
  e.stopPropagation();
  const newArr = items.filter((_, ind) => ind != index);
  items = newArr;
  await createItem(items, true);
  displayItems(items);
};

const updateItem = (element, ind) => {
  const itemData = JSON.parse(element.dataset.name);
  console.log(itemData, "here it is");
  itemName.value = itemData.name;
  itemButton.innerText = "update";
  currentIndex = ind;
  singleItem = itemData;
};

const clickButon = async () => {
  const text = itemButton.innerText;
  if (text.trim().includes("create")) {
    console.log(text, text == "create", items);
    await addItem();
  } else {
    await updateAction(currentIndex, singleItem);
  }
  initialiseButton();
};

const initialiseButton = () => {
  itemButton.innerText = "create";
  itemName.value = "";
};

const updateAction = async (index, itemData) => {
  const itemname = itemName.value;
  itemData.name = itemname;
  const date = new Date();
  itemData["updatedAt"] = dateFormat(date);
  items[index] = itemData;
  console.log(items, itemData, index);
  await createItem(items);
  displayItems(items);
};

const displaySections = async () => {
  console.log(user);
  if (!user) {
    erraseAllComponent();
    title.innerText = "Login";
    loginComponent.style.display = "flex";
    await getUsers();
  } else {
    alert("Welcome");
    erraseAllComponent();
    await getItems();
    displayInputComponent(user.role);
    displayItemList(user.role);
  }
};

const erraseAllComponent = () => {
  itemListComponent.style.display = "none";
  inputComponent.style.display = "none";
  loginComponent.style.display = "none";
};

const getUsers = async () => {
  try {
    const response = await fetch("../json/user.json");
    if (response.status == 404) {
      alert("No user Found");
    } else {
      await response.json().then((data) => (users = Object.values(data)));
      console.log(users);
    }
  } catch (err) {
    alert("SomeThing went roung");
    console.log(err);
  }
};

const login = () => {
  const name = userNameInput.value;
  if (name.length < 1) {
    alert("Please enter the user nanme");
  } else {
    const ind = checkUserName(name);
    if (ind == -1) {
      alert("User does not exist");
    } else {
      user = users[ind];
      userNameInput.value = "";
    }
  }
  displaySections();
};

const checkUserName = (name) => {
  let c = -1;
  for (let i in users) {
    if (name == users[i].name) {
      c = i;
      break;
    }
  }
  return c;
};

const displayInputComponent = (role) => {
  if (role == "create" || role == "update" || role == "admin") {
    inputComponent.style.display = "flex";
    if (role == "update") itemButton.innerText = "";
  }
};

const displayItemList = (role) => {
  if (
    role == "read" ||
    role == "update" ||
    role == "delete" ||
    role == "admin"
  ) {
    itemListComponent.style.display = "flex";
    if (role == "update") {
      itemListComponent.classList.add("hide-delete");
    }
    if (role == "delete") {
      itemListComponent.classList.add("hide-update");
    }
    if (role == "read") {
      itemListComponent.classList.add("hide-div")
    }
  }
};

displaySections();
