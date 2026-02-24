class UITemplate
{
    static ShowTemplate(uimgr, template, offset, ...params)
    {
        let tpl = UI_TEMPLATES[template];
        if(!tpl)
        {
            return false;
        }
        for(let i =0;i<tpl.params.length;i++)
        {
            uimgr.contextParams[tpl.params[i]]=params[i];
        }
        // console.log(...arguments);
        let container = new UIElement(uimgr.hitbox);
        uimgr.add(container);
        let controls = [];
        for(let i= 0; i<tpl.controls.length;i++)
        {
            let c = UITemplate.InstantiateControl(tpl.controls[i], uimgr,offset);
            container.add(c);
            controls.push(c);
        }
        container.addEventListener("close",()=>{$destroy(container)});
        container.addEventListener("click",(x,y)=>{console.log("Outside template click: "+x+","+y);});
        for(let i= 0; i<tpl.event_handlers.length;i++)
        {
            let control = tpl.event_handlers[i].control;
            let eventname = tpl.event_handlers[i].event;
            let handler = tpl.event_handlers[i].handler;
            if(!$id(control).addEventListener(eventname, handler))
            {
                console.warn("Failed to add event <" + eventname + "> to control <" + control + ">");
            }
        }
        if(tpl.init)
        {
            tpl.init();
        }
    }
    static ControlFactory(type, rekt,params)
    {
        let result;
        switch(type)
        {
            case "button":
            {
                result = new UIButton(rekt,...params);
                break;
            }
            case "label":
            {
                result = new DisplayLabel(rekt,...params);
                break;
            }
            case "selector":
            {
                result = new UISelector(rekt,...params);
                break;
            }
            case "skillslot":
            {
                result = new AbilitySlot(rekt,...params);
                break;
            }
            case "itemslot":
            {
                result = new ItemDisplay(rekt.x,rekt.y, ...params);
                break;
            }
            case "scroll":
            {
                result = new ScrollPane(rekt,...params);
                break;
            }
            case "text":
            {
                result = new WrappedText(rekt,...params);
                break;
            }
            case "inventory":
            {
                result = new InventoryDisplay(rekt.x,rekt.y,...params);
                break;
            }
        }
        return result;
    }
    static InstantiateControl(control, parent,offset=[0,0])
    {
        let params = control.params;
        if(!params)
            params = [];
        console.warn(...arguments);
        for(let i=0;i<params.length;i++)
        {
            let p=params[i];
            if(typeof p =="string" && p[0]=="$")
            {
                console.warn(parent);
                params[i]=parent.uimgr.contextParams[p.substring(1)];
            }
        }
        let basex = offset[0];
        if(control.halign=="centre")
        {
            basex+=parent.hitbox.width/2-control.w/2;
        }
        let basey= offset[1];
        let x = basex+control.x;
        let y = basey+control.y;
        let w = control.w;
        let h = control.h;
        let rekt = new Rectangle(x,y,w,h);
        let result = UITemplate.ControlFactory(control.type,rekt,params);
        if(control.w==0 && control.halign=="centre")
        {
            result.hitbox=new Rectangle(x-result.hitbox.width/2,y,result.hitbox.width,result.hitbox.height);
            result.originalHitbox=new Rectangle(x-result.originalHitbox.width/2,y,result.hitbox.width,result.hitbox.height);
            //result.originalHitbox.x-=result.originalHitbox.w/2;
        }
        result.id=control.id;
        result.uimgr = parent.uimgr;
        if(control.children)
            for(let i=0;i<control.children.length;i++)
            {
                result.add(UITemplate.InstantiateControl(control.children[i],result));
            }
        return result;
    }
}


const UI_TEMPLATES = {
arcade_shop:
{
    controls: [
        {
            type:"selector", id: "shopselector",
            halign: "centre",
            x:0, y:0, w: 360, h: 180,
            params: [
            [
                {
                    description:"More bullets",
                    cost: 20,
                    bonus: "rof"
                },
                {
                    description:"More charge",
                    cost: 25,
                    bonus: "cap"
                },
                {
                    description:"More health",
                    cost: 15,
                    bonus: "hp"
                },
                {
                    description:"Faster charge",
                    cost: 40,
                    bonus: "bat"
                }]
            ],
            children: 
            [
                {
                    type:"button", id: "buybut",
                    halign:"centre",
                    x:-63,  y: 120, w: 110, h: 50,
                    params: [ "Buy", "green" ]
                },
                {
                    type:"button", id: "donebut",
                    halign:"centre",
                    x: 63, y: 120, w: 110,  h: 50,
                    params: [ "Done" ]
                },
                {
                    type:"label", id:"coinsdisplay",
                    halign:"centre",
                    x: 0,  y: -60, w: 170, h: 45,
                    params: [ "000000" ]
                },
                {
                    type:"label", id:"itemdisplay",
                    halign:"centre",
                    x: 0, y: 10, w: 240, h: 45,
                    params: [ "" ]
                },
                {
                    type:"label",  id:"costdisplay",
                    halign:"centre",
                    x: 0, y: 63,  w: 170, h: 45,
                    params: [ "0000" ]
                }
            ]
        }
    ],
    event_handlers:
    [
        {
            control: "donebut",
            event: "click",
            handler: ()=>{
                $destroy($id('shopselector').top());
            }
        },
        {
            control: "buybut",
            event: "click",
            handler: ()=>{
                let opt = $id('shopselector').options[$id('shopselector').selectedIndex];
                let player = $param('player');
                let adjusted_cost = opt.cost * player.upgrades[opt.bonus];
                if(adjusted_cost>player.coins)
                {
                    return;
                }
                switch(opt.bonus)
                {
                    case "rof":
                    {
                        player.bullets_per_sec+=1;
                        break;
                    }
                    case "cap":
                    {
                        player.abilities[0].maxcharge+=1;
                        break;
                    }
                    case "bat":
                    {
                        player.abilities[0].base_recharge+=0.5;
                        break;
                    }
                    case "hp":
                    {
                        const hpup=new StatEntry("HP",1,1,STAT_EQUIP);
                        player.stats.add(hpup);
                        break;
                    }
                }
                player.coins-=adjusted_cost;
                player.upgrades[opt.bonus]++;
                $id('shopselector').raiseEvent("change");

            }
        },
        {
            control: "shopselector",
            event: "change",
            handler: ()=>{
                let opt = $id('shopselector').options[$id('shopselector').selectedIndex];
                let player = $param('player');
                let adjusted_cost = opt.cost * player.upgrades[opt.bonus];
                if(adjusted_cost>player.coins)
                {
                    $id("buybut").colourScheme="grey";
                }
                else
                {
                    $id("buybut").colourScheme="green";
                }
                $id("itemdisplay").text=opt.description;
                $id("costdisplay").text=String(adjusted_cost).padStart(4,"0");
                $id("coinsdisplay").text=String(player.coins).padStart(6,"0");
            }
        }
    ],
    params:[
        "player"
    ],
    init:()=>{            
        $id('shopselector').raiseEvent("change", 0);
    }
},
inventory_test: {
    controls: [
        {
            type: "itemslot", id: "item_icon",
            x: 0, y: -300, w: 70, h: 70
        },
        {
            type: "text", id: "item_desc",
            x:100, y:-300, w:200, h:200,
            params: ["Select an item to view it."]
        },
        {
            type: "scroll", id: "inv_container",
            halign: "centre", 
            x:0,y:-100, w: 300, h:200,
            params: [],
            children: [
            {
                type: "inventory", id: "inv_view",
                halign:"centre",
                x:0, y:0, w:0, h:0,
                params: [ "$inventory", 4 ]
            }

            ]
        },
        {
            type: "button", id: "unpausebt",
            halign: "centre",
            x: 0, y: 100, w: 240, h: 80,
            params: ["Continue"]
        },
        {
            type: "button", id: "exitbt",
            halign: "centre",
            x: 0, y: 220, w: 240, h: 80,
            params: ["Exit"]
        }
    ],
    event_handlers: [
        {
            control: "inv_view",
            event: "select",
            handler: (index)=>{
                let item = $id('inv_view').selectedItem;
                if(item)
                {
                    $id('item_desc').text = item.description;
                    $id('item_icon').item = item;
                }

            }
        },
        {
            control: "exitbt",
            event: "click",
            handler:(x,y)=>{
                window.gameManager.currentScene = new GameSceneTitle();
            }
        },
        {
            control: "unpausebt",
            event: "click",
            handler:(x,y)=>{
                $message("","#000000");
                console.log("destroying template");
                $destroy($id('unpausebt').top());
                console.log("unpausing game");
                $param('scene').paused=false;
            }
        }
    ],
    params:[ "inventory","scene" ],
    init:()=>{
        $message("GAME PAUSED","#00C010",0.5,9999);
    }
},
inventory_test2: {
    controls: [
        {
            type: "scroll", id: "inv_container",
            halign: "centre",
            x:0, y:0,  w: 300,  h:300,
            params: [],
            children: [
            {
                type: "text",  id: "lipsum",
                halign: "centre",
                x:0, y:50, w:280,  h:0,
                params: [ "Lorem ipsum dolor sit on ur mums face lmao gottem -- xochi, probably\nLorem ipsum dolor sit on ur mums face lmao gottem -- xochi, probably\nLorem ipsum dolor sit on ur mums face lmao gottem -- xochi, probably Lorem ipsum dolor sit on ur mums face lmao gottem -- xochi, probably Lorem ipsum dolor sit on ur mums face lmao gottem -- xochi, probably Lorem ipsum dolor sit on ur mums face lmao gottem -- xochi, probably Lorem ipsum dolor sit on ur mums face lmao gottem -- xochi, probably Lorem ipsum dolor sit on ur mums face lmao gottem -- xochi, probably " ]
            }
            ]
        }
    ],
    event_handlers: [
    ],
    params:[
        "inventory"
    ]
}
};