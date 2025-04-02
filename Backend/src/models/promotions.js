module.exports = (sequelize, DataTypes) => {
  const Promotion = sequelize.define("Promotion", {
    promo_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    discount_type: {
      type: DataTypes.ENUM("percentage", "fixed"),
      allowNull: false,
    },
    discount_value: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: false,
    },
    min_order_value: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: false,
    },
    max_discount: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: false,
    },
    valid_from: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    valid_to: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    applicable_movies: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    applicable_payment: {
      type: DataTypes.ENUM("credit_card", "debit_card", "paypal", "cash"),
      allowNull: false,
    },
    usage_limit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_limit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    used_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    max_users: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      allowNull: false,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  Promotion.associate = (models) => {
    Promotion.belongsTo(models.User, { foreignKey: "created_by" });
  };

  return Promotion;
};
