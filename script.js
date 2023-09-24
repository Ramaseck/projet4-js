const itemsArray = localStorage.getItem("items")? JSON.parse(localStorage.getItem("items")) :
[]
console.log(itemsArray)
document.querySelector("#enter").addEventListener("click", () =>{
    const item= document.querySelector("#item")
    createItem(item)
})
function displayItems(){
    let items = ""
    for(let i=0 ; i<itemsArray.length; i++){
        items += `  
        
        <div class="container mt-5 " >
        <table class="table table-bordered ">

            <thead>
                <tr>
                    <th>Produit</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>${itemsArray[i]}</td>
                <td>
                        <button type="button" class="  bg-primary editBtn">Edit</button>
                        <button type="button" class="  bg-danger deleteBtn">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
 
    </div>`
    }
    document.querySelector(".to-do-list").innerHTML=items
    activateDeleteListeners()
    activateEditListeners()
    activateSaveListeners()
    activateCancelListeners()
}
function  activateDeleteListeners(){
    let deleteBtn=document.querySelectorAll(".deleteBtn")
    deleteBtn.forEach((db, i) => {
        db.addEventListener("click", () =>{deleteItem(i)})

    })
}


function activateEditListeners() {
    const editBtn = document.querySelectorAll(".editBtn");
    editBtn.forEach((eb, i) => {
        eb.addEventListener("click", () => {
            const currentItem = eb.closest(".container");
            const itemText = currentItem.querySelector("td");
            const originalText = itemText.textContent;
            
            const editInput = document.createElement("input");
            editInput.type = "text";
            editInput.value = originalText;
            
            const saveBtn = document.createElement("button");
            saveBtn.textContent = "Enregistrer";
            saveBtn.classList.add("saveBtn");
            
            const cancelBtn = document.createElement("button");
            cancelBtn.textContent = "Annuler";
            cancelBtn.classList.add("cancelBtn");
            
            itemText.textContent = "";
            itemText.appendChild(editInput);
            currentItem.querySelector(".editBtn").style.display = "none";
            currentItem.querySelector(".deleteBtn").style.display = "none";
            itemText.appendChild(saveBtn);
            itemText.appendChild(cancelBtn);
            
            saveBtn.addEventListener("click", () => {
                // Sauvegarder la nouvelle valeur
                const editedValue = editInput.value;
                itemText.textContent = editedValue;
                currentItem.querySelector(".editBtn").style.display = "block";
                currentItem.querySelector(".deleteBtn").style.display = "block";
                saveBtn.remove();
                cancelBtn.remove();
            });
            
            cancelBtn.addEventListener("click", () => {
                // Annuler l'édition
                itemText.textContent = originalText;
                currentItem.querySelector(".editBtn").style.display = "block";
                currentItem.querySelector(".deleteBtn").style.display = "block";
                saveBtn.remove();
                cancelBtn.remove();
            });
        });
    });
}


function deleteItem(i){
    itemsArray.splice(i, 1)
    localStorage.setItem("items", JSON.stringify(itemsArray) )
    location.reload()
}

function deleteItem(i){
    itemsArray.splice(i, 1)
    localStorage.setItem("items", JSON.stringify(itemsArray) )
    location.reload()
}

function createItem(item){
    itemsArray.push(item.value)
    localStorage.setItem("items", JSON.stringify(itemsArray))
    location.reload()
}
function displayDate(){
    let date = new Date()
    date = date.toString().split(" ")
    document.querySelector("#date").innerHTML=date[1]+ " "+ date[2]+ " " +date [3];
}

window.onload = function(){
    displayDate()
    displayItems()
}
