export const saveToLocalStorage = obj => new Promise(resolve => {
    chrome.storage.local.set(obj, res => resolve(true));
})

export const getFromLocalStorage = arr => new Promise(resolve => {
    chrome.storage.local.get(arr, res => resolve(res));
})

