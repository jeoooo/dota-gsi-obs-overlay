# DOTA 2 GSI OVERLAY 


![DOTA 2 GSI OVERLAY](image.png)

OBS Browser source Streaming tools for DOTA 2 using game state integration

## Features

- Realtime data parsing from  the DOTA 2 client 
- Web GUI draft screen
- Open source and customizable! (uses svelte as its frontend framework)
- Scoreboard stats **(to be updated)**

## Table of Contents

- [Installation](#installation)
- [License](#license)

## Installation

To configure the Dota client to report gamestate, you need to add a config file in `steamapps\common\dota 2 beta\game\dota\cfg\gamestate_integration\`. 

The file must use the name pattern called `gamestate_integration_*.cfg`, for example `gamestate_integration_dota2-gsi.cfg`.

The following example is included in this repository, you can copy it straight into your Dota directory to get started.

```
"dota2-gsi Configuration"
{
    "uri"               "http://localhost:3000/"
    "timeout"           "5.0"
    "buffer"            "0.1"
    "throttle"          "0.1"
    "heartbeat"         "30.0"
    "data"
    {
        "buildings"     "1"
        "provider"      "1"
        "map"           "1"
        "player"        "1"
        "hero"          "1"
        "abilities"     "1"
        "items"         "1"
        "draft"         "1"
        "wearables"     "1"
    }
    "auth"
    {
        "token"         "hello1234"
    }
}
```

Download this repository as a ZIP

![Alt text](image-1.png)

or you may clone this repository using the following commands

```bash
git clone https://github.com/jeoooo/dota-gsi-obs-overlay.git
```

after setting up the config and the repository to your local machine, execute the following commands

```bash
npm install
node index.js
cd svelte-app
npm run dev

```

This will open up a local environment at `http://localhost:8080`

- This Web GUI currently has 2 features for now, namely
  - draft overlay
  - scoreboard (to be updated)

For more information, see the [CS:GO GameState Integration page](https://developer.valvesoftware.com/wiki/Counter-Strike:_Global_Offensive_Game_State_Integration)

## Resources

- [DOTA 2 Game State Integration](https://github.com/xzion/dota2-gsi)
- [Valve Game State Integraton for CSGO](https://developer.valvesoftware.com/wiki/Counter-Strike:_Global_Offensive_Game_State_Integration)
- [OBS Studio (for streaming the draft web GUI)](link_to_obs_studio)

