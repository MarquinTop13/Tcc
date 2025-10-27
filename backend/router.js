import cadastroController from './controller/cadastroController.js';
import loginController from './controller/LoginController.js';
import LinkRotas from './controller/LinkController.js';
import supportController from './controller/supportController.js'

export function AddRotas(api) {
  api.use(loginController);
  api.use(supportController);
  api.use(cadastroController);
  api.use('/api', LinkRotas);
}