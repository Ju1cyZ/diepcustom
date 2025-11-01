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
    }
}