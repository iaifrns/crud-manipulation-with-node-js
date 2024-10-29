const menuContainer = document.getElementById("menu-container");
const roleContainer = document.getElementById("role-container");

const showRoleSection = () => {
  erraseAllSections();
  roleContainer.style.display = "flex";
};

const createRole = () => {
  let roleList;
  createRoleFile("../json/role.json");
  /* if (checkFileExist('../json/role.json')){
        console.log('file exist')
    }else {
        console.log('file does not exist')
     }*/
};

const erraseAllSections = () => {
  menuContainer.style.display = "none";
  roleContainer.style.display = "none";
};

const createRoleFile = new Promise((res) => {
  fetch(res.apply)
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
});
