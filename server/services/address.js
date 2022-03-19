const Address = require('../models/address');
const Order = require('../models/order');

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
                message: 'Address not found'
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

exports.updateAddress = async (id, addressData, userRef) => {
    try {
        const address = await Address.findById(id, 'userRef');
        if (!address) {
            throw {
                status: 404,
                message: 'Address not found'
            };
        }
        //  check if this address is being used by any order which is in 'ongoing' status
        //  if no, then update the order's address
        const orders = await Order.find({ addressRef: id, status: 'ongoing' });
        if (orders.length > 0) {
            throw {
                status: 400,
                message: 'Address is being used by ongoing order'
            };
        }
        if (userRef === String(address.userRef)) {
            const updatedAddress = await Address.findByIdAndUpdate(id, addressData, { new: true });
            if (!updatedAddress) {
                throw {
                    status: 404,
                    message: 'Address not found'
                };
            }
            return updatedAddress;
        } else {
            throw {
                status: 401,
                message: 'Unauthorized'
            };
        }
    } catch (error) {
        console.log(error);
        return error;
    }
}

exports.deleteAddress = async (addressId, userId, userType) => {
    try {
        // delete address if it belongs to user
        const orders = await Order.find({ addressRef: addressId, status: 'ongoing', userRef: userId });
        if (orders.length > 0) {
            throw {
                status: 400,
                message: 'Address is being used by ongoing order'
            };
        }
        const address = await Address.findById(addressId, 'userRef');
        if (!address) {
            throw {
                status: 404,
                message: 'Address not found'
            };
        }
        if (userId === String(address.userRef) || userType === 'admin') {
            await Address.findByIdAndDelete(addressId);
            return true;
        }
        else {
            throw {
                status: 401,
                message: 'Unauthorized'
            };
        }
    } catch (error) {
        console.log(error);
        return error;
    }
}
