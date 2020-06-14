const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const db = new Sequelize({
	dialect: 'mysql',
	host: process.env.aws_mysql_host,

	// database: 'puranibook',
	database: 'puraniBooks',
	username: process.env.aws_mysql_username,
	password: process.env.aws_mysql_pass
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
		type: Sequelize.STRING(30)
		// allowNull: false
	},
	phone_Number: {
		type: Sequelize.STRING(15)
		// allowNull: false
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
		type: Sequelize.TEXT
	},
	Cart: {
		type: Sequelize.TEXT,
		defaultValue: ' '
	},
	Coins: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	Earnings: {
		type: Sequelize.INTEGER,
		defaultValue: '0'
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
	},
	sample_pro: {
		type: Sequelize.TEXT
	}
});

const Library = db.define('libraries', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	userId: {
		type: Sequelize.TEXT
	},
	Product_RefrenceId: {
		type: Sequelize.STRING(50),
		unique: true
	}
});

const Comments = db.define('comments', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	body: {
		type: Sequelize.TEXT
	},
	userId: {
		type: Sequelize.STRING
	}
});

const Transaction = db.define('transactions', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	TransactionId: {
		type: Sequelize.STRING(30),
		primaryKey: true,
		unique: true
	},
	Debited: {
		type: Sequelize.BOOLEAN,
		allowNull: false
	},
	Value: {
		type: Sequelize.INTEGER
	},
	productId: {
		type: Sequelize.STRING
	}
});

Transaction.belongsTo(Users, { as: 'user' });

Products.belongsTo(Users, { as: 'Seller' });
Users.hasMany(Products, { as: 'Seller' });
Library.belongsTo(Products, { as: 'Product' });

Products.hasMany(Comments, { as: 'Comment' });
Comments.belongsTo(Products, { as: 'Comment' });

module.exports = {
	Users,
	db,
	Products,
	Library,
	Comments,
	Transaction
};
