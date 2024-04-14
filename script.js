let quotes = [];
let randomColor = ['rgb(234, 221, 168)','rgb(217, 234, 245)','rgb(242, 219, 217)','rgb(229, 208, 242)','rgb(201, 242, 219)','rgb(242, 198, 198)'];
const quote = document.getElementById('quote');
const author=document.getElementById('author')
const container = document.querySelector('.container');
const quoteContainer = document.querySelector('.quoteContainer');
const loader = document.querySelector('.loader');
const tooltip = document.querySelector('.tooltip');

function loading(){
    quoteContainer.classList.add('hide');
    loader.classList.remove('hide');
}
function completed(){
    quoteContainer.classList.remove('hide');
    loader.classList.add('hide');
}

async function fetchQuotes(){
    loading();
    try{
        const response = await fetch('https://jacintodesign.github.io/quotes-api/data/quotes.json');
        quotes = await response.json();
        Generate();
        return quotes;
    }catch(error){
        alert(error);
    }
}
fetchQuotes();
function Generate(){
    let index = Math.floor(Math.random() * quotes.length);
    let colorIndex=Math.floor(Math.random()* (randomColor.length + 1));
    container.style.backgroundColor = randomColor[colorIndex];
    quote.textContent = quotes[index].text;
    if(quote.textContent.length > 100){
        quote.classList.add('smallFont')
    }else{
        quote.classList.remove('smallFont')
    }
    if(!quotes[index].author){
        author.textContent = 'Unknown'
    }else{
        author.textContent = quotes[index].author;
    }
    completed();
}
function ShareViaTwitter(){
    window.open(`https://twitter.com/intent/tweet?text=${quote.textContent} - ${author.textContent}`,"_blank")
}
function Copy(){
    navigator.clipboard.writeText(quote.textContent);
    tooltip.classList.remove('hidden');
    setTimeout(() => {
        tooltip.classList.add('hidden');
    }, 500);
}