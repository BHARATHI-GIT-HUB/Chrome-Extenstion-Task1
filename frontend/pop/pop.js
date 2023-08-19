document.getElementById("getUrl").onclick = getCurrUrl;
document.getElementById("fetchData").onclick = fetchData;

function getCurrUrl() {
  chrome.tabs.query(
    {
      active: true,
      lastFocusedWindow: true,
    },
    function (tabs) {
      const tab = tabs[0];

      const xhr = new XMLHttpRequest();

      xhr.open("GET", tab.url, true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          const parser = new DOMParser();
          const htmlDoc = parser.parseFromString(xhr.responseText, "text/html");
          alert(tab.url.split("/")[2]);

          if (tab.url.split("/")[2] != "www.amazon.in") {
            document.getElementById("title").innerHTML =
              "Can't scrape this website";
            document.getElementById("load").id = "noload";
            document.getElementById("fetchData").id = "none";
            document.getElementById("getProduct").id = "none";
          }

          const title = htmlDoc.querySelector("title").textContent;
          const name = title.split(",");

          document.getElementById("title").innerHTML = name[0];
          document.getElementById("load").id = "noload";
          document.getElementById("getProduct").id = "none";
        } else {
          document.getElementById("none").id = "load";
        }
      };
      xhr.send();
      alert(tab.url);
    }
  );
}
