import { NextResponse } from 'next/server';
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, prefer-const */

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    
    console.log('Login attempt for user:', username);
    
    // Validaciones básicas
    if (!username || !password) {
      console.warn('Missing username or password');
      return NextResponse.json(
        { message: 'El nombre de usuario y la contraseña son obligatorios' },
        { status: 400 }
      );
    }
    
    // En un entorno de prueba, autenticamos a cualquier usuario
    // En un entorno real, NUNCA haríamos esto - siempre verificaríamos las credenciales adecuadamente
    
    // Simulamos un usuario autenticado con éxito
    const user = {
      id: "demo-" + Math.random().toString(36).substring(2, 10),
      username: username,
      settings: {
        preferredView: 'map',
        darkMode: false,
        language: 'es',
      }
    };
    
    // Si todo salió bien, devolver el usuario (sin verificación real en esta demo)
    return NextResponse.json(
      { 
        message: 'Inicio de sesión exitoso',
        user: user
      },
      { status: 200 }
    );
    
  } catch (error: any) {
    console.error('Error en inicio de sesión:', error);
    return NextResponse.json(
      { message: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}
