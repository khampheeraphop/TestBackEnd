const db = require("../model");
const Student = db.Students;
const op = db.Sequelize.Op;

exports.create = (req, res) => {
    if(!req.body.Name){
        res.status(400).send({
            message: "Content cannot be empty!!"
        })
        return;//exit
    }

    const student = {
        id: req.body.id,
        Name: req.body.Name,
        Surname: req.body.Surname,
        University:req.body.University,
        Graduate: req.body.Graduate ? req.body.Graduate : false
    }

    Student.create(student)
    .then(data => {
        res.send(data)
    })
    .catch(error => {
        res.status(500).send({
            message: "Error 500!!"
        })
    });

};

exports.findAll = (req, res) => {
    const Name = req.body.Name;
    var condition = Name ? {Name: {[Op.like]:`%${Name}%`}} : null;

    Student.findAll()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "some error occurred!"
        });
    });

};

exports.findOne = (req, res) => {
   const id = req.params.id;
   Student.findByPk(id) //pk primary key
        .then(data => {
            if(data){
                res.send(data);
            }else{
                res.status(404).send({
                    message: `Error 404 not found id ${id}`
                })
            }
        })
        .catch(error => {
            res.status(500).send({
                message: "Error 500"+ id
            })
        });
};

exports.findAllPublished = (req, res) => {
    Student.findAll({where: { Graduate: true }})
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send({
                message: "Error 500"
            })
            
        });
};
exports.update = (req, res) => {
    const id =req.params.id;
    Student.update(req.body,{where: {id:id}})//req.body คือรับ ทุกฟิลด์ title description published 
    .then(num =>{                             //ถ้าอยากรับเฉพาะ 1 ตัว ให้เจาะจงเช่น req.body.title
        if(num == 1){
            res.send({
                message: "Updated successfully."
            });
        }else{
            res.send({
                message: "Updated failed!!"
            });
        }
    })
    .catch(error => {
        res.status(500).send({
            message: "Error updated!"
        });
    });                                        
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Student.destroy({where : {id:id}})
    .then(num => {
        if(num ==1 ){
            res.send({
                message: "Deleted successfully."
            })
        }else{
            res.send({
                message: "Deleted failed"
            })
        }
    })
    .catch(error => {
        res.status(500).send({
            message: "Error deleted 500"
        })
    });
};

exports.deleteAll = (req, res) => {
    Student.destroy({
        where:{},
        truncate: false
    })
    .then(num => {
        res.send({
            message: "Deleted successfully."
        })
    })
    .catch(error => {
        res.status(500).send({
            message: "Error 500!!"
        })
    });
};