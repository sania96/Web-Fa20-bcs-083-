function showToast() {
    var toastContainer = document.getElementById("toastContainer");
    toastContainer.innerHTML = "<div>Hello, world! This is Fa20-bcs-083(sania sadaqat).<button id='toastButton' onclick='hideToast()'>Hide</button></div>";
    toastContainer.classList.add("show");
  }
  
  function hideToast() {
    var toastContainer = document.getElementById("toastContainer");
    toastContainer.classList.remove("show");
  }
  
