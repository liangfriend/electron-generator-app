class GeneratorService {
    generatorRepository
    constructor(data) {
        this.generatorRepository = data.generatorRepository;
    }
    generatorStart(data) {
        const config = data.config
        const func=()=>{}
        const callback = data.callback??func
        //对config进行一些操作
        const targetPath=config.targetPath
        if (!targetPath.endsWith("/")) {
            config.targetPath += "/";
        }
        this.generatorRepository.generatorStart(config,callback)
    }

}

export default GeneratorService;
