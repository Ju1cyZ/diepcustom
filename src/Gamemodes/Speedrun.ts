/*
    DiepCustom - custom tank game server that shares diep.io's WebSocket protocol
    Copyright (C) 2022 ABCxFF (github.com/ABCxFF)

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published
    by the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program. If not, see <https://www.gnu.org/licenses/>
*/

import Client from "../Client";
import { maxPlayerLevel } from "../config";
import { Stat, Tank } from "../Const/Enums";
import ShapeManager from "../Entity/Shape/Manager";
import TankBody from "../Entity/Tank/TankBody";
import GameServer from "../Game";
import ArenaEntity from "../Native/Arena";
import SpeedrunShapeManager from "./Misc/SpeedrunShapeManager";

/**
 * FFA Gamemode Arena
 */
export default class SpeedrunArena extends ArenaEntity {
    static override GAMEMODE_ID: string = "speedrun";

    protected shapes: ShapeManager = new SpeedrunShapeManager(this); // Shape manager

    public spawnPlayer(tank: TankBody, client: Client): void {
        super.spawnPlayer(tank, client);

        tank.cameraEntity.cameraData.values.statsAvailable = 3; // Give 3 stat points by default

        // Set speedrun max stats limits
        tank.cameraEntity.cameraData.values.statLimits[Stat.MovementSpeed] = 15;
        tank.cameraEntity.cameraData.values.statLimits[Stat.Reload] = 15;
        tank.cameraEntity.cameraData.values.statLimits[Stat.BulletDamage] = 15;
        tank.cameraEntity.cameraData.values.statLimits[Stat.BulletPenetration] = 15;
        tank.cameraEntity.cameraData.values.statLimits[Stat.BulletSpeed] = 15;
        tank.cameraEntity.cameraData.values.statLimits[Stat.BodyDamage] = 15;
        tank.cameraEntity.cameraData.values.statLimits[Stat.MaxHealth] = 15;
        tank.cameraEntity.cameraData.values.statLimits[Stat.HealthRegen] = 15;

        tank.cameraEntity.cameraData.values.statLevels[Stat.MovementSpeed] = 2; // Start with movement speed level 2

        // Garder une référence au tank d'origine
        const originalSetTank = tank.setTank;

        // Surcharger la méthode setTank
        tank.setTank = function (id: Tank) {

            // Appeler la méthode originale
            originalSetTank.call(this, id);

            tank.cameraEntity.cameraData.values.statLimits[Stat.MovementSpeed] = 15;
            tank.cameraEntity.cameraData.values.statLimits[Stat.Reload] = 15;
            tank.cameraEntity.cameraData.values.statLimits[Stat.BulletDamage] = 15;
            tank.cameraEntity.cameraData.values.statLimits[Stat.BulletPenetration] = 15;
            tank.cameraEntity.cameraData.values.statLimits[Stat.BulletSpeed] = 15;
            tank.cameraEntity.cameraData.values.statLimits[Stat.BodyDamage] = 15;
            tank.cameraEntity.cameraData.values.statLimits[Stat.MaxHealth] = 15;
            tank.cameraEntity.cameraData.values.statLimits[Stat.HealthRegen] = 15;
        };
    }
}