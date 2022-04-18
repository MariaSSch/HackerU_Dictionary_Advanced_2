const cardContainer = document.querySelector(".card_container");
const searchResult = document.querySelector(".search_result");

const get_cards_Dictionary = () => JSON.parse(localStorage.getItem("cardsDictionary")) || [];
const add_card_Dictionary = data => localStorage.setItem("cardsDictionary", JSON.stringify(data));

const get_cards_Search = () => JSON.parse(localStorage.getItem("cardsSearch")) || [];
const add_card_Search = data => localStorage.setItem("cardsSearch", JSON.stringify(data));

cardContainer.innerHTML = get_cards_Dictionary();
searchResult.innerHTML = get_cards_Search();



document.forms[0].addEventListener("submit", event => {
    event.preventDefault();
    if(event.target.word.value !== "" && event.target.translation.value !== "" && event.target.color.value !== "") {
        const cardContent = new Card(event.target.word.value, event.target.translation.value, event.target.color.value);
        const newcard = cardContent.getCard({tag: "div", classList: ["card"]});
        cardContainer.append(newcard);
    } else {
        alert("Заполните все поля формы! Fill all the fields of the form!");
    }
   add_card_Dictionary(cardContainer.innerHTML);
    

    event.target.word.value = "";
    event.target.translation.value ="";
    event.target.color.value ="";
});

document.forms[1].addEventListener("submit", event =>{
    event.preventDefault();
    const searchValue = event.target.search.value; 
    searchResult.innerText = "";

    //поиск карточки и по RU и по EN
    [...cardContainer.childNodes].filter(elem => {
        elem.childNodes.forEach(item => {
            if (searchValue == item.innerText){
                let foundElem = item.parentNode.cloneNode(true);
                    searchResult.appendChild(foundElem);
            }
        })
    });
/*  //поиск или по RU или по EN
    [...cardContainer.childNodes].filter(elem => {
        if (searchValue == elem.innerText){
            let foundElem = elem.cloneNode(true);
            searchResult.appendChild(foundElem);
        }
    })
*/
    if(!searchResult.hasChildNodes()) {
        searchResult.innerText = "Sorry! Nothing found..";
    }
    add_card_Search(searchResult.innerHTML);
    event.target.search.value = "";
});

//----- RU vs EN
document.addEventListener("dblclick", (e) => {
    target = e.target;
    if (target.classList.contains("card")){
        let cardchild = target.childNodes;
        cardchild[2].classList.toggle("hide");
        cardchild[1].classList.toggle("hide");
    }
    add_card_Dictionary(cardContainer.innerHTML);
    add_card_Search(searchResult.innerHTML);

});
   

document.addEventListener("click", e => {
    let target = e.target; 

    if (target.closest(".card_container") && target.tagName === "IMG") {
        target.closest(".card").remove();

    } else if (target.closest(".search_result") && target.tagName === "IMG") {
        target.closest(".card").remove();
    }
    add_card_Dictionary(cardContainer.innerHTML);
    add_card_Search(searchResult.innerHTML);


});


class Card{
    constructor(word, translation, color) {
        this.word = word;
        this.translation = translation;
        this.color = color;
    }
    getCard({tag, classList}){
        const card = document.createElement(tag);
        classList && card.classList.add(...classList);

        const xMark = document.createElement("div");
        const xMarkImg = document.createElement("img");
        const pElemRus = document.createElement("p");
        const pElemEng = document.createElement("p");


        xMark.classList.add("closure");

        card.style.backgroundColor = this.color;
        xMarkImg.src = "media/cross.png";
        pElemRus.innerText = this.word;
        pElemEng.innerText = this.translation;

        pElemEng.classList.add("hide");

        xMark.appendChild(xMarkImg);
        card.append(xMark, pElemRus, pElemEng);

        if(card.style.backgroundColor == "white") {
            card.style.border = "2px solid black";
        }
        return card;
    }
}


