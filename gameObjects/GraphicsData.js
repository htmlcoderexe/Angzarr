class GraphicsData
{
    static get(name)
    {
        if(GraphicsData.graphics[name])
        {
            return VectorSprite.fromRawObject(GraphicsData.graphics[name]);
        }
        // #TODO: default graphic if not found!
    }
    /**
    Stores the sprites used by the game engine in serialised form.
    This is an object with string properties, each property name corresponds
    to an animation name, the "default" one is called "idle".
    Each animation contains an array of paths.
    Each path contains an array of keyframes.
    Each keyframe is an object with mandatory properties "time", "fill" and "path".
    "fill" is either:
        1) a hexadecimal colour as a string, either in #RRGGBB or #RRGGBBAA format;
        AA assumed to be FF (255) if not present, or
        2) a gradient definition:
        The gradient definition is an object with mandatory properties "coords", "stops" and "colours".
        "coords" contains coordinates for the gradient's control points.
        The exact specifications of the control points depend on the gradient type.
        "stops" contains a list of of colour stop offsets used by the gradient;
        the offsets must be in ascending order, begin with 0.0 and end with 1.0
        "colours" contains a list of hexadecimal colours as defined in "fill" 1), corresponding
        to each colour stop offset.
        The optional property "type" indicates the gradient type and is assumed to have
        the value "linear" if omitted.
    "path" is a path in the SVG path format. Either relative or absolute coordinates
    may be used. Multiple frames of the same path must contain the exact same commands.
    Optional properties:
    "rotation" is an angle expressed in degrees, the default value is 0.
     */
static graphics = {
ship_scout: {
    "idle": [
        [
            {
                "time": 0,
                "fill": "#FFAF00",
                "path": "m 0,80 c 6,-0 14,-25 14,-40 h -28 c 0,15 8,40 14,40 z"
            },
            {
                "time": 0.2,
                "fill": "#FFAF00",
                "path": "m 0,80 c 6,-0 14,-35 14,-40 h -28 c 0,5 8,40 14,40 z"
            },
            {
                "time": 0.4,
                "fill": "#FFAF00",
                "path": "m 0,80 c 6,-0 14,-25 14,-40 h -28 c 0,15 8,40 14,40 z"
            },
            {
                "time": 0.6,
                "fill": "#FFAF00",
                "path": "m 0,80 c 6,-0 14,-25 14,-40 h -28 c 0,15 8,40 14,40 z"
            },
            {
                "time": 0.8,
                "fill": "#FFAF00",
                "path": "m 0,80 c 6,-0 14,-25 14,-40 h -28 c 0,15 8,40 14,40 z"
            }
        ],
        [
            {
                "time": 0,
                "fill": "#FF6000",
                "path": "m -0 -48 c -19.2 16.8 -12 36 -24 52.8 c -33.6 36 -28.8 24 -16.8 84 c -4.8 -24 9.6 -40.8 21.6 -40.8 h 38.4 c 12 0 26.4 16.8 21.6 40.8 c 12 -60 16.8 -48 -16.8 -84 c -12 -16.8 -4.8 -36 -24 -52.8"
            },
            {
                "time": 0.2,
                "fill": "#FF6000",
                "path": "m -0 -48 c -19.2 16.8 -12 36 -24 52.8 c -33.6 36 -28.8 24 -16.8 84 c -4.8 -24 9.6 -40.8 21.6 -40.8 h 38.4 c 12 0 26.4 16.8 21.6 40.8 c 12 -60 16.8 -48 -16.8 -84 c -12 -16.8 -4.8 -36 -24 -52.8"
            },
            {
                "time": 0.4,
                "fill": "#FF6000",
                "path": "m -0 -48 c -19.2 16.8 -12 36 -24 52.8 c -33.6 36 -28.8 24 -16.8 84 c -4.8 -24 9.6 -40.8 21.6 -40.8 h 38.4 c 12 0 26.4 16.8 21.6 40.8 c 12 -60 16.8 -48 -16.8 -84 c -12 -16.8 -4.8 -36 -24 -52.8"
            },
            {
                "time": 0.6,
                "fill": "#FF6000",
                "path": "m -0 -48 c -19.2 16.8 -12 36 -24 52.8 c -33.6 36 -28.8 24 -16.8 84 c -4.8 -24 9.6 -40.8 21.6 -40.8 h 38.4 c 12 0 26.4 16.8 21.6 40.8 c 12 -60 16.8 -48 -16.8 -84 c -12 -16.8 -4.8 -36 -24 -52.8"
            },
            {
                "time": 0.8,
                "fill": "#FF6000",
                "path": "m -0 -48 c -19.2 16.8 -12 36 -24 52.8 c -33.6 36 -28.8 24 -16.8 84 c -4.8 -24 9.6 -40.8 21.6 -40.8 h 38.4 c 12 0 26.4 16.8 21.6 40.8 c 12 -60 16.8 -48 -16.8 -84 c -12 -16.8 -4.8 -36 -24 -52.8"
            }
        ]
    ]
    },
mob_blinking_eye: {
    "__palette": ["#FF0F89","#003050","#009050"],
    "idle": [
        [
            {
                "time": 0,
                "fill": 0,
                "path": "m 0,-25 c 25,0 45,20 45,30 c 0,10 -20,30 -45,30 c -25,0 -45,-20 -45,-30 c 0,-10 20,-30 45,-30 z"
            },
            {
                "time": 0.8,
                "fill": 0,
                "path": "m 0,-21 c 15,0 40,25 40,32 c 0,7 -25,32 -40,32 c -15,0 -40,-25 -40,-32 c 0,-7 25,-32 40,-32 z"
            },
            {
                "time": 1.9,
                "fill": 0,
                "path": "m 0,-25 c 25,0 45,20 45,30 c 0,10 -20,30 -45,30 c -25,0 -45,-20 -45,-30 c 0,-10 20,-30 45,-30 z"
            }
        ],
        [
            {
                "time": 0,
                "fill": 1,
                "path": "m 0,0 c 6,-0 6,15 0,25 c -6,0 -6,-15 0,-25 z"
            },
            {
                "time": 0.8,
                "fill": 2,
                "path": "m 0,5 c 6,-0 6,15 0,25 c -6,0 -6,-15 0,-25 z"
            },
            {
                "time": 1.9,
                "fill": 1,
                "path": "m 0,0 c 6,-0 6,15 0,25 c -6,0 -6,-15 0,-25 z"
            }
        ]
    ]
},
mob_spinner:{
    "idle": [
        [
            {
                "time": 0,
                "rotation": 0,
                "fill": "#F0FFE0",
                "path": "m 0.6603 -18.8564 c 20.9115 -34.507 58.3397 32.8564 19.3397 32.8564 c 19.0955 36.2846 -57.2942 32.5955 -37.7942 -1.1795 c -36.2058 -0.8205 -1.5455 -66.3179 18.4545 -31.6769"
            },
            {
                "time": 0.3,
                "rotation": 120,
                "fill": "#CDFF97",
                "path": "m 0.6603 -18.8564 c 20.9115 -34.507 58.3397 32.8564 19.3397 32.8564 c 19.0955 36.2846 -57.2942 32.5955 -37.7942 -1.1795 c -36.2058 -0.8205 -1.5455 -66.3179 18.4545 -31.6769"
            },
            {
                "time": 0.6,
                "rotation": 240,
                "fill": "#CDFF97",
                "path": "m 0.6603 -18.8564 c 20.9115 -34.507 58.3397 32.8564 19.3397 32.8564 c 19.0955 36.2846 -57.2942 32.5955 -37.7942 -1.1795 c -36.2058 -0.8205 -1.5455 -66.3179 18.4545 -31.6769"
            },
            {
                "time": 0.9,
                "rotation": 360,
                "fill": "#F0FFE0",
                "path": "m 0.6603 -18.8564 c 20.9115 -34.507 58.3397 32.8564 19.3397 32.8564 c 19.0955 36.2846 -57.2942 32.5955 -37.7942 -1.1795 c -36.2058 -0.8205 -1.5455 -66.3179 18.4545 -31.6769"
            }
        ]
    ]
},
mob_attacker:{
    "idle": [
        [
            {
                "time": 0,
                "rotation": 0,
                "fill": "#A04020",
                "path": "M 0 -15 A 15 15 0 0 1 15 -5 H 35 A 40 40 0 0 0 15 -35 C 12 -35 12 -45 15 -45 C 60 -45 60 45 15 45 C 12 45 12 35 15 35 A 40 40 0 0 0 35 5 H 15 C 15 11 -15 11 -15 5 H -35 A 40 40 0 0 0 -15 35 C -13 35 -12 45 -15 45 C -60 45 -60 -45 -15 -45 C -12 -45 -12 -35 -15 -35 A 40 40 0 0 0 -35 -5 H -15 A 15 15 0 0 1 0 -15"
            }
        ]
    ]
},
projectile_basic_flame:
{
    "idle": 
    [
        [
            {
                "fill": {
                    "type": "linear",
                    "coords": [0, -5, 0, 30],
                    "stops": [0,1],
                    "colours": ["#FFFF00FF","#FF780030"]
                },
                "time": 0.0,
                "path": "M 0 30 C -15 -20 15 -20 0 30 z"
            }
        ]
    ]
},
projectile_basic_orb:
{
    "idle": 
    [
        [
            {
                "fill": {
                    "type": "radial",
                    "coords": [0, 0, 1, 0, 0, 20],
                    "stops": [0,0.2,0.4,0.7,1.0],
                    "colours": ["#CE00CEFF","#CE00CE00","#CE00CE00","#FFA0FFFF","#CE00CE00"]
                },
                "time": 0.0,
                "path": "M -20 -20 H 20 V 20 H -20 V -20 z"
            },
            {
                "fill": {
                    "type": "radial",
                    "coords": [0, 0, 1, 0, 0, 20],
                    "stops": [0,0.2,0.8,0.9,1.0],
                    "colours": ["#FFA0FFFF","#CE00CE00","#CE00CE00","#FFA0FFFF","#CE00CE00"]
                },
                "time": 0.2,
                "path": "M -20 -20 H 20 V 20 H -20 V -20 z"
            },
            {
                "fill": {
                    "type": "radial",
                    "coords": [0, 0, 1, 0, 0, 20],
                    "stops": [0,0.2,0.4,0.7,1.0],
                    "colours": ["#CE00CEFF","#CE00CE00","#CE00CE00","#FFA0FFFF","#CE00CE00"]
                },
                "time": 0.4,
                "path": "M -20 -20 H 20 V 20 H -20 V -20 z"
            }
        ]
    ]
},
pickup_coin: {
    "idle": [
        [
            {
                "time": 0,
                "rotation": 0,
                "fill": "#FFFF00",
                "path": "M 0 -30 H 0 C 17 -30 30 -17 30 0 C 30 17 17 30 0 30 H 0 C -17 30 -30 17 -30 0 C -30 -17 -17 -30 0 -30"
            },
            {
                "time": 0.4,
                "rotation": 0,
                "fill": "#FFFF00",
                "path": "M -4 -30 H 4 C 10 -30 23 -17 23 0 C 23 17 10 30 4 30 H -4 C -10 30 -23 17 -23 0 C -23 -17 -10 -30 -4 -30"
            },
            {
                "time": 0.6,
                "rotation": 0,
                "fill": "#FFFf00",
                "path": "M -8 -30 H 8 C 10 -30 12 -17 12 0 C 12 17 10 30 8 30 H -8 C -10 30 -12 17 -12 0 C -12 -17 -10 -30 -8 -30"
            },
            {
                "time": 0.7,
                "rotation": 0,
                "fill": "#FFFf00",
                "path": "M -9 -30 H 9 C 9 -25 9 -18 9 0 C 9 18 9 28 9 30 H -9 C -9 28 -9 17 -9 0 C -9 -17 -9 -27 -9 -30"
            },
            {
                "time": 0.8,
                "rotation": 0,
                "fill": "#FFFf00",
                "path": "M -8 -30 H 8 C 10 -30 12 -17 12 0 C 12 17 10 30 8 30 H -8 C -10 30 -12 17 -12 0 C -12 -17 -10 -30 -8 -30"
            },
            {
                "time": 1.0,
                "rotation": 0,
                "fill": "#FFFF00",
                "path": "M -4 -30 H 4 C 10 -30 23 -17 23 0 C 23 17 10 30 4 30 H -4 C -10 30 -23 17 -23 0 C -23 -17 -10 -30 -4 -30"
            },
            {
                "time": 1.3,
                "rotation": 0,
                "fill": "#FFFF00",
                "path": "M 0 -30 H 0 C 17 -30 30 -17 30 0 C 30 17 17 30 0 30 H 0 C -17 30 -30 17 -30 0 C -30 -17 -17 -30 0 -30"
            }
        ],
        [
            {
                "time": 0,
                "rotation": 0,
                "fill": "#EFE000",
                "path": "M 0 -30 H 0 C 17 -30 30 -17 30 0 C 30 17 17 30 0 30 H 0 C 17 30 30 17 30 0 C 30 -17 17 -30 0 -30"
            },
            {
                "time": 0.4,
                "rotation": 0,
                "fill": "#EFE000",
                "path": "M -4 -30 H 4 C 10 -30 23 -17 23 0 C 23 17 10 30 4 30 H -4 C 2 30 15 17 15 0 C 15 -17 2 -30 -4 -30"
            },
            {
                "time": 0.6,
                "rotation": 0,
                "fill": "#EFE000",
                "path": "M -8 -30 H 8 C 10 -30 12 -17 12 0 C 12 17 10 30 8 30 H -8 C -6 30 -4 17 -4 0 C -4 -17 -6 -30 -8 -30"
            },
            {
                "time": 0.7,
                "rotation": 0,
                "fill": "#EFE000",
                "path": "M -9 -30 H 9 C 9 -25 9 -18 9 0 C 9 18 9 28 9 30 H -9 C -9 28 -9 17 -9 0 C -9 -17 -9 -27 -9 -30"
            },
            {
                "time": 0.8,
                "rotation": 0,
                "fill": "#EFE000",
                "path": "M -8 -30 H 8 C 6 -30 4 -17 4 0 C 4 17 6 30 8 30 H -8 C -10 30 -12 19 -12 0 C -12 -17 -10 -30 -8 -30"
            },
            {
                "time": 1.0,
                "rotation": 0,
                "fill": "#EFE000",
                "path": "M -4 -30 H 4 C -2 -30 -15 -17 -15 0 C -15 17 -2 30 4 30 H -4 C -10 30 -23 17 -23 0 C -23 -17 -10 -30 -4 -30"
            },
            {
                "time": 1.3,
                "rotation": 0,
                "fill": "#EFE000",
                "path": "M 0 -30 H 0 C -17 -30 -30 -17 -30 0 C -30 17 -17 30 0 30 H 0 C -17 30 -30 17 -30 0 C -30 -17 -17 -30 0 -30"
            }
        ]
    ]
},
pickup_essence: {
"idle": [
    [
        {
            "time": 0,
            "rotation": 0,
            "fill": "#FF0000",
            "path": "M 0 -15 C 0 -7 7 0 15 0 C 7 0 0 7 0 15 C 0 7 -7 0 -15 0 C -7 0 0 -7 0 -15 Z"
        },
        {
            "time": 0.3,
            "rotation": 135,
            "fill": "#FFFF00",
            "path": "M 0 -22.5 C 0 -10.5 10.5 0 22.5 0 C 10.5 0 0 10.5 0 22.5 C 0 10.5 -10.5 0 -22.5 0 C -10.5 0 0 -10.5 0 -22.5 Z"
        },
        {
            "time": 0.6,
            "rotation": 270,
            "fill": "#00FFFF",
            "path": "M 0 -15 C 0 -7 7 0 15 0 C 7 0 0 7 0 15 C 0 7 -7 0 -15 0 C -7 0 0 -7 0 -15 Z"
        },
        {
            "time": 0.9,
            "rotation": 405,
            "fill": "#FF00FF",
            "path": "M 0 -22.5 C 0 -10.5 10.5 0 22.5 0 C 10.5 0 0 10.5 0 22.5 C 0 10.5 -10.5 0 -22.5 0 C -10.5 0 0 -10.5 0 -22.5 Z"
        },
        {
            "time": 1.2,
            "rotation": 540,
            "fill": "#FF0000",
            "path": "M 0 -15 C 0 -7 7 0 15 0 C 7 0 0 7 0 15 C 0 7 -7 0 -15 0 C -7 0 0 -7 0 -15 Z"
        }
    ]
    ],
"inventory": [
    [
        {
            "time": 0,
            "rotation": 0,
            "fill": "#FF0000",
            "path": "M 0 -15 C 0 -7 7 0 15 0 C 7 0 0 7 0 15 C 0 7 -7 0 -15 0 C -7 0 0 -7 0 -15 Z"
        },
        {
            "time": 0.3,
            "rotation": 0,
            "fill": "#FFFF00",
            "path": "M 0 -22.5 C 0 -10.5 10.5 0 22.5 0 C 10.5 0 0 10.5 0 22.5 C 0 10.5 -10.5 0 -22.5 0 C -10.5 0 0 -10.5 0 -22.5 Z"
        },
        {
            "time": 0.6,
            "rotation": 0,
            "fill": "#00FFFF",
            "path": "M 0 -15 C 0 -7 7 0 15 0 C 7 0 0 7 0 15 C 0 7 -7 0 -15 0 C -7 0 0 -7 0 -15 Z"
        },
        {
            "time": 0.9,
            "rotation": 0,
            "fill": "#FF00FF",
            "path": "M 0 -22.5 C 0 -10.5 10.5 0 22.5 0 C 10.5 0 0 10.5 0 22.5 C 0 10.5 -10.5 0 -22.5 0 C -10.5 0 0 -10.5 0 -22.5 Z"
        },
        {
            "time": 1.2,
            "rotation": 0,
            "fill": "#FF0000",
            "path": "M 0 -15 C 0 -7 7 0 15 0 C 7 0 0 7 0 15 C 0 7 -7 0 -15 0 C -7 0 0 -7 0 -15 Z"
        }
    ]
    ]
},
item_crystal1: {
"idle": [
    [
        {
            "time": 0,
            "rotation": 0,
            "fill": "#500000ff",
            "path": "M 0,33.21 C -45.55,33.21 -44.06,35.79 -21.28,-3.66 C 1.49,-43.11 -1.49,-43.11 21.28,-3.66 C 44.06,35.79 45.55,33.21 0,33.21 Z"
        }
    ],
    [
        {
            "time": 0,
            "rotation": 0,
            "fill": "#ff5757ff",
            "path": "M -0.4,-21.24 L -25.19,20.16 L -35.7,28.11 C -33.75,18.16 -5.69,-29.72 -0.71,-31.11 Z"
        }
    ],
    [
        {
            "time": 0,
            "rotation": 0,
            "fill": "#ff5757ff",
            "path": "M 0.37,-21.46 L 25.16,19.95 L 35.67,27.9 C 33.72,17.95 5.65,-29.93 0.67,-31.32 Z"
        }
    ],
    [
        {
            "time": 0,
            "rotation": 0,
            "fill": "#e8002dff",
            "path": "M 0,-20.44 L 23.6,20.44 H -23.6 Z"
        }
    ],
    [
        {
            "time": 0,
            "rotation": 0,
            "fill": "#710000ff",
            "path": "M -24.12,22.12 L 24.26,21.87 L 34.3,28.91 C 36.22,32.78 -37.85,34.38 -34.12,29.19 Z"
        }
    ]
]
}

    };
}