//INDEXpage scripts---------------------------------------------------------------------------
// -------------------------------------------------AUTO SCROLL SETTING FOR BANNER----------------------
const highlightRead = document.querySelector("#highlight-read");
const hReadWidth = highlightRead.clientWidth;
let index = 0;
setInterval(() => {
    index++;
    highlightRead.scrollTo({
        left: index * hReadWidth,
        behavior: "smooth"
    });
    if (index >= highlightRead.scrollWidth / hReadWidth - 1) {
        index = -1;
    }

}, 2500);
// ------------------------------------------------------------====--------------
// --------------------------------------------GETTING IMAGES FOR READ BANNER ---------------------------
async function getImage() {

    let response = await fetch("http://localhost:3000/imageLink");
    let fetchedResource = await response.json();
    let slidesGrid = document.querySelector("#slides-grid");
    let highlightImgFrame = document.querySelector(".highlight-img-frame")
    console.log(highlightImgFrame);
    const frameHeight = highlightImgFrame.clientHeight;
    const frameWidth = highlightImgFrame.clientWidth;
    console.log(frameHeight);
    fetchedResource.forEach((imgLink, i) => {

        slidesGrid.innerHTML += ` <div class="highlight-slide">
                                            <div class="highlight-img-frame">
                                                <img height=${frameHeight} width=${frameWidth} class="read-img" src="${imgLink.thisLink}" title="${i}th image" alt="Book image">
                                            </div>
                                        </div>`;

        // console.log(imgLink.thisLink);


    });

}
getImage();
// -------------------------------------------GET QUOTES-------------------------------------------

//quote container height
if (true) {

    let topQuotes = document.querySelector("#top-quotes");
    let topQuotesHeight = topQuotes.clientHeight;
    let topQuotesWidth = topQuotes.clientWidth;
    let quotesGridFrame = document.querySelector("#quotes-grid-frame");
    quotesGridFrame.style.gridAutoColumns = `${topQuotesWidth}px`;
    console.log(topQuotesWidth);


    async function getQuotes() {

        let response = await fetch("http://localhost:3000/quotes");
        let fetchedResource = await response.json();
        console.log("--------", fetchedResource, "-----------")
        fetchedResource.forEach((qts, index) => {
            let thisQuote = qts.thisQuote;
            let thisInfo = qts.thisInfo;
            console.log(thisQuote, thisInfo);
            quotesGridFrame.innerHTML += `<div class="quote-content-frame">
                            <p>${thisQuote}<br><span class="quote-info-edit">${thisInfo}</span></p>
                        </div> `;
        })


    }


    getQuotes();
}

window.addEventListener("resize", () => {
    let topQuotes = document.querySelector("#top-quotes");
    let topQuotesWidth = topQuotes.clientWidth;
    let quotesGridFrame = document.querySelector("#quotes-grid-frame");
    quotesGridFrame.style.gridAutoColumns = `${topQuotesWidth}px`;

    // ----------------------------FOR HIGHLIGHT BANNER READ-----------------------------------------
    let highlightImgFrame = document.querySelector(".highlight-img-frame");
    const frameHeight = highlightImgFrame.clientHeight;
    const frameWidth = highlightImgFrame.clientWidth;
    let readImg = document.querySelector(".read-img");

    readImg.style.width = `${frameWidth}px`;
    readImg.style.height = `${frameHeight}px`;


})

// ---------------------------------------------BOOK RECOMMENDATION SHELVING--------------------
if (true) {

    let flag = 5;
    let parentDiv = document.querySelector("#books-recommended");
    async function recommendBooks() {
        let response = await fetch(`http://localhost:3000/bookRcmndd`);
        let fetched = await response.json();
        console.log("success", flag);
        console.log(fetched.length)
        if (flag >= fetched.length) {
            console.log("flag greater more option collapsed")
            document.querySelector("#more-books-recommend").style.display= "none";
            flag = fetched.length;
            console.log("no button")
        }
        for (let i = 0; i < flag; i++) {
            let obj = fetched[i];
            let check = obj.homeView;
            if (check == 'yes') {
                parentDiv.innerHTML += ` <button class="recommend-button">
                        <div class="recommend-list"> 
                        <img alt="Book image" class="recommend-image" src="${obj.imageurl}">
                        <p class="recommend-img-title">${obj.title}</p>
                        <p class="description-for-rcmmnd">${obj.details}</p>
                        <p class="recommend-click-id">${obj.id} </p>
                        
                    </div>
                    </button>`

            }



        }
    }
    recommendBooks();
    
    document.querySelector("#more-books-recommend").addEventListener("click", () => {
        flag += 5;
        parentDiv.innerHTML = "";
        recommendBooks();
    })
}

