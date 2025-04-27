import { NextResponse } from 'next/server';
import { getLocalUser } from '@/lib/localAuth';
import { compare } from 'bcrypt';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    
    // Validaciones básicas
    if (!username || !password) {
      return NextResponse.json(
        { message: 'El nombre de usuario y la contraseña son obligatorios' },
        { status: 400 }
      );
    }
    
    // Obtener usuario del almacenamiento local
    const user = getLocalUser(username);
    
    if (!user) {
      return NextResponse.json(
        { message: 'Credenciales incorrectas' },
        { status: 401 }
      );
    }
    
    // Verificar contraseña
    try {
      const passwordMatch = await compare(password, user.password);
      
      if (!passwordMatch) {
        return NextResponse.json(
          { message: 'Credenciales incorrectas' },
          { status: 401 }
        );
      }
    } catch (error) {
      console.error('Error comparing passwords:', error);
      return NextResponse.json(
        { message: 'Error de autenticación' },
        { status: 500 }
      );
    }
    
    // No devolver la contraseña al cliente
    const { password: _, ...userWithoutPassword } = user;
    
    // Si todo salió bien, devolver el usuario
    return NextResponse.json(
      { 
        message: 'Inicio de sesión exitoso',
        user: userWithoutPassword
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
