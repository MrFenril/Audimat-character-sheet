let clearStorageButton = null;
let client = null;
let defaultData = {
    name: '',
    class: '',
    armor: 0,
    health: 0,
    dices: 0,
    stats: {
        mental: 0,
        physic: 0,
        social: 0
    },
    weaknesses: '',
    qualities: '',
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
        if (!cacheData) {
            TS.debug.log("Empty cache for current campaign, initialise data");

            const playerClient = await TS.clients.whoAmI()

            // Potentially usefull later
            // const clients = await TS.clients.getClientsInThisBoard()
            // const playerInfo = await TS.clients.getMoreInfo([clients[0].player])
            // const playerCreature = await TS.creatures.getCreaturesOwnedByPlayer(playerClient.player.id)
            // const creatureInfo = await TS.creatures.getMoreInfo(["40411f31-9049-4bd3-8993-a75cdb87661f"])

            client = {
                ...defaultData,
                clientInfo: playerClient,
            }
            TS.localStorage.campaign.setBlob(JSON.stringify(client));
        }
        else {
            client = JSON.parse(cacheData);
            TS.debug.log("-------cache: " + JSON.stringify(client, null, 4));
        }

        for (statName of Object.keys(client.stats)) {
            const $el = document.getElementById(`character-${statName}`)
            $el.value = client.stats[statName];
        }

        document.getElementById(`character-name`).value = client.name;
        document.getElementById(`character-class`).value = client.class;
        document.getElementById(`character-health`).value = client.health;
        document.getElementById(`character-armor`).value = client.armor;
        document.getElementById(`character-dices`).value = client.dices;

        document.getElementById(`weaknesses`).value = client.weaknesses;
        document.getElementById(`qualities`).value = client.qualities;
        document.getElementById(`relations`).value = client.relationship;
        document.getElementById(`backstory`).value = client.backstory;

    } catch (e) {
        TS.debug.log("error: " + e)
    }
}

function OnValueChange(field, value) {
    field = value;
    saveSheet();
}

async function saveSheet() {
    TS.debug.log("Saving to cache: " + JSON.stringify(client, null, 4));
    await TS.localStorage.campaign.setBlob(JSON.stringify(client));
}

async function clearSheet() {
    try {
        // Clear stored data
        await TS.localStorage.campaign.deleteBlob()

        // Clear sheet inputs
        const inputs = document.querySelectorAll("input,textarea");
        for (let input of inputs) {
            if (input.type == 'number') input.value = 0;
            else input.value = "";
        }
        // Clear skills data and visuals
        clearSkills();
        // Clear capacities
        clearCapacities();

        saveSheet();
    } catch (error) {
        TS.debug.log("Failed to delete local storage: " + error.cause);
        console.error("Failed to delete local storage:", error);
    }
}

async function onStateChangeEvent(msg) {
    if (msg.kind === "hasInitialized") {
        TS.debug.log("Init")
        //the TS Symbiote API has initialized and we can begin the setup. think of this as "init".
        clearStorageButton = document.getElementById("clear-storage");
        await initSheet();
        initTabs();
        initSkillsTables();
        InitCapacities();
    }
}
