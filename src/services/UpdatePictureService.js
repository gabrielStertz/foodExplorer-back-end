const DiskStorage = require("../providers/DiskStorage");

class UpdatePictureService {
  constructor(menuRepository){
    this.menuRepository = menuRepository;
  };
  async execute({ id, pictureFileName }){
    const diskStorage = new DiskStorage();

    const menu = await this.menuRepository.findMenuItemForPicture(id);

    if(menu.picture){
      await diskStorage.deleteFile(menu.picture);
    };
    
    const fileName = await diskStorage.saveFile(pictureFileName);
    menu.picture = fileName;

    await this.menuRepository.updateMenuItemForPicture({menu, id});

    return menu;
  };
};

module.exports = UpdatePictureService;