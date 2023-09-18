module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        balance:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        // cart:{
        //     type: [DataTypes.],
        //     allowNull: false,
        //     validate: {
        //         notEmpty: true
        //     }
        // }
    })
    return User
}