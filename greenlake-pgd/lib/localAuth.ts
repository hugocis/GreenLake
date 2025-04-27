import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare, hash } from 'bcrypt';
import { JWT } from 'next-auth/jwt';

// Interfaz para el usuario local
interface LocalUser {
  id: string;
  username: string;
  password: string;
  settings: {
    preferredView: string;
    darkMode: boolean;
    language: string;
  };
}

// Función para almacenar usuarios en localStorage (solo del lado del cliente)
export const storeUser = async (userData: { username: string; password: string }) => {
  if (typeof window === 'undefined') return null;
  
  // Generar un ID único para el usuario
  const userId = crypto.randomUUID();
  
  // Hash de la contraseña
  const hashedPassword = await hash(userData.password, 10);
  
  // Crear el usuario con configuración predeterminada
  const newUser: LocalUser = {
    id: userId,
    username: userData.username,
    password: hashedPassword,
    settings: {
      preferredView: 'map',
      darkMode: false,
      language: 'es',
    }
  };
  
  // Obtener usuarios existentes o inicializar un array vacío
  const existingUsers = JSON.parse(localStorage.getItem('greenlake_users') || '[]');
  
  // Verificar si el usuario ya existe
  const userExists = existingUsers.some((user: LocalUser) => 
    user.username === userData.username
  );
  
  if (userExists) {
    return { error: 'El nombre de usuario ya está en uso' };
  }
  
  // Añadir el nuevo usuario
  existingUsers.push(newUser);
  
  // Guardar en localStorage
  localStorage.setItem('greenlake_users', JSON.stringify(existingUsers));
  
  // Devolver el usuario sin la contraseña
  const { password, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

// Función para obtener un usuario del localStorage
export const getLocalUser = (username: string): LocalUser | null => {
  if (typeof window === 'undefined') return null;
  
  const users = JSON.parse(localStorage.getItem('greenlake_users') || '[]');
  return users.find((user: LocalUser) => user.username === username) || null;
};

// Configuración de NextAuth con almacenamiento local
export const localAuthOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },
  providers: [
    CredentialsProvider({
      name: 'Local Credentials',
      credentials: {
        username: { label: 'Nombre de usuario', type: 'text' },
        password: { label: 'Contraseña', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) {
          return null;
        }

        // Obtener usuario del localStorage
        const user = getLocalUser(credentials.username);

        if (!user) {
          return null;
        }

        // Verificar contraseña
        try {
          const passwordMatch = await compare(credentials.password, user.password);
          if (!passwordMatch) {
            return null;
          }
        } catch (error) {
          console.error("Error validando contraseña:", error);
          return null;
        }

        // No devolvemos la contraseña en el objeto usuario
        const { password, ...userWithoutPassword } = user;
        
        return userWithoutPassword as any;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        // Si el usuario tiene configuraciones, las añadimos al token
        if (user.settings) {
          token.preferredView = user.settings.preferredView;
          token.darkMode = user.settings.darkMode;
          token.language = user.settings.language;
        }
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.preferredView = token.preferredView;
        session.user.darkMode = token.darkMode;
        session.user.language = token.language;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
  },
};
