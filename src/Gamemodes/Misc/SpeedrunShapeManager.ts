import { Color } from "../../Const/Enums";
import { DividedHealth, HighTierShinyProbability, MultipliedRewardAmount, MultipliedSquaresTrianglesPentagoneAmount, ShinyHealthMultiplier, ShinyProbability, ShinyRewardMulitplier } from "../../Const/SpeedModeGlobals";
import AbstractShape from "../../Entity/Shape/AbstractShape";
import Crasher from "../../Entity/Shape/Crasher";
import Hexagone from "../../Entity/Shape/Hexagone";
import ShapeManager from "../../Entity/Shape/Manager";
import Pentagon from "../../Entity/Shape/Pentagon";
import Square from "../../Entity/Shape/Square";
import Triangle from "../../Entity/Shape/Triangle";


export default class SpeedrunShapeManager extends ShapeManager {

    protected spawnShape(): AbstractShape {
        let shape: AbstractShape;
        const { x, y } = this.arena.findSpawnLocation();
        const rightX = this.arena.arenaData.values.rightX;
        const leftX = this.arena.arenaData.values.leftX;
        if (Math.max(x, y) < rightX / 10 && Math.min(x, y) > leftX / 10) {
            // Pentagon and Hexagone Nest
            if (Math.random() <= 0.5) { // 50% chance to spawn pentagon
                shape = new Pentagon(this.game, Math.random() <= 0.05); // 5% chance to be alpha

                shape.positionData.values.x = x;
                shape.positionData.values.y = y;
                shape.relationsData.values.owner = shape.relationsData.values.team = this.arena;
            }
            else { // 50% chance to spawn hexagone
                shape = new Hexagone(this.game, Math.random() <= 0.05); // 5% chance to be alpha

                shape.positionData.values.x = x;
                shape.positionData.values.y = y;
                shape.relationsData.values.owner = shape.relationsData.values.team = this.arena;
            }
        } else if (Math.max(x, y) < rightX / 5 && Math.min(x, y) > leftX / 5) {
            // Crasher Zone
            const isBig = Math.random() < .2;

            shape = new Crasher(this.game, isBig);

            shape.positionData.values.x = x;
            shape.positionData.values.y = y;
            shape.relationsData.values.owner = shape.relationsData.values.team = this.arena;
        } else {
            // Fields of Shapes
            const rand = Math.random();
            if (rand < .02) { // 2%
                shape = new Hexagone(this.game, false);

                shape.positionData.values.x = x;
                shape.positionData.values.y = y;
                shape.relationsData.values.owner = shape.relationsData.values.team = this.arena;
            } else if (rand < .04) { // < 3%
                shape = new Pentagon(this.game, false);

                shape.positionData.values.x = x;
                shape.positionData.values.y = y;
                shape.relationsData.values.owner = shape.relationsData.values.team = this.arena;
            } else if (rand < .20) { // < 16%
                shape = new Triangle(this.game, false);

                shape.positionData.values.x = x;
                shape.positionData.values.y = y;
                shape.relationsData.values.owner = shape.relationsData.values.team = this.arena;
            } else { // 80%
                shape = new Square(this.game, false);

                shape.positionData.values.x = x;
                shape.positionData.values.y = y;
                shape.relationsData.values.owner = shape.relationsData.values.team = this.arena;
            }
        }

        shape.healthData.values.maxHealth /= DividedHealth; // Half the health
        shape.healthData.values.health = shape.healthData.values.maxHealth; // Set current health to max health

        shape.scoreReward *= MultipliedRewardAmount; // Increase reward

        let rndNumber = Math.random();

        let isShiny = rndNumber < ShinyProbability; // Determine if the shape is shiny
        if (shape instanceof Pentagon || shape instanceof Hexagone) {
            isShiny = rndNumber < HighTierShinyProbability; // Half the chance for higher tier shapes
        }

        if (isShiny) { // If the shape is shiny, apply shiny modifiers
            shape.scoreReward *= ShinyRewardMulitplier; // Increase reward
            shape.healthData.values.health = shape.healthData.values.maxHealth *= ShinyHealthMultiplier; // Increase health
            shape.styleData.values.color = Color.Shiny; // Set shiny color
            shape.isShiny = true;
        }

        return shape;
    }

    protected get wantedShapes() {
        return 1000 * MultipliedSquaresTrianglesPentagoneAmount;
    }
}