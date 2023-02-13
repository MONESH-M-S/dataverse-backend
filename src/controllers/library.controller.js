const LibraryModel = require("../models/library.models");

const fetchDummyData = async (req, res, next) => {
    try {
        const users = await LibraryModel.findAll();
        console.log("User list is ", users)
        res.json(users)
    } catch (error) {
        console.error("Error is ", error)
        next(error)
    }
}

const createLibraryData = async(req, res, next)=>{
    try {
        const users = await LibraryModel.create({
            name: "Book 2",
            "author": "Jack percy"
        });
        res.json(users)
    } catch (error) {
        console.error("Error is ", error)
        next(error)
    }
}

module.exports = {
    fetchDummyData,
    createLibraryData
}