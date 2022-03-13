const { createAddress, deleteAddress, updateAddress, getAddressById, getAddressesByUser } = require('../services/address');

//  @route  GET api/address/:id
//  @desc   Get address by id
//  @access Protected
exports.IgetAddressById = async (req, res) => {
    try {
        const id = req.params.id;
        const address = await getAddressById(id);
        if (!address) {
            throw {
                status: 404,
                message: 'address not found!'
            }
        }
        console.log(String(address.userRef), req.user._id);
        if (req.user._id === String(address.userRef) || req.user.userType === 'admin') {
            res.status(200).json({address});
        } else {
            throw {
                status: 401,
                message: 'unauthorized!'
            }
        }
    } catch (error) {
        console.log(error);
        res.status(error.status).json({ message: error.message });
    }
}

//  @route  GET api/address/
//  @desc   get all addresses of user
//  @access Protected
exports.IgetAddressesByuser = async (req, res) => {
    try {
        const userId = req.user._id;
        const addresses = await getAddressesByUser(userId, 'line1');
        if (!addresses) {
            throw {
                status: 404,
                message: 'address not found!'
            }
        }
        res.status(200).json({addresses});
    } catch (error) {
        console.log(error);
        res.status(error.status).json({ message: error.message });
    }
}

//  @route  POST api/address/
//  @desc   Create address
//  @access Protected
exports.IcreateAddress = async (req, res) => {
    try {
        const { line1, line2, pincode, city, state, phoneNumber, alternatePhoneNumber } = req.body;
        const newAddress = await createAddress({
            line1,
            line2,
            pincode,
            city,
            state,
            phoneNumber,
            alternatePhoneNumber,
            userRef: req.user._id
        });
        if (!newAddress) {
            throw {
                status: 400,
                message: 'action failed!'
            }
        }
        res.status(200).json({address: newAddress});
    } catch (error) {
        console.log(error);
        res.status(error.status).json({ message: error.message });
    }
}

//  @route  PUT api/address/:id
//  @desc   Update address
//  @access Protected
exports.IupdateAddress = async (req, res) => {
    try {
        const addressData = req.body;
        const addressId = req.params.id;
        const userId = req.user._id;
        const { userRef } = req.body;
        if (userRef !== undefined) {
            throw {
                status: 400,
                message: 'userRef cannot be updated!'
            }
        }
        const updatedAddress = await updateAddress(addressId, addressData, userId);
        if (!updatedAddress) {
            throw {
                status: 400,
                message: 'action failed!'
            }
        }
        res.status(200).json({address: updatedAddress});
    } catch (error) {
        console.log(error);
        res.status(error.status).json({ message: error.message });
    }
}

//  @route  DELETE api/address/:id
//  @desc   Delete address
//  @access Protected
exports.IdeleteAddress = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedAddress = await deleteAddress(id, req.user._id, req.user.userType);
        if (!deletedAddress) {
            throw {
                status: 400,
                message: 'action failed!'
            }
        }
        res.status(200).json({address: deletedAddress});
    } catch (error) {
        console.log(error);
        res.status(error.status).json({ message: error.message });
    }
}
