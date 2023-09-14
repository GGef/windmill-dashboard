import firstTab from "./firstTab.js"
import secondTab from "./secondTab.js"
import thirdTab from "./thirdTab.js"

var viewTab = document.getElementById("view-tab")

clearTabClass(document.getElementById("b1"))
viewTab.innerHTML = firstTab({})




document.getElementById("b1").addEventListener("click",(e)=>{        
    clearTabClass(e.target)
    viewTab.innerHTML = firstTab({})
})

document.getElementById("b2").addEventListener("click",(e)=>{        
    clearTabClass(e.target)
    viewTab.innerHTML = secondTab({})
})

document.getElementById("b3").addEventListener("click",(e)=>{        
    clearTabClass(e.target)
    viewTab.innerHTML = thirdTab({})
})


function clearTabClass(e){
    document.getElementById("view-tab").innerHTML = ""
    document.querySelectorAll(".tab-btn").forEach(el => el.classList.remove("text-blue-500","border-b-2","font-medium","border-blue-500"))
    e.classList.add("text-blue-500","border-b-2","font-medium","border-blue-500")
}