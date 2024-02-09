Config = {}

Config.Cars = {
    one = {
        categories = {
            { 
                name = "Cycles",
                cars = {
                    { name = "bmx", price = 7 }
                }
            },
            { 
                name = "Compacts",
                cars = {
                    { name = "serrano", price = 150 },
                    { name = "brioso2", price = 150 },
                    { name = "blista", price = 110 },
                }
            },
            { 
                name = "Suvs",
                cars = {
                    { name = "baller2", price = 200 },
                    { name = "seminole2", price = 165 }
                }
            },
            { 
                name = "Muscle",
                cars = {
                    { name = "deviant", price = 220 }
                }
            },
            { 
                name = "Sports",
                cars = {
                    { name = "carbonizzare", price = 180 }
                }
            },
            { 
                name = "Coupes",
                cars = {
                    { name = "futo", price = 185 }
                }
            },
            { 
                name = "MotorCycles",
                cars = {
                    { name = "faggio2", price = 35 }
                }
            },
            { 
                name = "Sedans",
                cars = {
                    { name = "surge", price = 150 }
                }
            },
        }
    },
}

Config.Locations = {
    ['one'] = {
        ['label'] = 'Rent you',
        ['coords'] = vector4(-291.89, -985.96, 31.08, 340.31),
        ['carspawn'] = vector4(-297.76, -989.99, 30.49, 339.02),
        ['ped'] = 'a_m_m_hasjew_01',
        ['scenario'] = 'WORLD_HUMAN_STAND_MOBILE',
        ['radius'] = 1.5,
        ['targetIcon'] = 'fas fa-shopping-basket',
        ['targetLabel'] = 'Rent Vehicle',
        ["category"] = Config.Cars.one,
        ['showblip'] = true,
        ['blipsprite'] = 38,
        ['blipscale'] = 0.6,
        ['blipcolor'] = 38
    },
    ['two'] = {
        ['label'] = 'Rent you',
        ['coords'] = vector4(1852.37, 2582.12, 45.67, 270.72),
        ['carspawn'] = vector4(1855.2, 2578.72, 45.08, 271.21),
        ['ped'] = 'a_m_m_hasjew_01',
        ['scenario'] = 'WORLD_HUMAN_STAND_MOBILE',
        ['radius'] = 1.5,
        ['targetIcon'] = 'fas fa-shopping-basket',
        ['targetLabel'] = 'Rent Vehicle',
        ["category"] = Config.Cars.one,
        ['showblip'] = true,
        ['blipsprite'] = 38,
        ['blipscale'] = 0.6,
        ['blipcolor'] = 38
    },
    ['three'] = {
        ['label'] = 'Rent you',
        ['coords'] = vector4(281.66, -1360.31, 31.92, 52.89),
        ['carspawn'] = vector4(281.64, -1353.49, 31.34, 141.33),
        ['ped'] = 'a_m_m_hasjew_01',
        ['scenario'] = 'WORLD_HUMAN_STAND_MOBILE',
        ['radius'] = 1.5,
        ['targetIcon'] = 'fas fa-shopping-basket',
        ['targetLabel'] = 'Rent Vehicle',
        ["category"] = Config.Cars.one,
        ['showblip'] = true,
        ['blipsprite'] = 38,
        ['blipscale'] = 0.6,
        ['blipcolor'] = 38
    },
    ['four'] = {
        ['label'] = 'Rent you',
        ['coords'] = vector4(-679.7, -1112.75, 14.67, 35.1),
        ['carspawn'] = vector4(-683.37, -1112.37, 13.93, 32.06),
        ['ped'] = 'a_m_m_hasjew_01',
        ['scenario'] = 'WORLD_HUMAN_STAND_MOBILE',
        ['radius'] = 1.5,
        ['targetIcon'] = 'fas fa-shopping-basket',
        ['targetLabel'] = 'Rent Vehicle',
        ["category"] = Config.Cars.one,
        ['showblip'] = true,
        ['blipsprite'] = 38,
        ['blipscale'] = 0.6,
        ['blipcolor'] = 38
    },
}