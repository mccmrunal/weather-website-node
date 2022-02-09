console.log("client side javascript file loaded");
// fetch(`http://puzzle.mead.io/puzzle`).then((response)=>{
//     response.json().then(data=>{
//         console.log(data);
//     })
// }).catch(error=>{
//     console.log(error.message);
// })



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = "LOADING WEATHER....";
    messageTwo.textContent =""
    fetch(`/weather?address=${location}`).then((response)=>{
    
    response.json().then(data=>{
        if(data.error){
            console.log(data.error);
            messageTwo.textContent = error.message
        }
        messageOne.textContent = data.place;
        messageTwo.textContent = data.forecast;
        
        console.log(data)
    }
)})
    console.log("testing");
    
})