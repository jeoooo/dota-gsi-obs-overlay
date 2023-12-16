# dota-gsi-obs-overlay

OBS draft overlay using DOTA 2's  gamestate integration.
Uses [xzion/dota2-gsi](https://github.com/xzion/dota2-gsi) to parse game data.

# Prerequsites

1. configure DOTA 2 launch options with `-gamestateintegration`
2. add `gamestate_integration_dota2-gsi.cfg` in `steamapps\common\dota 2 beta\game\dota\cfg\gamestate_integration\`

see [xzion/dota2-gsi](https://github.com/xzion/dota2-gsi) for more details

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
        "token"         "rp"
    }
}
```


# setup

```bash
git clone https://github.com/jeoooo/dota-gsi-obs-overlay.git
cd dota-gsi-obs-overlay
npm install
node index.js
```

