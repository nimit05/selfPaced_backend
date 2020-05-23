const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const db = new Sequelize({
	dialect: 'mysql',
	// host: process.env.aws_mysql_host,
	database: "puranibook",
	username: "creator",
	password: "letmein"
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
    Address : {
      type : Sequelize.TEXT,
    
    },
    token: {
        type: Sequelize.STRING(50)
    },
    OTP: {
        type: Sequelize.STRING(6),
    },
    Verified: {
        type: Sequelize.BOOLEAN
    },
    pro_img: {
        type: Sequelize.STRING(50),
	},
	Cart:{
		type : Sequelize.TEXT,
    
		get(){
			if(this.getDataValue('Cart') != null){
			return this.getDataValue('Cart').split(';')
			}
		},
		set(val){
			this.setDataValue('Cart', val.join(','));
		},
	},
	Coins:{
		type : Sequelize.INTEGER,
		allowNull : false
	}
})

const Library = db.define('libraries' , {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	username :{
		type : Sequelize.STRING(20),
		primaryKey : true
	},
	Product_RefrenceId:{
		type: Sequelize.STRING(16),
		primaryKey: true,
		unique: true
	}
})

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
		type: Sequelize.INTEGER
	},
	Description: {
		type: Sequelize.TEXT
	},
	old: {
		type: Sequelize.BOOLEAN,
		allowNull: false
	},
	MRP: {
		type: Sequelize.INTEGER
	},
	Value: {
		type: Sequelize.INTEGER
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
