const cardContainer = document.querySelector(".card_container");
let cardList = [];

document.forms[0].addEventListener("submit", event => {
    event.preventDefault();
    const word          = event.target.word.value;
    const translation   = event.target.translation.value;
    const color         = event.target.color.value;

    if(word !== "" && translation !== "" && color !== "") {
        cardList.push({word, translation, color, wShift: false});
    } else {
        alert("Заполните все поля формы! Fill all the fields of the form!");
    }

   render(cardList);
})

document.forms[1].addEventListener("submit", event =>{
    event.preventDefault();
    const searchValue = event.target.search.value; 
    cardList = cardList.filter(item => item.word.startsWith(searchValue) || item.translation.startsWith(searchValue));
    
    render(cardList);
    
    if (cardList.length === 0) {
        const cardDefault = document.createElement("p");
        cardContainer.appendChild(cardDefault);

        cardDefault.innerText = "Sorry! Nothing found..";
    }
});

function render(list){
    cardContainer.innerText = "";

    for(let elem of list) {
        const card = document.createElement("div");
        const xMark = document.createElement("div");
        const xMarkImg = document.createElement("img");
        const pElem = document.createElement("p");

        card.classList.add("card");
        xMark.classList.add("closure");

        card.style.backgroundColor = elem.color;
        xMarkImg.src = "media/cross.png";
        pElem.innerText = elem.word;

        xMark.appendChild(xMarkImg);
        card.append(xMark, pElem);
        cardContainer.appendChild(card);

        if(card.style.backgroundColor == "white") {
            card.style.border = "2px solid black";
        }

        xMark.addEventListener("click", () => {
            cardList = cardList.filter(item => cardList.indexOf(item) !== cardList.indexOf(elem));
            render(cardList);
        });

        card.addEventListener("dblclick", () => {
            for(let i = 0; i < cardList.length; i++) {
                if (cardList[i] == elem){
                    cardList[i].wShift = !cardList[i].wShift;
                } 
            } 
            render(cardList);
        });
                if(elem.wShift) {
                    pElem.innerText = elem.translation;
                } else {
                    pElem.innerText = elem.word;
                }

    }
    

}

render(cardList);