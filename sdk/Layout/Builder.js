import Frame from "./Iframe";
class Builder {
    constructor(config) {
        this.config = config;
        this.uid = null;
    }
    execute(NodE, container, uid) {
        const iframe = new Frame(container, this.config).addBody(NodE).execute();
        this.listening(uid);
    }
    listening(uid) {
        this.uid = uid;
        window.addEventListener('message', (event) => {
            if (event.data.status === 'success') {
                this.dispatchEvent({
                    status: "success",
                    message: event.data.data
                });
            } else if (event.data.status === 'fail') {
                this.dispatchEvent({
                    status: "error",
                    message: event.data.message
                });
            }
        }, false);
    }
    dispatchEvent(details) {
        const notifications = new CustomEvent(this.uid, { detail: details }); // Corrigido o formato de CustomEvent
        window.dispatchEvent(notifications);
    }
}
export default Builder;