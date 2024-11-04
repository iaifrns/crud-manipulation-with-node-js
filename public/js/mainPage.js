const itemListComponent = document.getElementById("item-list");
const itemName = document.getElementById('item-input')

let items = [];

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
  displayItems(items)
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
};

const displayItems = (listItem) => {
  let content = "No Item Found";
  if (listItem.length > 0) {
    content = "";
    for (let i in listItem) {
      content += `<div class="data-item">
                <div class="item-info">
                    <span style="font-weight: bold">${listItem[i].name}</span>
                    <span>${listItem[i].createdAt}</span>
                </div>
                <p style="cursor: pointer;">X</p>
            </div>`;
    }
  }
  itemListComponent.innerHTML = content;
};

const addItem = async () => {
    const itemname = itemName.value

    if(itemname.length < 1){
        alert('please enter the item name')
        return
    }

    const date = new Date()
    const createdAt = dateFormat(date)

    const item = {
        name : itemname,
        createdAt: createdAt
    }

    items.push(item)
    
    await createItem(items, true)
    console.log(item)
    displayItems(items)
}

const dateFormat = (date) => {
    const year = date.getFullYear().toString()
    const month = parseInt(date.getMonth()) + 1
    const d = date.getDate()

    const h = date.getHours()
    const s = date.getMinutes()

    return `${year}-${month}-${d} ${h}:${s} `
}

getItems();
console.log(items);
