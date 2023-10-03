module.exports =(sequelize,Sequelize) => {
    const Student = sequelize.define("student",{
        Name:{
                type: Sequelize.STRING
        },
        Surname:{
                type: Sequelize.STRING
        },
        University:{
                type: Sequelize.STRING
        },
        Graduate:{
                type: Sequelize.BOOLEAN
        }
    });

    return Student;
};