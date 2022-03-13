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

exports.updateAddress = async (id, addressData, userId) => {
    try {
        //  update address if it belongs to user
        const address = await Address.findById(id);
        if (!address) {
            throw {
                status: 404,
                msg: 'Address not found'
            };
        }
        if (address.userRef.toString() !== userId) {
            throw {
                status: 401,
                msg: 'Unauthorized'
            };
        }
        const updatedAddress = await Address.findByIdAndUpdate(id, addressData, { new: true });
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

exports.deleteAddress = async (addressId, userId) => {
    try {
        // delete address if it belongs to user
        const address = await Address.findById(addressId);
        if (!address) {
            throw {
                status: 404,
                msg: 'Address not found'
            };
        }
        if (address.userRef.toString() !== userId) {
            throw {
                status: 401,
                msg: 'Unauthorized'
            };
        }
        await Address.findByIdAndDelete(addressId);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}
