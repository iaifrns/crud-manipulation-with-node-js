const menuContainer = document.getElementById("menu-container");
const roleContainer = document.getElementById("role-container");
const mainContainer = document.querySelector(".main-container");
const loader = document.getElementById("loader");

let roleList;

const showRoleSection = async () => {
  erraseAllSections();
  mainContainer.classList.add("erraser");
  loader.style.display = "flex";
  await createRoleFile("../json/role.json");
  loader.style.display = "none";
  mainContainer.classList.remove("erraser");
  roleContainer.style.display = "flex";
};

const createRole = async () => {
  await createRoleFile("../json/role.json");
  console.log("here you are");
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
          console.log(data.message,roleList);
        })
        .catch((error) => console.log(error));
    }else {
      console.log(response)
    }
  } catch (err) {
    console.log(err);
  }
};
