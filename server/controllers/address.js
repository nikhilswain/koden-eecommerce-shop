const { createAddress, deleteAddress, updateAddress, getAddressById, getAddressesByUser } = require('../services/address');

//  @route  GET api/address/
//  @desc   Get address by id
//  @access Protected
exports.IgetAddressById = async (req, res) => {
    try {
        const { addressId } = req.body;
        const address = await getAddressById(addressId);
        if (!address) {
            throw {
                status: 404,
                message: 'address not found!'
            }
        }
        if (req.user._id !== address.userRef || req.user.role !== 'admin') {
            throw {
                status: 401,
                message: 'unauthorized!'
            }
        }
        res.status(200).json({address});
    } catch (error) {
        console.log(error);
        res.status(error.status).json({ message: error.message });
    }
}

//  @route  GET api/addresses/
//  @desc   get all addresses of user
//  @access Protected
exports.IgetAddressesByuser = async (req, res) => {
    try {
        const { userId } = req.body;
        const addresses = await getAddressesByUser(userId, 'line1');
        if (!addresses) {
            throw {
                status: 404,
                message: 'address not found!'
            }
        }
        if (req.user._id !== address.userRef || req.user.role !== 'admin') {
            throw {
                status: 401,
                message: 'unauthorized!'
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

//  @route  PUT api/address/
//  @desc   Update address
//  @access Protected
exports.IupdateAddress = async (req, res) => {
    try {
        const { addressId, data } = req.body;
        //  update address if user is owner
        const updatedAddress = await updateAddress(addressId, data, req.user._id);
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

//  @route  DELETE api/address/
//  @desc   Delete address
//  @access Protected
exports.IdeleteAddress = async (req, res) => {
    try {
        const { addressId } = req.body;
        const deletedAddress = await deleteAddress(addressId, req.user._id);
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
