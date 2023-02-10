const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class MenuPictureController {
  async update(request, response){
    
    const pictureFileName = request.file.filename;
    
    const { id } = request.params;

    const diskStorage = new DiskStorage();

    const menu = await knex("menu").where({id}).first();

    if(menu.picture){
      await diskStorage.deleteFile(menu.picture);
    };
    
    const fileName = await diskStorage.saveFile(pictureFileName);
    menu.picture = fileName;

    await knex("menu").update(menu).where({id});

    return response.json(menu);
  };
};

module.exports = MenuPictureController