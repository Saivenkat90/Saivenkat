document.getElementById("fileInput").addEventListener("change", function(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  // Detect file type (JSON vs image)
  if (file.type === "application/json") {
    reader.onload = function(e) {
      try {
        const data = JSON.parse(e.target.result);
        document.getElementById("output").textContent = JSON.stringify(data, null, 2);
      } catch (err) {
        document.getElementById("output").textContent = "Invalid JSON file.";
      }
    };
    reader.readAsText(file);
  } else if (file.type.startsWith("image/")) {
    reader.onload = function(e) {
      const img = document.createElement("img");
      img.src = e.target.result;
      img.style.maxWidth = "100%";
      document.getElementById("output").innerHTML = "";
      document.getElementById("output").appendChild(img);
    };
    reader.readAsDataURL(file);
  } else {
    document.getElementById("output").textContent = "Unsupported file type.";
  }
});
