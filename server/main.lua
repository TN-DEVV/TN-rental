local QBCore = exports["qb-core"]:GetCoreObject()

RegisterNetEvent('tn-rental:sv:rentVehicle', function(data)
    local src = source
    local Player = QBCore.Functions.GetPlayer(src)
    local cid = Player.PlayerData.citizenid
    if data.payType == "cash" then
        if Player.Functions.GetMoney(data.payType) >= data.carPrice then
            Player.Functions.RemoveMoney('cash', data.carPrice, 'cash transfer')
            TriggerClientEvent('tn-rental:cl:spawnVehicle', src, data.carName, data.carDay)
            TriggerClientEvent('QBCore:Notify', src,'Purchase transaction successful', 'success')
        else
            TriggerClientEvent('QBCore:Notify', src,'You dont have enough funds', 'error')

        end
    else        
        if Player.PlayerData.money.bank >= data.carPrice then
            Player.Functions.RemoveMoney(data.payType, data.carPrice)
            TriggerClientEvent('tn-rental:cl:spawnVehicle', src, data.carName, data.carDay)
            TriggerClientEvent('QBCore:Notify', src,'Purchase transaction successful', 'success')
        else
            TriggerClientEvent('QBCore:Notify', src,'You dont have enough funds', 'error')
        end
    end

end)

RegisterNetEvent('tn-rental:sv:updatesql', function(plate,vehicle,time)
    local src = source
    local Player = QBCore.Functions.GetPlayer(src)
    local cid = Player.PlayerData.citizenid
    local timeinday = time * 86400
    local endtime = tonumber(os.time() + timeinday)
    local timeTable = os.date('*t', endtime)
    MySQL.insert('INSERT INTO player_vehicles (license, citizenid, vehicle, hash, mods, plate, garage, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', {
        Player.PlayerData.license,
        cid,
        vehicle,
        GetHashKey(vehicle),
        '{}',
        plate,
        'apartments',
        0
    })
    MySQL.insert('INSERT INTO rentvehs (citizenid, vehicle, plate, time) VALUES (?, ?, ?, ?)', {cid, vehicle, plate, endtime})
    TriggerClientEvent('QBCore:Notify', src, "you successfly rent this car until "..timeTable['day'].." / "..timeTable['month'].." / "..timeTable['year'], "success",10000)   
end)

RegisterNetEvent('tn-rental:sv:checktime', function()
    local sqlresult = MySQL.Sync.fetchAll('SELECT citizenid, vehicle, plate, time FROM rentvehs', {})
    local currentTime = os.time()

    for _, row in pairs(sqlresult) do
        local citizenid = tonumber(row.citizenid)
        local timeInDB = tonumber(row.time)

        if currentTime > timeInDB then
            MySQL.Sync.execute('DELETE FROM rentvehs WHERE citizenid = ? AND vehicle = ? AND plate = ?', {row.citizenid, row.vehicle, row.plate})
            MySQL.Sync.execute('DELETE FROM player_vehicles WHERE citizenid = ? AND vehicle = ? AND plate = ?', {row.citizenid, row.vehicle, row.plate})
        end
    end
end)

--[[QBCore.Commands.Add('getoldstash', "get your old stashes", {}, false, function(source)
    local src = source
    local apartment = MySQL.Sync.fetchScalar('SELECT name FROM apartments WHERE citizenid = ?', {QBCore.Functions.GetPlayer(src).PlayerData.citizenid})
    TriggerClientEvent('qb-don:client:openloststashes',src,apartment)
end)]]

QBCore.Commands.Add("getplayerstash", "", {{name = "id", help = "id"}}, false, function(source, args)
	local src = source
	if not QBCore.Functions.HasPermission(src, 'admin') then return TriggerClientEvent('QBCore:Notify', src, "You are no Admin", "error") end
	local Ply = QBCore.Functions.GetPlayer(source)
	if args[1] then
		local Player = QBCore.Functions.GetPlayer(tonumber(args[1]))
		if Player then
            local apartment = MySQL.Sync.fetchScalar('SELECT name FROM apartments WHERE citizenid = ?', {Player.PlayerData.citizenid})
            TriggerClientEvent('qb-don:client:openloststashes',Player.PlayerData.source,apartment)
		else
			TriggerClientEvent('QBCore:Notify', src, "not online", "error")
		end
	end
end, "admin")