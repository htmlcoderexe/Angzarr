class HostileData
{
    static dropTables = {
        arcade: 
            [
                {
                    count: 1,
                    roll: "1d4",
                    pickup: "basic_coin"
                },
                {
                    count: 2,
                    roll: "1d4-2",
                    pickup: "basic_essence"
                }
            ]
        
    }
    static hostiles = {
        static_spinner: {
            sprite: "mob_spinner",
            rect: [-25,-25,50,50],
            health: 20,
            speed: 50,
            movement_reference: "stage",
            behaviour: "constant_speed"
        },
        eye_swarm: {
            sprite: "mob_blinking_eye",
            rect: [-25,-25,50,50],
            health: 10,
            speed: 150,
            movement_reference: "screen",
            behaviour: "home_and_ram"
        },
        eye_swarm2: {
            sprite: "mob_blinking_eye",
            palette: ["#104010","#FF0000","#3F0000"],
            rect: [-25,-25,50,50],
            health: 10,
            speed: 150,
            movement_reference: "screen",
            behaviour: "home_and_ram"
        },
        basic_l1: {
            sprite: "mob_attacker",
            rect: [-25,-25,50,50],
            health: 10,
            speed: 150,
            movement_reference: "screen",
            behaviour: "wander_top_shoot"
        }
    };
}