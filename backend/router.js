import cadastroController from './Controller/cadastroController.js';
import loginController from './Controller/loginController.js';

export function AddRotas(api) {
  api.use(loginController);
  api.use(cadastroController); 
}