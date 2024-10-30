const GLOBAL = {
  NAMES_DATA: null,
  BOX_CONFIG: {
    FRENCH_NAME: {
      API_NAME: "french_name",
      HEADING_NAME: "French Name",
    },
    TAMIL_NAME: {
      API_NAME: "tamil_name",
      HEADING_NAME: "Tamil Name",
    },
    ENGLISH_NAME: {
      API_NAME: "english_name",
      HEADING_NAME: "English Name",
    },
  },
};

const searchedItems = new URLSearchParams(window.location.search);
console.log(searchedItems);

const searchedName = searchedItems.get("name");
const selectedLang = searchedItems.get("selectedLang");
// console.log(searchedName);
// console.log(selectedName);

const searchBox = document.getElementById("searchbox");
const radioBtn = document.querySelector(
  `input[type="radio"][value="${selectedLang}"]`
);
if (searchedName && radioBtn) {
  searchBox.value = searchedName;
  radioBtn.checked = true;
}

async function apiFetching(searchName,searchLang) {
  try {
    const api = await fetch(
      `http://localhost/api/list_names.php?limit=5&page=1&name=${
        searchName
      }&language=${searchLang}`
    );
    
    
    
    const response = await api.json();
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

(async () => {
  const data = await apiFetching(searchedName,selectedLang);
  renderData(data);
  GLOBAL.NAMES_DATA = { ...data };
})();

function renderEntry(isSelected, values, language, parentContainer) {
  const createDivTag = document.createElement("div");
  const createLabel = document.createElement("p");
  const createValue = document.createElement("p");
  createDivTag.classList.add("name_list");

  if (isSelected) {
    createLabel.classList.add("selectedLanguage");
    createValue.classList.add("selectedLanguage");
  }

  createLabel.innerText = language + ":";
  createValue.innerText = values;

  createDivTag.appendChild(createLabel);
  createDivTag.appendChild(createValue);

  parentContainer.appendChild(createDivTag);
}

function renderData(response) {
  const { count, results } = response;
  const Box = document.querySelector(".box");

  results.forEach((element) => {
    const itemContainer = document.createElement("div");
    Box.innerHTML = "";
    itemContainer.classList.add("item-container");

    for (const data in GLOBAL.BOX_CONFIG) {
      console.log(element[GLOBAL.BOX_CONFIG[data].API_NAME]);
      console.log(data);
      console.log(selectedLang);

      console.log(data, data.indexOf(selectedLang.toUpperCase()) > -1);

      renderEntry(
        data.indexOf(selectedLang.toUpperCase()) > -1,
        element[GLOBAL.BOX_CONFIG[data].API_NAME],
        GLOBAL.BOX_CONFIG[data].HEADING_NAME,
        itemContainer
      );

      // if (searchedName === element[GLOBAL.BOX_CONFIG[data].API_NAME] ||searchedName == element[GLOBAL.BOX_CONFIG[data].API_NAME[searchedName]]){
      //   const outPutElement = document.createElement("p");
      //   console.log('output',  element[GLOBAL.BOX_CONFIG[data].API_NAME])
      //   outPutElement.innerText =
      //     GLOBAL.BOX_CONFIG[data].HEADING_NAME +
      //     element[GLOBAL.BOX_CONFIG[data].API_NAME];

      //   itemContainer.appendChild(outPutElement);
      // }
    }

    Box.appendChild(itemContainer);
  });
}

const searchForm = document.getElementById("search_form");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(searchForm);

  const searchName = formData.get("search");
  const searchLang = formData.get("names");

  console.log(searchName);
  console.log(searchLang);

  (async () => {
    const data = await apiFetching(searchName,searchLang);
    renderData(data);
    GLOBAL.NAMES_DATA = { ...data };
  })();
});
