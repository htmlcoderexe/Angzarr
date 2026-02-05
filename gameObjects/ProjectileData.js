class ProjectileData
{
    static graphics = 
    {
        basic_flame:
        {
            "idle": 
            [
                [
                    {
                        fill: {
                            type: "linear",
                            coords: [0, -5, 0, 30],
                            stops: [0,1],
                            colours: ["#FFFF00FF","#FF780030"]
                        },
                        time: 0.0,
                        path: "M 0 30 C -15 -20 15 -20 0 30 z"
                    }
                ]
            ]
        },
        basic_orb:
        {
            "idle": 
            [
                [
                    {
                        fill: {
                            type: "radial",
                            coords: [0, 0, 1, 0, 0, 20],
                            stops: [0,0.2,0.4,0.7,1.0],
                            colours: ["#CE00CEFF","#CE00CE00","#CE00CE00","#FFA0FFFF","#CE00CE00"]
                        },
                        time: 0.0,
                        path: "M -20 -20 H 20 V 20 H -20 V -20 z"
                    },
                    {
                        fill: {
                            type: "radial",
                            coords: [0, 0, 1, 0, 0, 20],
                            stops: [0,0.2,0.8,0.9,1.0],
                            colours: ["#FFA0FFFF","#CE00CE00","#CE00CE00","#FFA0FFFF","#CE00CE00"]
                        },
                        time: 0.2,
                        path: "M -20 -20 H 20 V 20 H -20 V -20 z"
                    },
                    {
                        fill: {
                            type: "radial",
                            coords: [0, 0, 1, 0, 0, 20],
                            stops: [0,0.2,0.4,0.7,1.0],
                            colours: ["#CE00CEFF","#CE00CE00","#CE00CE00","#FFA0FFFF","#CE00CE00"]
                        },
                        time: 0.4,
                        path: "M -20 -20 H 20 V 20 H -20 V -20 z"
                    }
                ]
            ]
        }
    };
    static projectiles = {
        basic1: {
            sprite: "basic_flame",
            rect: [-5,-5,10,30],
            speed: 1200,
            damage: 4,
            trajectory: "straight"
        },
        basic2: {
            sprite: "basic_orb",
            rect: [-10,-10,10,10],
            speed: 200,
            damage: 6,
            trajectory: "straight"
        }
    };
}