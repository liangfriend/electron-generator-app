class SystemService {
    systemRepository
    constructor(data) {
        this.systemRepository = data.systemRepository;
    }
    getPath() {
        return this.systemRepository.getPath()
    }


}

export default SystemService;
