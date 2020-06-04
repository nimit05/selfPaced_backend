const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const db = new Sequelize({
	dialect: 'mysql',
	// host: process.env.aws_mysql_host,

	database: 'puranibook',
	// database: 'puraniBooks',
	username: 'creator',

	// username:aws_mysql_username,
	password: 'letmein'
	// password: aws_mysql_pass
});

const Users = db.define('users', {
	name: {
		type: Sequelize.STRING(40),
		allowNull: false
	},
	username: {
		type: Sequelize.STRING(35),
		primaryKey: true
	},
	email: {
		type: Sequelize.STRING(100),
		allowNull: false
	},
	password: {
		type: Sequelize.STRING(30),
		allowNull: false
	},
	phone_Number: {
		type: Sequelize.STRING(15),
		allowNull: false
	},
	Address: {
		type: Sequelize.TEXT
	},
	token: {
		type: Sequelize.STRING(50)
	},
	OTP: {
		type: Sequelize.STRING(6)
	},
	Verified: {
		type: Sequelize.BOOLEAN
	},
	pro_img: {
		type: Sequelize.STRING(50)
	},
	Cart: {
		type: Sequelize.TEXT,
		defaultValue: ' '
	},
	Coins: {
		type: Sequelize.INTEGER,
		allowNull: false
	}
});

const Library = db.define('libraries', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	username: {
		type: Sequelize.STRING(20),
		primaryKey: true
	},
	Product_RefrenceId: {
		type: Sequelize.STRING(16),
		primaryKey: true,
		unique: true
	}
});

const Products = db.define('products', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	refrenceId: {
		type: Sequelize.STRING(16),
		primaryKey: true,
		unique: true
	},
	category: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	BookName: {
		type: Sequelize.TEXT
	},
	BookAuthor: {
		type: Sequelize.STRING(60)
	},
	Edition: {
		type: Sequelize.STRING(50)
	},
	Description: {
		type: Sequelize.TEXT
	},
	tag: {
		type: Sequelize.STRING(15),

		allowNull: false
	},
	MRP: {
		type: Sequelize.INTEGER
	},
	Value: {
		type: Sequelize.INTEGER
	},
	cover_img: {
		type: Sequelize.TEXT
	},
	product_file: {
		type: Sequelize.TEXT
	}
});

Products.belongsTo(Users, { as: 'Seller' });
Users.hasMany(Products, { as: 'Seller' });

module.exports = {
	Users,
	db,
	Products,
	Library
};
