import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://champ-a315a-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const feedListInDB = ref(database, "feed")

const inputFieldEl = document.getElementById("input-text")
const fromTextEl = document.getElementById("From-text")
const toTextEl = document.getElementById("To-text")
const feedListEl = document.getElementById("feed-list")
const addButtonEl = document.getElementById("addButton")

addButtonEl.addEventListener("click",function(){
    let inputValue = {
            inputField:inputFieldEl.value,
            fromText:fromTextEl.value,
            toText:toTextEl.value
            }
    
    push(feedListInDB, inputValue)

    clearInputFieldEl()
})

onValue(feedListInDB, function(snapshot){
    if(snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val())

        clearFeedListEl()
        
        for(let i=0;i<itemsArray.length;i++){
            let currentItem = itemsArray[i]
           
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
        
            appendItemToFeedListEl(currentItem)
            
        }
    }else{
        feedListEl.innerHTML = "No items here... yet"
    }
})
function  clearInputFieldEl(){
    inputFieldEl.value = ""
    fromTextEl.value = ""
    toTextEl.value = ""
}
function clearFeedListEl(){
    feedListEl.innerHTML = ""
}

function appendItemToFeedListEl(item){
    let itemID = item[0]
    let itemObj = item[1]
    const {fromText , inputField ,toText} = itemObj
    let newEl = document.createElement("li")

    newEl.innerHTML  = `<div class="sub-list-container">
                            <p class="top-text">from: ${fromText}</p>
                            <h3 class="main-text">${inputField}</h3>
                            <p class="bottom-text">To: ${toText}</p>
                        </div>`

    feedListEl.append(newEl)
}