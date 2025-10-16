addLayer("a", {
    achievements: {
        11: {
            name: "Life Power",
            tooltip: "Unlock the Life Power subtab!",
            done() { return hasUpgrade("b", 12)},
            image: "resources/LifePower.png",
            onComplete() {
                return player[this.layer].points.add(1)
            }
        },
        12: {
            name: "1st of many",
            tooltip: "Unlock the 1st buyable!",
            done() { return hasUpgrade("b", 3)},
            
            
        },  
    },
    name: "achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#fff200ff",
    requires: new Decimal(), // Can be a function that takes requirement increases into account
    resource: "achievements", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: "side", // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        // {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    tooltip() {return "Achievements"},
        tabFormat:[
        ["display-text",
        function() { return 'You have ' + format(player[this.layer].points) + ' achievement points!' },
        { "color": "white", "font-size": "24px", "": "Comic Sans MS" }],
        "achievements",
        ],
        
}),

addLayer("b", {
    name: "The Beginning", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "TB", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#f0b2bc",
    requires: new Decimal(), // Can be a function that takes requirement increases into account
    resource: "fun allowed", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        // {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    tooltip() {return "The Beginning"},
    upgrades: {
        11: {
            title: "Welcome",
            description: "Have fun",
            currencyLocation() { return player },
            currencyDisplayName: "matter",
            currencyInternalName: "points",
            cost: 10,
        },
        12: {
            title: "Conciousness",
            description: "Unlocks the Life Power subtab in The Beginning layer.",
            currencyDisplayName: "matter",
            currencyInternalName: "points",
            cost: 10,
            unlocked() { return hasUpgrade('b', 11) },
        },




        1: {
            title: "Lost Memories",
            description: "Doubles your matter gain.",
            currencyDisplayName: "matter",
            currencyInternalName: "points",
            cost: 15,
        },
        2: {
            title: "Tingling Senses",
            description: "Increases your matter gain by 1.5.",
            currencyDisplayName: "matter",
            currencyInternalName: "points",
            cost: 30,
        },
        3: {
            title: "Your mind goes numb...",
            description: "Matter gain is increased based on current matter. Also unlocks Life Power buyables.",
            currencyDisplayName: "matter",
            currencyInternalName: "points",
            cost: 50,
            effect() {
                return player.points.add(1).pow(0.05)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
    },
        buyables: {
            1: {
                cost(x=getBuyableAmount(this.layer,this)) { return new Decimal(100).mul(x) },
                display() { return "np" },
                canAfford() { return player[this.layer].points.gte(this.cost()) },
                buy() {
                    player[this.layer].points = player[this.layer].points.sub(this.cost())
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                },
                unlocked() { return hasUpgrade('b', 3) },
            },
        },
    tabFormat:{
    "Main Tab":{
        content: [["display-text",
        function() { return 'You have ' + format(player.points) + ' matter' },
        { "color": "white", "font-size": "24px", "": "Comic Sans MS" }],   
        "milestones",
        "blank",
        "blank",
        "blank",
        "upgrades"
    ]},
    "Life Power":{
        unlocked() { return hasUpgrade('b', 12) },
        content: [["display-text",
        function() { return 'You have ' + format(player.points) + ' matter' },
        { "color": "white", "font-size": "24px", "": "Comic Sans MS" }], 
        "blank", 
        "blank",
        "blank",
        "blank",
        ["row", [
            ["upgrade", 0], ["upgrade", 1], ["upgrade", 2], ["upgrade", 3], ["upgrade", 4]
        ]],
        ["row",[
            ["buyable", 1], 
        ]],
        ],
    },
    "Info":{
        content: [["display-text", function(){return `Welcome to The Greg Tree!
            <br>
            <br>
            There will be information tabs in all the layers throughout the game.
            <br>
            <br>
            <br>
            <br>
            The Beginning layers purpose, is to unlock other layers and 
            <br>
            features for the forseeable future.
            <br>
            <br>
            Upgrades will appear as you progress.`

        }]]

    },
    }
})

