import LinkRotas from './controller/LinkController.js';
import LoginRotas from './controller/LoginController.js'

export function Rotas(app) {
    app.use(LoginRotas);
    app.use('/api', LinkRotas);
}