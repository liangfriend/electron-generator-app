class SystemService {
    systemRepository
    constructor(data:any) {
        this.systemRepository = data.systemRepository;
    }
    getPath() {
        return this.systemRepository.getPath()
    }

     getFileContent() {
        return  this.systemRepository.getFileContent()
    }
}

export default SystemService;
