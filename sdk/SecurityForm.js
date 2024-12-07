import Builder from "./Layout/Builder";
import Clone from "./Layout/Extractor";
class SecurityForm{
    constructor(formID, containerID){
        this.configs = {};
        this.formID = formID;
        this.containerID = containerID;
        this.clone = new Clone();
    }
    config(url, method = "POST", headers = {}){   
        this.configs = {
            url: url,
            method: method || 'post',
            headers: headers || {}
        }
        return this;
    }
    extract(){
        return this.clone.clone(this.formID);
    }
    build(){
        const myuid = this.generateUID();
        const builder = new Builder(this.configs);
        const nodeE = this.extract();
        builder.execute(nodeE, this.containerID, myuid);
        return myuid;
    }
    generateUID(){
        return Math.random().toString(36).slice(-6);
    }
}
export default SecurityForm;