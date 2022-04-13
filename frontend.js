fetch("http://localhost:3000/test")
.then(res => res.json)
.then(data => {
    data.array.forEach(element => {
        rendertodo(element)
    });
})

document.getElementById("filledstocks").addEventListener("load", addData)

function addData(){
    
}