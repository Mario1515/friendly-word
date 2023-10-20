const Animal = require("../models/Animal");

exports.create = ( createData ) => Animal.create(createData);

exports.getAll = () => Animal.find();

exports.getSingleAnimal= (animalId) => Animal.findById(animalId).populate("donations");

exports.update = (animalId, updateData) => Animal.findByIdAndUpdate(animalId, updateData);

exports.delete = (animalId) => Animal.findByIdAndDelete(animalId);

exports.addDonationToAnimal = async (animalId, userId) => {

    const animal  = await this.getSingleAnimal(animalId);

    const hasDonated = animal.donations.some(d => d?.toString() === userId);

    if(hasDonated) {
        console.log("User has donated!");
        return;
    }

    animal.donations.push(userId);
    return animal.save();
};

exports.search = async (searchData) => {

    const value = searchData.search;

    let filteredAnimals = await Animal.find().lean();

    filteredAnimals = filteredAnimals.filter((animal) => animal.location.toLowerCase().includes(value.toLowerCase()));

    return filteredAnimals;

}