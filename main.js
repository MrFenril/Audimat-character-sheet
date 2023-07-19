let clearStorageButton = undefined;
let client = {
    name: '',
    class: '',
    health: 0,
    armor: 0,
    dices: 0,
    stats: {
        mental: 0,
        physic: 0,
        social: 0
    },
    weaknesses: '',
    relationship: '',
    backstory: '',
    inventory: [],
    skills: {
        "mental": [],
        "physic": [],
        "social": [],
        "general": []
    },
    capacities: []
};

async function initSheet() {
    let inputs = document.querySelectorAll("input,button,textarea");

    try {
        const campaignInfo = await TS.campaigns.getMoreInfoAboutCurrentCampaign()
        const cacheData = await TS.localStorage.campaign.getBlob()
        TS.debug.log("-------cache: " + cacheData);
        if (!cacheData) {
            TS.debug.log("Empty cache for current campaign, initialise data");
            const playerClient = await TS.clients.whoAmI()

            // Potentially usefull later
            // const clients = await TS.clients.getClientsInThisBoard()
            // const playerInfo = await TS.clients.getMoreInfo([clients[0].player])
            // const playerCreature = await TS.creatures.getCreaturesOwnedByPlayer(playerClient.player.id)
            // const creatureInfo = await TS.creatures.getMoreInfo(["40411f31-9049-4bd3-8993-a75cdb87661f"])

            client = {
                ...client,
                clientInfo: playerClient,
            }
            TS.localStorage.campaign.setBlob(JSON.stringify(client));
        }
        else client = JSON.parse(cacheData);
    } catch (e) {
        TS.debug.log("error: " + e)
    }
}

function onInputChange(input) {
    //handles input changes to store them in local storage

    let data;
    // get already stored data
    TS.localStorage.campaign.getBlob().then((storedData) => {
        //parse stored blob as json, but also handle if it's empty by
        //defaulting to an empty json document "{}" if stored data is false
        data = JSON.parse(storedData || "{}");
        if (input.type == "checkbox") {
            data[input.id] = input.checked ? "on" : "off";
        } else {
            data[input.id] = input.value;
        }
        //set new data, handle response
        TS.localStorage.campaign.setBlob(JSON.stringify(data)).then(() => {
            //if storing the data succeeded, enable the clear storage button
            clearStorageButton.classList.add("danger");
            clearStorageButton.disabled = false;
            clearStorageButton.textContent = "Clear Character Sheet";
            TS.debug.log("set in storage: " + (JSON.stringify(data)));
        }).catch((setBlobResponse) => {
            TS.debug.log("Failed to store change to local storage: " + setBlobResponse.cause);
            console.error("Failed to store change to local storage:", setBlobResponse);
        });
    }).catch((getBlobResponse) => {
        TS.debug.log("Failed to load data from local storage: " + getBlobResponse.cause);
        console.error("Failed to load data from local storage:", getBlobResponse);
    });

    if (input.id == "abilities-text") {
        let actions = parseActions(input.value);
        addActions(actions);
    }
}

function clearSheet() {
    //clear stored data
    TS.localStorage.campaign.deleteBlob().then(() => {
        //if the delete succeeded (.then), set the UI to reflect that
        clearStorageButton.classList.remove("danger");
        clearStorageButton.textContent = "Character Sheet Empty";
    }).catch((deleteResponse) => {
        //if the delete failed (.catch), write a message to symbiote log
        TS.debug.log("Failed to delete local storage: " + deleteResponse.cause);
        console.error("Failed to delete local storage:", deleteResponse);
    });

    //clear sheet inputs
    let inputs = document.querySelectorAll("input,textarea");
    for (let input of inputs) {
        switch (input.type) {
            case "button":
                break;
            case "checkbox":
                input.checked = false;
                break;
            default:
                input.value = "";
                break;
        }
    }
}

function onStateChangeEvent(msg) {
    if (msg.kind === "hasInitialized") {
        TS.debug.log("Init")
        //the TS Symbiote API has initialized and we can begin the setup. think of this as "init".
        clearStorageButton = document.getElementById("clear-storage");
        initSheet();
        initTabs();
        initSkillsTables();
    }
}
