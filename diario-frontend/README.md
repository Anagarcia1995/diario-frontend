React: para construir la interfaz de usuario.
React Router: para la navegacion entre las distintas paginas de la aplicacion.


Ana Garcia Hidalgo
Frontend: Versión 1.0.0


Paginas de Autenticacion:

LoginPage => verifica la informacion del usuario y si es asi se guarda el token en el localStorage redirigiendo a la vista principal

SignupPage => si el registro es exitoso, se guarda el token y se redirige a la vista principal

-----------------------------------------------------------------------

CreateEscritoPage => 
Permite crear un escrito usando un POST
Verifica que los campos requeridos esten completos 


ListEscritosPage => 
Muestra todos los escritos
Ordenados por fecha de creacion(el reciente primero)
Añadimos la fecha de creacion 
Desde aqui podemos Editar y Eliminar


ModifyEscritoComponent =>
Edita la informacion del escrito con el PATCH


UserInfoPage =>
Muestra la informacion del usuario
Desde aqui podemos Editar informacion del usuario y Eliminar cuenta


EscritosContext =>
Gestiona el estado global relacionado con los escritos
