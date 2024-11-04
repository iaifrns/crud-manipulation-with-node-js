const menuContainer = document.getElementById("menu-container");
const roleContainer = document.getElementById("role-container");
const mainContainer = document.querySelector(".main-container");
const loader = document.getElementById("loader");
const roles = document.getElementById("role-list");
const roleName = document.getElementById("role-name");
const backButton = document.getElementById("back-button");
const title = document.getElementById("title");

let roleList = [];

backButton.addEventListener("click", () => {
  erraseAllSections();
  erraseAllUSerSections();
  backButton.style.display = "none";
  menuContainer.style.display = "flex";
});

/* start of role section */

const showRoleSection = async () => {
  erraseAllSections();
  backButton.style.display = "block";
  mainContainer.classList.add("erraser");
  loader.style.display = "flex";
  await createRoleFile("../json/role.json");
  loader.style.display = "none";
  mainContainer.classList.remove("erraser");
  roleContainer.style.display = "flex";
  displayRoles();
};

const createRole = async () => {
  const role = roleName.value;
  if (role.length < 1) {
    alert("Please Enter the role");
  } else {
    roleList.push(role);
    const roleObject = createObject();
    await addRole(roleObject);
    roleName.value = "";
    displayRoles();
  }
};

const createObject = () => {
  const roleObject = {};
  for (let i in roleList) {
    roleObject[i] = roleList[i];
  }
  return roleObject;
};

const erraseAllSections = () => {
  menuContainer.style.display = "none";
  roleContainer.style.display = "none";
};

const createRoleFile = async (file) => {
  try {
    const response = await fetch(file);
    if (response.status == 404) {
      console.log("here ...");
      await fetch("/create_role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      })
        .then((response) => response.json())
        .then((data) => {
          roleList = Object.values({});
          console.log(data.message, roleList);
        })
        .catch((error) => console.log(error));
    } else {
      await response.json().then((data) => {
        roleList = Object.values(data);
        console.log(roleList);
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const displayRoles = () => {
  if (roleList.length == 0) {
    roles.innerHTML = "<p style='font-weight: bold'> No Role Found</p>";
  } else {
    let context = "";
    for (let i in roleList) {
      context += `<div class="role-item">${roleList[i]} <p style='font-weight: bold; cursor: pointer' onclick='deleteRole(${i})'>X</p></div>`;
    }
    roles.innerHTML = context;
  }
};

const deleteRole = async (index) => {
  const newArr = roleList.filter((_, ind) => index != ind);
  roleList = newArr;
  await addRole(createObject());
  displayRoles();
};

const addRole = async (data) => {
  try {
    await fetch("/create_role", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
      })
      .catch((err) => {
        alert("some thing went rong");
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};

/* end of role section */

/* start of user section  */

const userForm = document.getElementById("user-form");
const userList = document.getElementById("user-list");
const selectRoles = document.getElementById("select-roles");
const userName = document.getElementById("user-name");

let users = [];
let userRole = "";

selectRoles.addEventListener("change", () => {
  userRole = selectRoles.value;
  console.log(userRole);
});

const erraseAllUSerSections = () => {
  userForm.style.display = "none";
  userList.style.display = "none";
  menuContainer.style.display = "none";
};

const showUserSection = async () => {
  erraseAllUSerSections();
  backButton.style.display = 'block'
  title.innerText = "User Interface";
  userForm.style.display = "flex";
  userList.style.display = "flex";
  await createRoleFile("../json/role.json");
  await getUsers();
  fileSelect();
  displayUser();
};

const fileSelect = () => {
  let content =
    "<option value='' style='font-weight: bold'>Choose role</option>";
  for (let i in roleList) {
    content += `<option value= ${i}>${roleList[i]}</option>`;
  }
  selectRoles.innerHTML = content;
};

const getUsers = async () => {
  try {
    const response = await fetch("../json/user.json");
    if (response.status == 404) {
      console.log("here it is ");
      await createUser({}, false);
      users = [];
    } else {
      await response.json().then((data) => {
        users = Object.values(data);
        console.log(users);
      });
    }
  } catch (err) {
    alert("an error occured");
    console.log(err);
  }
};

const createUser = async (data, showAlert) => {
  try {
    await fetch("/create_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (showAlert) alert(data.message);
        console.log(data.message);
      });
  } catch (err) {
    console.log(err);
    alert("an Error occured");
  }
};

const displayUser = () => {
  let content = "<p>No user found</p>";
  if (users.length > 0) {
    content = "";
    const userInfo = (username, role) =>
      `<div class = 'user-info'><span>name: ${username}</span><span>role: ${role}</span></div>`;
    for (let i in users) {
      content += `<div class='user-item'>${userInfo(
        users[i].name,
        users[i].role
      )} <p style='cursor:pointer' onclick="deleteUser(${i})">X</p></div>`;
    }
  }

  userList.innerHTML = content;
};

const addUser = async () => {
  const username = userName.value;

  if (username.length < 1 || userRole.length < 1) {
    alert("Please enter all informations");
    return;
  }

  const user = {
    name: username,
    role: roleList[parseInt(userRole)],
  };
  users.push(user);

  await createUser(createUserObject(), true);

  userName.value = "";
  selectRoles.value = "";

  displayUser();
};

const createUserObject = () => {
  const userObject = {};
  for (let i in users) {
    userObject[i] = users[i];
  }
  return userObject;
};

const deleteUser = async (index) => {
  newArr = users.filter((_,ind) => ind != index)
  users = newArr
  await createUser(createUserObject(), true);
  displayUser()
}

/* end of usser section */
