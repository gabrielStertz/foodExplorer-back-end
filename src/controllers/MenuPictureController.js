const MenuRepository = require("../repositories/MenuRepository");

const UpdatePictureService = require("../services/UpdatePictureService");

class MenuPictureController {
  async update(request, response){
    
    const pictureFileName = request.file.filename;
    const { id } = request.params;

    const menuRepository = new MenuRepository();
    const updatePictureService = new UpdatePictureService(menuRepository);

    const menu = await updatePictureService.execute({ id, pictureFileName });

    return response.json(menu);
  };
};

module.exports = MenuPictureController