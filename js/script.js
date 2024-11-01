document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const mensajeElement = document.getElementById('mensaje');

    // Leer usuarios desde el archivo de texto
    fetch('../usuarios.txt')
        .then(response => response.text())
        .then(data => {
            const usuarios = data.trim().split('\n').map(linea => {
                const [usuarioGuardado, contrasenaGuardada] = linea.split(':');
                return { usuario: usuarioGuardado, contrasena: contrasenaGuardada };
            });

            const usuarioEncontrado = usuarios.find(u => 
                u.usuario === username && u.contrasena === password
            );

            if (usuarioEncontrado) {
                mensajeElement.style.color = 'green';
                mensajeElement.textContent = '¡Inicio de sesión exitoso!';
                // Aquí podrías redirigir a otra página
                // window.location.href = 'pagina-principal.html';
            } else {
                mensajeElement.style.color = 'red';
                mensajeElement.textContent = 'Usuario o contraseña incorrectos';
            }
        })
        .catch(error => {
            mensajeElement.style.color = 'red';
            mensajeElement.textContent = 'Error al verificar usuarios';
        });
});