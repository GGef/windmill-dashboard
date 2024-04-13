import reservationTab from "./reservationTab.js"
import historyTab from "./historyTab.js"
import informationTab from "./informationTab.js"
import messagesTab from "./messagesTab.js"
import calendrierTab from "./calendrierTab.js"

var viewTab = document.getElementById("view-tab")

clearTabClass(document.getElementById("b1"))
viewTab.innerHTML = informationTab({})


$(document).ready(function() {
    Type(); // Call Type function when the DOM is ready
});

document.getElementById("b1").addEventListener("click",(e)=>{        
    clearTabClass(e.target)
    viewTab.innerHTML = informationTab({})
})

document.getElementById("b2").addEventListener("click",(e)=>{        
    clearTabClass(e.target)
    viewTab.innerHTML = reservationTab({})
})

document.getElementById("b3").addEventListener("click",(e)=>{        
    clearTabClass(e.target)
    viewTab.innerHTML = historyTab({})
})



document.getElementById("b4").addEventListener("click",(e)=>{        
    clearTabClass(e.target)
    viewTab.innerHTML = messagesTab({})
})
document.getElementById("b5").addEventListener("click",(e)=>{        
    clearTabClass(e.target)
    $.ajax({
        url: 'assets/js/calendrierTab.php', // Replace with the correct path to your PHP file
        type: 'GET',
        dataType: 'html', // Specify the expected data type
        success: function(data) {
          // When the PHP page is successfully loaded, insert its content into a div with id "content"
          viewTab.innerHTML =data;
          calendrierTab();
        },
        error: function() {
          // Handle errors if the PHP page couldn't be loaded
          console.error('Error loading PHP page.');
        }
      });
})





function clearTabClass(e){
    document.getElementById("view-tab").innerHTML = ""
    document.querySelectorAll(".tab-btn").forEach(el => el.classList.remove("text-blue-500","border-b-2","font-medium","border-blue-500"))
    e.classList.add("text-blue-500","border-b-2","font-medium","border-blue-500")
}


function Type() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const itemId = urlParams.get('id');
    $.ajax({
        url: `index1.php?action=ItemType&id=${itemId}`,
        type: "GET",
        dataType: "json",
        success: function(data) {
            console.log("Type function success:", data);
            if (data.data) {
                document.getElementById("b2").innerHTML = "Reservation";
            } else {
                document.getElementById("b2").innerHTML = "Visite";
            }
        },
        error: function(xhr, status, error) {
            console.error("Type function error:", error);
        }
    });
}


