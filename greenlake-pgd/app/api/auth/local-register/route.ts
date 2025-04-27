import { NextResponse } from 'next/server';
import { storeUser } from '@/lib/localAuth';
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, prefer-const */

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
    
    // Almacenar usuario localmente
    const result = await storeUser({ username, password });
    
    if (result && 'error' in result) {
      return NextResponse.json(
        { message: result.error },
        { status: 409 }
      );
    }
    
    // Si todo salió bien, devolver una respuesta exitosa
    return NextResponse.json(
      { 
        message: 'Usuario registrado correctamente',
        user: result
      },
      { status: 201 }
    );
    
  } catch (error: any) {
    console.error('Error registrando usuario:', error);
    return NextResponse.json(
      { message: 'Error al registrar el usuario' },
      { status: 500 }
    );
  }
}
