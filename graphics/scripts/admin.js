// Listen for a broadcast requesting a page reload.  If so, reload the page.
nodecg.listenFor("ReloadBrowser", message => {
    // Force a reload of the page from the server
    location.reload(true)
})