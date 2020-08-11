const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const db = new Sequelize({
  dialect: "mysql",
//   host: process.env.aws_mysql_host,

  database: "puranibook",
//   database: "puraniBooks",
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
	bio : {
		type : Sequelize.TEXT
	},
	College : {
		type : Sequelize.TEXT
	},
	Qualification : {
		type : Sequelize.STRING
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
	reports: {
		type: Sequelize.TEXT,
		defaultValue: ' '
	}
});

const Products = db.define("products", {
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
  title: {
    type: Sequelize.TEXT
  },
  s_title: {
    type: Sequelize.STRING(60)
  },
  short_des: {
    type: Sequelize.STRING(50)
  },
  Description: {
    type: Sequelize.TEXT
  },
  tag: {
    type: Sequelize.STRING(15),

		allowNull: false
	},

	rating: {
		type: Sequelize.FLOAT
	},
	cover_img: {
		type: Sequelize.TEXT
	},
	product_file: {
		type: Sequelize.TEXT
	},
	sample_pro: {
		type: Sequelize.TEXT
	},
	keywords: {
		type: Sequelize.TEXT
	},
	reports: {
		type: Sequelize.TEXT,
		defaultValue: ' '
	},
	deleted: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
	date : {
		type : Sequelize.STRING
	},
	branch : {
		type : Sequelize.STRING,
		allowNull : false
	},
	copies : {
		type : Sequelize.STRING,
		defaultValue : '0'
	}
});

const Library = db.define("libraries", {
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

const Review = db.define("reviews", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  comment: {
    type: Sequelize.TEXT
  },
  userId: {
    type: Sequelize.STRING
  },
  Rating: {
    type: Sequelize.INTEGER
  },
  productId: {
    type: Sequelize.INTEGER
  },
  productId: {
    type: Sequelize.INTEGER
  },
  user_img: {
    type: Sequelize.TEXT
  },
  reports: {
    type: Sequelize.TEXT,
    defaultValue: " "
  }
});



Products.belongsTo(Users, { as: "Seller" });
Users.hasMany(Products, { as: "Seller" });
Library.belongsTo(Products, { as: "Product" });

module.exports = {
  Users,
  db,
  Products,
  Library,
  Review
};
