import {
    Socket
} from 'phoenix';

class Client {
    constructor() {
        this.socket = new Socket("/socket", {
            params: {
                token: window.userToken
            }
        });
        this.socket.connect();
    }
}

export default new Client;
