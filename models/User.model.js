const { ObjectId } = require('mongodb');
const { connectToDatabase } = require('../services/mongodbConnect');

export class User {
	constructor({
		username, password, email, role,
	}) {
		this.username = username;
		this.password = password;
		this.email = email;
		this.role = role;
	}

	async save() {
		this.validator()
		const db = await connectToDatabase();
		return db.collection('users').insertOne(this);
	}

	async delete() {
		const db = await connectToDatabase();
		return db.collection('users').deleteOne({ _id: new ObjectId(this._id) });
	}

	async validator() {
		if (!this.username) {
			throw new Error('username is required');
		}
		if (!this.password) {
			throw new Error('password is required');
		}
		if (!this.email) {
			throw new Error('email is required');
		}
		if (!this.role) {
			throw new Error('role is required');
		}
	}

	static getUserByUsername(username) {
		const db = await connectToDatabase();
		return db.collection('users').findOne({ username });
	}

	static getUserByEmail(email) {
		const db = await connectToDatabase();
		return db.collection('users').findOne({ email });
	}

	static getUserById(id) {
		const db = await connectToDatabase();
		return db.collection('users').findOne({ _id: new ObjectId(id) });
	}
}