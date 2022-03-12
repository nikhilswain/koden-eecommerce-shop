const Address = require('../models/address');

exports.getAddressesByUser = async (userRef) => {
    try {
        const addresses = await Address.find({ userRef });
        return addresses;
    } catch (error) {
        console.log(error);
        return false;
    }
}

exports.getAddressById = async (id) => {
    try {
        const address = await Address.findById(id);
        if (!address) {
            throw {
                status: 404,
                msg: 'Address not found'
            };
        }
        return address;
    } catch (error) {
        console.log(error);
        return false;
    }
}

exports.createAddress = async (address) => {
    try {
        const newAddress = new Address(address);
        return await newAddress.save();
    } catch (error) {
        console.log(error);
        return false;
    }
}

exports.updateAddress = async (id, address) => {
    try {
        const updatedAddress = await Address.findByIdAndUpdate(id, address, { new: true });
        if (!updatedAddress) {
            throw {
                status: 404,
                msg: 'Address not found'
            };
        }
        return updatedAddress;
    } catch (error) {
        console.log(error);
        return false;
    }
}

exports.deleteAddress = async (id) => {
    try {
        const deletedAddress = await Address.findByIdAndDelete(id);
        if (!deletedAddress) {
            throw {
                status: 404,
                msg: 'Address not found'
            };
        }
        return deletedAddress;
    } catch (error) {
        console.log(error);
        return false;
    }
}
