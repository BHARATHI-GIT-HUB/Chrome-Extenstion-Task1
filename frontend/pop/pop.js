document.getElementById("getUrl").onclick = getCurrUrl;

function getCurrUrl() {
  chrome.tabs.query(
    {
      active: true,
      lastFocusedWindow: true,
    },
    function (tabs) {
      const tab = tabs[0];
      alert(tab.title);
    }
  );
}
