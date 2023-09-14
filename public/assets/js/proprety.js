import addTab from "./addTab.js"
import modifyTab from "./ModifyTab.js"
import reservationTab from "./reservationTab.js"
import historyTab from "./historyTab.js"
import informationTab from "./informationTab.js"
import messagesTab from "./messagesTab.js"
import calendrierTab from "./calendrierTab.js"

var viewTab = document.getElementById("view-tab")

clearTabClass(document.getElementById("b1"))
viewTab.innerHTML = addTab({})




document.getElementById("b1").addEventListener("click",(e)=>{        
    clearTabClass(e.target)
    viewTab.innerHTML = addTab({})
})

document.getElementById("b2").addEventListener("click",(e)=>{        
    clearTabClass(e.target)
    viewTab.innerHTML = modifyTab({})
})

document.getElementById("b3").addEventListener("click",(e)=>{        
    clearTabClass(e.target)
    viewTab.innerHTML = reservationTab({})
})

document.getElementById("b4").addEventListener("click",(e)=>{        
    clearTabClass(e.target)
    viewTab.innerHTML = historyTab({})
})

document.getElementById("b5").addEventListener("click",(e)=>{        
    clearTabClass(e.target)
    viewTab.innerHTML = informationTab({})
})

document.getElementById("b6").addEventListener("click",(e)=>{        
    clearTabClass(e.target)
    viewTab.innerHTML = messagesTab({})
})
document.getElementById("b7").addEventListener("click",(e)=>{        
    clearTabClass(e.target)
    viewTab.innerHTML = calendrierTab({})
})




function clearTabClass(e){
    document.getElementById("view-tab").innerHTML = ""
    document.querySelectorAll(".tab-btn").forEach(el => el.classList.remove("text-blue-500","border-b-2","font-medium","border-blue-500"))
    e.classList.add("text-blue-500","border-b-2","font-medium","border-blue-500")
}