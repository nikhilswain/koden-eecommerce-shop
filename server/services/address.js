const Address = require('../models/address');

exports.getAddressesByUser = async (userRef, includes) => {
    try {
        const addresses = await Address.find({ userRef }, includes);
        return addresses;
    } catch (error) {
        console.log(error);
        return false;
    }
}

exports.getAddressById = async (id) => {
    try {
        const address = await Address.findById(id, 'line1 line2 city state pincode phoneNumber alternatePhoneNumber userRef');
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

exports.updateAddress = async (id, addressData) => {
    try {
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

exports.deleteAddress = async (addressId, userId, userType) => {
    try {
        // delete address if it belongs to user
        const address = await Address.findById(addressId, 'userRef');
        if (!address) {
            throw {
                status: 404,
                msg: 'Address not found'
            };
        }
        if (userId === String(address.userRef) || userType === 'admin') {
            await Address.findByIdAndDelete(addressId);
            return true;
        }
        else {
            throw {
                status: 401,
                msg: 'Unauthorized'
            };
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}
