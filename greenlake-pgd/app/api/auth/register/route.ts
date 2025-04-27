import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hashPassword } from '@/lib/password';
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
    
    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    
    if (existingUser) {
      return NextResponse.json(
        { message: 'El nombre de usuario ya está en uso' },
        { status: 409 }
      );
    }
    
    // Hashear la contraseña
    const hashedPassword = await hashPassword(password);
    
    // Crear el usuario
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        settings: {
          create: {
            preferredView: 'map',
            darkMode: false,
            language: 'es',
          },
        },
      },
      include: {
        settings: true,
      },
    });
    
    // Eliminar la contraseña del objeto de respuesta
    const { password: _, ...userWithoutPassword } = newUser;
    
    return NextResponse.json(
      { message: 'Usuario registrado correctamente', user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error registrando al usuario:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor', error: error.message },
      { status: 500 }
    );
  }
}
