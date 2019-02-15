const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const activeUserSchema = new Schema({
    
    AveragePoints: {type: Number},
    Events: {type: Number},
    Name: {type: String},
    PlayerID: { type: Number},
    PlayerSeasonID: { type: Number},
    PointsGained: { type: Number},
    PointsLost: { type: Number},
    Season: { type: Number},
    TotalPoints: { type: Number},
    WorldGolfRank: {type: Number},
    WorldGolfRankLastWeek: { type: Number}
    
});

module.exports = mongoose.model("golfers", activeUserSchema);

